import { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './ScrollFloat.css';

gsap.registerPlugin(ScrollTrigger);

const ScrollFloat = ({
  children,
  scrollContainerRef,
  containerClassName = '',
  textClassName = '',
  animationDuration = 0.7,
  ease = 'back.out(1.5)',
  scrollStart = 'top 88%',
  scrollEnd = 'bottom 60%',
  stagger = 0.015,
  scrub = false,
  as: Component = 'p',
  style = {}
}) => {
  const containerRef = useRef(null);

  // Split into words first, then chars inside each word
  // This allows natural responsive multi-line wrapping without cutting off words or overflowing horizontally
  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : (children ? String(children) : '');
    if (!text) return null;

    return text.split(/(\s+)/).map((segment, segIdx) => {
      // Preserve spaces between words for normal browser word wrapping
      if (segment.match(/^\s+$/)) {
        return ' ';
      }
      return (
        <span className="scroll-float-word" key={segIdx}>
          {segment.split('').map((char, charIdx) => (
            <span className="char" key={charIdx}>
              {char}
            </span>
          ))}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;
    const charElements = el.querySelectorAll('.char');
    if (!charElements.length) return;

    // Cap stagger each so long text finishes cleanly in reasonable time (~0.8-1.2s total)
    const effectiveStagger = Math.min(stagger, 0.85 / Math.max(1, charElements.length));

    const ctx = gsap.context(() => {
      gsap.fromTo(
        charElements,
        {
          willChange: 'opacity, transform',
          opacity: 0,
          y: 24,
          scaleY: 1.35,
          scaleX: 0.9,
          transformOrigin: '50% 100%'
        },
        {
          duration: animationDuration,
          ease: ease,
          opacity: 1,
          y: 0,
          scaleY: 1,
          scaleX: 1,
          stagger: {
            each: effectiveStagger,
            from: 'start'
          },
          scrollTrigger: scrub
            ? {
                trigger: el,
                scroller,
                start: scrollStart,
                end: scrollEnd,
                scrub: typeof scrub === 'number' ? scrub : 1.2
              }
            : {
                trigger: el,
                scroller,
                start: scrollStart,
                toggleActions: 'play none none reverse'
              }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [scrollContainerRef, animationDuration, ease, scrollStart, scrollEnd, stagger, scrub, splitText]);

  return (
    <Component
      ref={containerRef}
      className={`scroll-float ${containerClassName}`.trim()}
      style={style}
    >
      <span className={`scroll-float-text ${textClassName}`.trim()}>
        {splitText ?? children}
      </span>
    </Component>
  );
};

export default ScrollFloat;
