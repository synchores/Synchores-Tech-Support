import { useLayoutEffect, useRef, useCallback, useEffect } from 'react';
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
  const isUpdatingRef = useRef(false);
  const lastRafTimeRef = useRef(0);
  const lenisScrollTopRef = useRef(null);
  const targetTransformsRef = useRef(new Map());
  const lastTransformsRef = useRef(new Map());

  // Configuration
  const STACK_CONFIG = {
    triggerLead: 0.12,
    settleFactor: 0.15,
    minPinDuration: 0.35,
    lastCardBuffer: 1.5
  };

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

  const measurePositions = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    // Refresh cards list to handle dynamic content/hydration
    const cards = Array.from(scroller.querySelectorAll('.scroll-stack-card'));
    cardsRef.current = cards;
    
    if (!cards.length) return;
    
    // TEMPORARY RESET for measurement
    const originalTransforms = cards.map(c => c.style.transform);
    cards.forEach(card => card.style.transform = 'none');
    cardPositionsRef.current = cards.map(card => getElementOffset(card));
    cards.forEach((card, i) => {
      card.style.transform = originalTransforms[i] || '';
    });
  }, [getElementOffset]);

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || isUpdatingRef.current || !cardPositionsRef.current.length) return;
    isUpdatingRef.current = true;

    const { scrollTop, containerHeight } = getScrollData();
    const firstCardTop = cardPositionsRef.current[0];
    const triggerStart = firstCardTop - (containerHeight * STACK_CONFIG.triggerLead);
    const stackAnchorTop = firstCardTop - triggerStart;

    // Calculate a UNIFIED pin end for the whole stack
    const lastCardIdx = cardsRef.current.length - 1;
    const lastNaturalGap = cardPositionsRef.current[lastCardIdx] - firstCardTop;
    const lastPinStart = triggerStart + lastNaturalGap;
    const lastPinEnd = lastPinStart + (containerHeight * STACK_CONFIG.minPinDuration * STACK_CONFIG.lastCardBuffer);
    
    const endElement = endMarkerRef.current || scrollerRef.current?.querySelector('.scroll-stack-end');
    const endElementTop = getElementOffset(endElement);
    const rawPinEnd = endElementTop - (containerHeight - stackAnchorTop);
    const universalPinEnd = Math.max(rawPinEnd, lastPinEnd);

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const cardTop = cardPositionsRef.current[i];
      
      const naturalGap = cardTop - firstCardTop;
      const pinStart = triggerStart + naturalGap;
      
      const settleDuration = containerHeight * STACK_CONFIG.settleFactor;
      const settleEnd = pinStart + settleDuration;
      
      const settleProgress = Math.max(0, Math.min(1, (scrollTop - pinStart) / settleDuration));
      const easedSettle = settleProgress * settleProgress * (3 - 2 * settleProgress);

      const pinnedTranslate = scrollTop - cardTop + stackAnchorTop + (i * itemStackDistance);
      let translateY = 0;

      if (scrollTop >= pinStart && scrollTop <= settleEnd) {
        translateY = easedSettle * pinnedTranslate;
      } else if (scrollTop > settleEnd) {
        translateY = pinnedTranslate;
      }

      if (scrollTop > universalPinEnd) {
        translateY = universalPinEnd - cardTop + stackAnchorTop + (i * itemStackDistance);
      }

      targetTransformsRef.current.set(i, { translateY, translateZ: i * 20 });
    });
    isUpdatingRef.current = false;
  }, [getScrollData, getElementOffset, itemStackDistance]);

  const animateCardTransforms = useCallback((time) => {
    if (!cardsRef.current.length) return;
    const { containerHeight } = getScrollData();
    const lastTime = lastRafTimeRef.current || time;
    const dt = Math.min(0.05, Math.max(0.001, (time - lastTime) / 1000));
    lastRafTimeRef.current = time;

    const alpha = 1 - Math.exp(-(containerHeight < 760 ? 8.5 : 12) * dt);

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
    if (!spacer || !cardsRef.current.length || !cardPositionsRef.current.length) return;

    const firstCardTop = cardPositionsRef.current[0];
    const triggerStart = firstCardTop - (containerHeight * STACK_CONFIG.triggerLead);
    
    // Math must match updateCardTransforms exactly
    const lastCardIdx = cardsRef.current.length - 1;
    const lastNaturalGap = cardPositionsRef.current[lastCardIdx] - firstCardTop;
    const lastPinStart = triggerStart + lastNaturalGap;
    const lastPinEnd = lastPinStart + (containerHeight * STACK_CONFIG.minPinDuration * STACK_CONFIG.lastCardBuffer);

    const endMarkerTop = getElementOffset(endMarkerRef.current);
    const maxScrollWithoutSpacer = endMarkerTop - containerHeight;
    const requiredSpacer = Math.max(1, Math.ceil(lastPinEnd - maxScrollWithoutSpacer + 50));
    spacer.style.height = `${requiredSpacer}px`;
  }, [getScrollData, getElementOffset]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(scroller.querySelectorAll('.scroll-stack-card'));
    cardsRef.current = cards;
    measurePositions();

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

    // DYNAMIC LAYOUT SUPPORT: Watch for DOM changes (new cards)
    const mo = new MutationObserver(() => {
      measurePositions();
      updateEndSpacer();
    });
    mo.observe(scroller, { childList: true, subtree: true });

    const ro = new ResizeObserver(() => {
      measurePositions();
      updateEndSpacer();
    });
    ro.observe(scroller);
    
    // Also observe initial cards
    cards.forEach(c => ro.observe(c));

    const handleLoad = () => {
      measurePositions();
      updateEndSpacer();
    };
    window.addEventListener('load', handleLoad);

    return () => {
      window.removeEventListener('load', handleLoad);
      ro.disconnect();
      mo.disconnect();
      cancelAnimationFrame(animationFrameRef.current);
      lenis.destroy();
    };
  }, [useWindowScroll, updateCardTransforms, animateCardTransforms, updateEndSpacer, measurePositions]);

  // Separate effect for dynamic children updates to avoid re-initializing Lenis/RAF
  useEffect(() => {
    measurePositions();
    updateEndSpacer();
  }, [children, measurePositions, updateEndSpacer]);

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
