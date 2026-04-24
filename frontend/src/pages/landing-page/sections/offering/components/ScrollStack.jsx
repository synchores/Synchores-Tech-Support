import { useLayoutEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';

export const ScrollStackItem = ({ children, itemClassName = '', style = {} }) => (
  <div
    className={`scroll-stack-card relative isolate overflow-hidden w-full h-[520px] sm:h-[560px] md:h-[560px] lg:h-[620px] xl:h-[700px] flex items-center justify-center my-0 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 rounded-2xl sm:rounded-3xl lg:rounded-[40px] shadow-[0_0_20px_rgba(0,0,0,0.08)] sm:shadow-[0_0_30px_rgba(0,0,0,0.1)] box-border origin-top will-change-transform ${itemClassName}`.trim()}
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
  itemScale =0,
  itemStackDistance = 0,
  stackPosition = '50%',
  scaleEndPosition = '30%',
  baseScale = 1,
  scaleDuration = 0.5,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = false,
  onStackComplete,
  staggerCards = false
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
        containerHeight: window.innerHeight,
        scrollContainer: document.documentElement
      };
    } else {
      const scroller = scrollerRef.current;
      return {
        scrollTop: typeof lenisScrollTop === 'number' ? lenisScrollTop : scroller.scrollTop,
        containerHeight: scroller.clientHeight,
        scrollContainer: scroller
      };
    }
  }, [useWindowScroll]);

  const getElementOffset = useCallback(
    element => {
      if (useWindowScroll) {
        const rect = element.getBoundingClientRect();
        return rect.top + window.scrollY;
      } else {
        return element.offsetTop;
      }
    },
    [useWindowScroll]
  );

  const animateCardTransforms = useCallback(
    (time) => {
      if (!cardsRef.current.length) return;

      const { containerHeight } = getScrollData();
      const lastTime = lastRafTimeRef.current || time;
      const dt = Math.min(0.05, Math.max(0.001, (time - lastTime) / 1000));
      lastRafTimeRef.current = time;

      const isCompactViewport = containerHeight < 760;
      // Exponential smoothing keeps follow motion consistent across frame rates and input speeds.
      const followStrength = isCompactViewport ? 8.5 : 12;
      const alpha = 1 - Math.exp(-followStrength * dt);

      cardsRef.current.forEach((card, i) => {
        if (!card) return;

        const target = targetTransformsRef.current.get(i);
        if (!target) return;

        const current = lastTransformsRef.current.get(i) ?? target;

        const deltaY = target.translateY - current.translateY;

        const next = {
          translateY: current.translateY + (deltaY * alpha),
          // Keep these instant for now (they're typically constant in this component).
          scale: target.scale,
          rotation: target.rotation,
          blur: target.blur
        };

        const transform = `translate3d(0, ${next.translateY.toFixed(3)}px, 0) scale(${next.scale.toFixed(4)}) rotate(${next.rotation.toFixed(3)}deg)`;
        const filter = next.blur > 0 ? `blur(${next.blur.toFixed(3)}px)` : '';

        card.style.transform = transform;
        card.style.opacity = '1';
        card.style.filter = filter;

        lastTransformsRef.current.set(i, next);
      });
    },
    [getScrollData]
  );

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || isUpdatingRef.current) return;

    isUpdatingRef.current = true;

    const { scrollTop, containerHeight } = getScrollData();

    const endElement = endMarkerRef.current ?? scrollerRef.current?.querySelector('.scroll-stack-end');

    const endElementTop = endElement ? getElementOffset(endElement) : 0;

    const firstCardTop = cardPositionsRef.current[0];

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const cardTop = cardPositionsRef.current[i];
      const isCompactViewport = containerHeight < 760;
      const pinStep = containerHeight * (isCompactViewport ? 0.14 : 0.2);
      const triggerLead = containerHeight * 0.1;
      const settleFactor = 0.28;
      const effectiveStackDistance = itemStackDistance || 10;

      // Ensure incoming cards paint above previous cards while stacking.
      card.style.zIndex = String(1000 + i);
      
      // All cards trigger their pin/stack relative to where the first card is
      // We use a small offset so they don't all snap at once
      const triggerStart = firstCardTop - triggerLead;
      const stackAnchorTop = firstCardTop - triggerStart;
      
      const pinStart = triggerStart + (i * pinStep);
      const rawPinEnd = endElementTop - (containerHeight - stackAnchorTop);
      const minPinDuration = isCompactViewport ? 0.18 : 0.3;
      const pinEnd = Math.max(rawPinEnd, pinStart + containerHeight * minPinDuration);

      const settleEnd = pinStart + containerHeight * settleFactor;
      const settleProgress = calculateProgress(scrollTop, pinStart, settleEnd);
      // Smoothstep easing for a softer, less jumpy settle into the stack.
      const easedSettle = settleProgress * settleProgress * (3 - 2 * settleProgress);
      const scale = 1; // All cards same size

      let translateY = 0;
      const pinnedTranslate = scrollTop - cardTop + stackAnchorTop + (i * effectiveStackDistance);

      if (scrollTop >= pinStart && scrollTop <= settleEnd) {
        // Interpolate from natural position to pinned position instead of snapping.
        translateY = easedSettle * pinnedTranslate;
      } else if (scrollTop > settleEnd) {
        translateY = pinnedTranslate;
      }

      if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackAnchorTop + (i * effectiveStackDistance);
      }

      const newTransform = {
        translateY,
        scale,
        rotation: 0,
        blur: 0
      };

      // Store the target transform; rAF loop will animate towards it.
      targetTransformsRef.current.set(i, newTransform);

      // Initialize current transform to avoid a first-frame jump.
      if (!lastTransformsRef.current.has(i)) {
        lastTransformsRef.current.set(i, newTransform);
        const transform = `translate3d(0, ${newTransform.translateY.toFixed(3)}px, 0) scale(${newTransform.scale.toFixed(4)}) rotate(${newTransform.rotation.toFixed(3)}deg)`;
        card.style.transform = transform;
        card.style.opacity = '1';
      }

      if (i === cardsRef.current.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });

    isUpdatingRef.current = false;
  }, [
    itemScale,
    itemStackDistance,
    itemDistance,
    baseScale,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    onStackComplete,
    staggerCards,
    calculateProgress,
    getScrollData,
    getElementOffset
  ]);

  const setupLenis = useCallback(() => {
    if (useWindowScroll) {
      const lenis = new Lenis({
        duration: 1.2,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1,
        infinite: false,
        wheelMultiplier: 0.9,
        lerp: 0.1,
        syncTouch: true,
        syncTouchLerp: 0.1
      });

      lenis.on('scroll', (event) => {
        const animated = event?.animatedScroll;
        const absolute = event?.scroll;
        if (typeof animated === 'number') {
          lenisScrollTopRef.current = animated;
        } else if (typeof absolute === 'number') {
          lenisScrollTopRef.current = absolute;
        }
      });

      const raf = time => {
        lenis.raf(time);
        if (typeof lenis.animatedScroll === 'number') {
          lenisScrollTopRef.current = lenis.animatedScroll;
        }
        updateCardTransforms();
        animateCardTransforms(time);
        animationFrameRef.current = requestAnimationFrame(raf);
      };
      animationFrameRef.current = requestAnimationFrame(raf);

      lenisRef.current = lenis;
      return lenis;
    } else {
      const scroller = scrollerRef.current;
      if (!scroller) return;

      const lenis = new Lenis({
        wrapper: scroller,
        content: scroller.querySelector('.scroll-stack-inner'),
        duration: 1.2,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1,
        infinite: false,
        wheelMultiplier: 0.9,
        lerp: 0.1,
        syncTouch: true,
        syncTouchLerp: 0.1
      });

      lenis.on('scroll', (event) => {
        const animated = event?.animatedScroll;
        const absolute = event?.scroll;
        if (typeof animated === 'number') {
          lenisScrollTopRef.current = animated;
        } else if (typeof absolute === 'number') {
          lenisScrollTopRef.current = absolute;
        }
      });

      const raf = time => {
        lenis.raf(time);
        if (typeof lenis.animatedScroll === 'number') {
          lenisScrollTopRef.current = lenis.animatedScroll;
        }
        updateCardTransforms();
        animateCardTransforms(time);
        animationFrameRef.current = requestAnimationFrame(raf);
      };
      animationFrameRef.current = requestAnimationFrame(raf);

      lenisRef.current = lenis;
      return lenis;
    }
  }, [animateCardTransforms, updateCardTransforms, useWindowScroll]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(
      scroller.querySelectorAll('.scroll-stack-card')
    );

    cardsRef.current = cards;
    cardPositionsRef.current = cards.map((card) => getElementOffset(card));
    const transformsCache = lastTransformsRef.current;
    const targetsCache = targetTransformsRef.current;

    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.willChange = 'transform, filter';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
      card.style.transform = 'translateZ(0)';
      card.style.webkitTransform = 'translateZ(0)';
      card.style.perspective = '1000px';
      card.style.webkitPerspective = '1000px';
    });

    setupLenis();

    updateCardTransforms();

    // Ensure only the minimum extra scroll needed to release the final pin.
    const updateEndSpacer = () => {
      const { containerHeight } = getScrollData();
      const endMarker = endMarkerRef.current;
      const spacer = endSpacerRef.current;
      const cardsCount = cardsRef.current.length;
      if (!spacer || !endMarker || cardsCount === 0) return;

      const firstCardTop = cardPositionsRef.current[0] ?? 0;
      const triggerLead = containerHeight * 0.1;
      const isCompactViewport = containerHeight < 760;
      const pinStep = containerHeight * (isCompactViewport ? 0.14 : 0.2);
      const minPinDuration = isCompactViewport ? 0.18 : 0.3;

      const triggerStart = firstCardTop - triggerLead;
      const lastPinStart = triggerStart + ((cardsCount - 1) * pinStep);
      const minPinEnd = lastPinStart + (containerHeight * minPinDuration);

      const endMarkerTop = getElementOffset(endMarker);
      const maxScrollWithoutSpacer = endMarkerTop - containerHeight;
      const safetyBuffer = isCompactViewport ? 8 : 14;
      const requiredSpacer = Math.max(
        1,
        Math.ceil(minPinEnd - maxScrollWithoutSpacer + safetyBuffer)
      );

      const maxDynamicSpacer = Math.round(containerHeight * (isCompactViewport ? 0.18 : 0.28));
      const finalSpacer = Math.max(1, Math.min(requiredSpacer, maxDynamicSpacer));

      spacer.style.height = `${finalSpacer}px`;
    };

    updateEndSpacer();

    // Recalculate positions on resize
    const handleResize = () => {
      cardPositionsRef.current = cards.map((card) => getElementOffset(card));
      updateEndSpacer();
      updateCardTransforms();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
      stackCompletedRef.current = false;
      cardsRef.current = [];
      cardPositionsRef.current = [];
      transformsCache.clear();
      targetsCache.clear();
      isUpdatingRef.current = false;
      lastRafTimeRef.current = 0;
      lenisScrollTopRef.current = null;
    };
  }, [
    itemDistance,
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    scaleDuration,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    onStackComplete,
    staggerCards,
    setupLenis,
    updateCardTransforms,
    getElementOffset,
    getScrollData
  ]);

  // Container styles based on scroll mode
  const containerStyles = useWindowScroll
    ? {
        // Global scroll mode - no overflow constraints
        overscrollBehavior: 'contain',
        WebkitOverflowScrolling: 'touch',
        WebkitTransform: 'translateZ(0)',
        transform: 'translateZ(0)'
      }
    : {
        // Container scroll mode - original behavior
        overscrollBehavior: 'contain',
        WebkitOverflowScrolling: 'touch',
        scrollBehavior: 'smooth',
        WebkitTransform: 'translateZ(0)',
        transform: 'translateZ(0)',
        willChange: 'scroll-position'
      };

  const containerClassName = useWindowScroll
    ? `relative w-full ${className}`.trim()
    : `relative w-full h-full overflow-y-auto overflow-x-visible ${className}`.trim();

  return (
    <div className={containerClassName} ref={scrollerRef} style={containerStyles}>
      <div className="scroll-stack-inner px-2 sm:px-4 md:px-8 lg:px-12 xl:px-20 py-4 sm:py-6 md:py-8">
        {children}
        {/* End marker used for release math */}
        <div ref={endMarkerRef} className="scroll-stack-end w-full h-px" />
        {/* Extra scroll room; must not affect end marker position */}
        <div ref={endSpacerRef} className="scroll-stack-spacer w-full h-px" />
      </div>
    </div>
  );
};

export default ScrollStack;
