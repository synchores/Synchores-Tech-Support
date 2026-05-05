import { useLayoutEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';

export const ScrollStackItem = ({ children, itemClassName = '', style = {} }) => (
  <div
    className={`scroll-stack-card relative overflow-hidden w-full h-[520px] sm:h-[560px] md:h-[560px] lg:h-[620px] xl:h-[700px] flex items-center justify-center my-0 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 rounded-2xl sm:rounded-3xl lg:rounded-[40px] box-border origin-top will-change-transform ${itemClassName}`.trim()}
    style={{
      backfaceVisibility: 'hidden',
      transformStyle: 'preserve-3d',
      ...style
    }}
  >
    {children}
  </div>
);

const ScrollStack = ({
  children,
  className = '',
  itemDistance = 0,
  itemScale = 0,
  itemStackDistance = 10,
  useWindowScroll = false,
  onStackComplete
}) => {
  const scrollerRef = useRef(null);
  const endMarkerRef = useRef(null);
  const endSpacerRef = useRef(null);
  const stackCompletedRef = useRef(false);
  const animationFrameRef = useRef(null);
  const lenisRef = useRef(null);
  const cardsRef = useRef([]);
  const cardPositionsRef = useRef([]);
  const targetTransformsRef = useRef(new Map());
  const lastTransformsRef = useRef(new Map());
  const isUpdatingRef = useRef(false);
  const lastRafTimeRef = useRef(0);
  const lenisScrollTopRef = useRef(null);

  // --- STACK CONFIGURATION (Source of Truth) ---
  const STACK_CONFIG = {
    triggerLead: 0.12,      // When cards start pinning
    pinStepDesktop: 0.55,   // Distance between card pins (Large screens)
    pinStepMobile: 0.35,    // Distance between card pins (Small screens)
    minPinDesktop: 0.35,    // Minimum hold time per card
    minPinMobile: 0.2,      // Minimum hold time per card
    settleFactor: 0.15      // Speed of the 'snap' to position
  };

  const calculateProgress = useCallback((scrollTop, start, end) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const getScrollData = useCallback(() => {
    const lenisScrollTop = lenisScrollTopRef.current;
    if (useWindowScroll) {
      return {
        scrollTop: typeof lenisScrollTop === 'number' ? lenisScrollTop : window.scrollY,
        containerHeight: window.innerHeight
      };
    } else {
      const scroller = scrollerRef.current;
      return {
        scrollTop: typeof lenisScrollTop === 'number' ? lenisScrollTop : scroller?.scrollTop || 0,
        containerHeight: scroller?.clientHeight || 0
      };
    }
  }, [useWindowScroll]);

  const getElementOffset = useCallback(element => {
    if (!element) return 0;
    if (useWindowScroll) {
      const rect = element.getBoundingClientRect();
      return rect.top + window.scrollY;
    } else {
      return element.offsetTop;
    }
  }, [useWindowScroll]);

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || isUpdatingRef.current) return;
    isUpdatingRef.current = true;

    const { scrollTop, containerHeight } = getScrollData();
    const endElement = endMarkerRef.current || scrollerRef.current?.querySelector('.scroll-stack-end');
    const endElementTop = getElementOffset(endElement);
    const firstCardTop = cardPositionsRef.current[0] || 0;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const cardTop = cardPositionsRef.current[i];
      const isCompact = containerHeight < 760;
      const pinStep = containerHeight * (isCompact ? STACK_CONFIG.pinStepMobile : STACK_CONFIG.pinStepDesktop);
      const triggerLead = containerHeight * STACK_CONFIG.triggerLead;
      
      const triggerStart = firstCardTop - triggerLead;
      const stackAnchorTop = firstCardTop - triggerStart;
      
      const pinStart = triggerStart + (i * pinStep);
      const rawPinEnd = endElementTop - (containerHeight - stackAnchorTop);
      const minPinDuration = isCompact ? STACK_CONFIG.minPinMobile : STACK_CONFIG.minPinDesktop;
      const pinEnd = Math.max(rawPinEnd, pinStart + containerHeight * minPinDuration);

      const settleEnd = pinStart + containerHeight * STACK_CONFIG.settleFactor;
      const settleProgress = calculateProgress(scrollTop, pinStart, settleEnd);
      const easedSettle = settleProgress * settleProgress * (3 - 2 * settleProgress);

      const pinnedTranslate = scrollTop - cardTop + stackAnchorTop + (i * itemStackDistance);
      let translateY = 0;

      if (scrollTop >= pinStart && scrollTop <= settleEnd) {
        translateY = easedSettle * pinnedTranslate;
      } else if (scrollTop > settleEnd) {
        translateY = pinnedTranslate;
      }

      if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackAnchorTop + (i * itemStackDistance);
      }

      targetTransformsRef.current.set(i, { translateY, translateZ: i * 20 });

      // Handle stack completion callback
      if (i === cardsRef.current.length - 1) {
        const isComplete = scrollTop >= pinStart;
        if (isComplete && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isComplete && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });
    isUpdatingRef.current = false;
  }, [getScrollData, getElementOffset, calculateProgress, itemStackDistance, onStackComplete]);

  const animateCardTransforms = useCallback((time) => {
    if (!cardsRef.current.length) return;
    const { containerHeight } = getScrollData();
    const lastTime = lastRafTimeRef.current || time;
    const dt = Math.min(0.05, Math.max(0.001, (time - lastTime) / 1000));
    lastRafTimeRef.current = time;

    const followStrength = containerHeight < 760 ? 8.5 : 12;
    const alpha = 1 - Math.exp(-followStrength * dt);

    cardsRef.current.forEach((card, i) => {
      const target = targetTransformsRef.current.get(i);
      if (!target || !card) return;

      const current = lastTransformsRef.current.get(i) || target;
      const nextY = current.translateY + (target.translateY - current.translateY) * alpha;

      card.style.transform = `translate3d(0, ${nextY.toFixed(3)}px, ${target.translateZ}px)`;
      lastTransformsRef.current.set(i, { translateY: nextY });
    });
  }, [getScrollData]);

  const updateEndSpacer = useCallback(() => {
    const { containerHeight } = getScrollData();
    const spacer = endSpacerRef.current;
    if (!spacer || !cardsRef.current.length) return;

    const firstCardTop = cardPositionsRef.current[0] || 0;
    const isCompact = containerHeight < 760;
    const pinStep = containerHeight * (isCompact ? STACK_CONFIG.pinStepMobile : STACK_CONFIG.pinStepDesktop);
    const triggerLead = containerHeight * STACK_CONFIG.triggerLead;
    const minPinDuration = isCompact ? STACK_CONFIG.minPinMobile : STACK_CONFIG.minPinDesktop;

    const triggerStart = firstCardTop - triggerLead;
    const lastPinStart = triggerStart + ((cardsRef.current.length - 1) * pinStep);
    const minPinEnd = lastPinStart + (containerHeight * minPinDuration);

    const endMarkerTop = getElementOffset(endMarkerRef.current);
    const maxScrollWithoutSpacer = endMarkerTop - containerHeight;
    const requiredSpacer = Math.max(1, Math.ceil(minPinEnd - maxScrollWithoutSpacer + 50));
    
    spacer.style.height = `${requiredSpacer}px`;
  }, [getScrollData, getElementOffset]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(scroller.querySelectorAll('.scroll-stack-card'));
    cardsRef.current = cards;

    // Measurement Reset
    const originalTransforms = cards.map(c => c.style.transform);
    cards.forEach(card => card.style.transform = 'none');
    cardPositionsRef.current = cards.map(card => getElementOffset(card));
    cards.forEach((card, i) => card.style.transform = originalTransforms[i]);

    const lenis = new Lenis({
      wrapper: useWindowScroll ? undefined : scroller,
      content: useWindowScroll ? undefined : scroller.querySelector('.scroll-stack-inner'),
      duration: 1.2,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      lerp: 0.1
    });

    lenis.on('scroll', (e) => {
      lenisScrollTopRef.current = e.animatedScroll ?? e.scroll;
    });

    const raf = (time) => {
      lenis.raf(time);
      updateCardTransforms();
      animateCardTransforms(time);
      animationFrameRef.current = requestAnimationFrame(raf);
    };
    animationFrameRef.current = requestAnimationFrame(raf);
    lenisRef.current = lenis;

    updateEndSpacer();

    const handleResize = () => {
      cardPositionsRef.current = cards.map(card => getElementOffset(card));
      updateEndSpacer();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameRef.current);
      lenis.destroy();
    };
  }, [useWindowScroll, updateCardTransforms, animateCardTransforms, updateEndSpacer, getElementOffset]);

  const containerClassName = useWindowScroll
    ? `relative w-full ${className}`.trim()
    : `relative w-full h-full overflow-y-auto overflow-x-visible ${className}`.trim();

  return (
    <div className={containerClassName} ref={scrollerRef}>
      <div className="scroll-stack-inner px-2 sm:px-4 md:px-8 lg:px-12 xl:px-20 py-4 sm:py-6 md:py-8">
        {children}
        <div ref={endMarkerRef} className="scroll-stack-end w-full h-px" />
        <div ref={endSpacerRef} className="scroll-stack-spacer w-full h-px" />
      </div>
    </div>
  );
};

export default ScrollStack;
