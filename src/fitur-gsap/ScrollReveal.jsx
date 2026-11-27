'use client';

import { Children, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './ScrollReveal.css';

gsap.registerPlugin(ScrollTrigger);

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const SCRUB_SPAN = 0.5;

const clampToScroll = position =>
  typeof position === 'string' && !position.startsWith('clamp(') ? `clamp(${position})` : position;

const clamp01 = value => Math.min(Math.max(value, 0), 1);
const smooth = value => value * value * (3 - 2 * value);
const easeOut = value => 1 - Math.pow(1 - value, 3);
const easeBack = (value, overshoot) => {
  const shifted = value - 1;
  return 1 + (overshoot + 1) * shifted * shifted * shifted + overshoot * shifted * shifted;
};
const glowAt = t => (t <= 0 || t >= 1 ? 0 : t < 0.35 ? smooth(t / 0.35) : 1 - smooth((t - 0.35) / 0.65));

const paintPiece = (piece, t, look) => {
  let reveal = t;
  let fadeIn = t;
  let motion = '';
  if (look.effect === 'rise') {
    reveal = easeOut(t);
    fadeIn = clamp01(reveal * 1.25);
    if (reveal < 1) {
      motion = look.masked
        ? `translateY(${((1 - reveal) * 100).toFixed(2)}%) translateY(${((1 - reveal) * 0.2).toFixed(3)}em)`
        : `translateY(${((1 - reveal) * 0.8).toFixed(3)}em)`;
    }
  } else if (look.effect === 'flip') {
    reveal = easeBack(t, 1.2);
    fadeIn = clamp01(t * 2);
    if (t < 1) motion = `perspective(6em) rotateX(${((1 - reveal) * 90).toFixed(2)}deg)`;
  } else if (look.effect === 'scale') {
    reveal = easeBack(t, 1.6);
    fadeIn = clamp01(t * 1.6);
    if (t < 1) motion = `scale(${(0.35 + 0.65 * reveal).toFixed(4)})`;
  }
  if (look.highlightColor) fadeIn = Math.max(fadeIn, clamp01(t / 0.35));
  const settle = clamp01(reveal);
  const lift = look.offset * (1 - settle);
  piece.style.opacity = t >= 1 ? '' : (look.baseOpacity + (1 - look.baseOpacity) * fadeIn).toFixed(3);
  piece.style.transform = [lift ? `translateY(${lift.toFixed(2)}px)` : '', motion].filter(Boolean).join(' ');
  piece.style.filter = look.blur && settle < 1 ? `blur(${(look.blur * (1 - settle)).toFixed(2)}px)` : '';
  if (look.highlightColor) {
    const glow = glowAt(t);
    piece.style.color =
      glow > 0.002 ? `color-mix(in srgb, ${look.highlightColor} ${(glow * 100).toFixed(1)}%, currentColor)` : '';
  }
};

const ScrollReveal = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 0,
  blurStrength = 4,
  baseOffset = 0,
  stagger = 0.05,
  smoothing = 1.2,
  splitBy = 'words',
  effect = 'fade',
  mode = 'scrub',
  duration = 0.8,
  highlightColor = '',
  containerClassName = '',
  textClassName = '',
  rotationEnd = 'bottom 65%',
  wordAnimationEnd = 'bottom 65%',
  as = 'h2',
  style = {}
}) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  const text = useMemo(() => {
    const parts = Children.toArray(children);
    return parts.every(part => typeof part === 'string' || typeof part === 'number') ? parts.join('') : null;
  }, [children]);

  const splitText = useMemo(() => {
    if (text === null) return null;
    return text.split(/(\s+)/).map((word, index) =>
      word.trim() === '' ? (
        word
      ) : (
        <span className="scroll-reveal-word" key={index}>
          {splitBy === 'chars' ? (
            Array.from(word).map((char, charIndex) => (
              <span className="scroll-reveal-piece" key={charIndex}>
                {char}
              </span>
            ))
          ) : (
            <span className="scroll-reveal-piece">{word}</span>
          )}
        </span>
      )
    );
  }, [text, splitBy]);

  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useIsomorphicLayoutEffect(() => {
    const el = containerRef.current;
    const textEl = textRef.current;
    if (!el || !textEl) return;
    if (scrollContainerRef && !scrollContainerRef.current) return;

    const scroller = scrollContainerRef?.current || window;
    const wrappers = Array.from(el.querySelectorAll('.scroll-reveal-word'));
    const pieces = wrappers.length ? Array.from(el.querySelectorAll('.scroll-reveal-piece')) : [textEl];
    const viewportHeight = () => (scroller instanceof HTMLElement ? scroller.clientHeight : window.innerHeight);
    const scrub = smoothing > 0 ? smoothing : true;
    const span = mode === 'enter' ? Math.max(0.05, duration) : SCRUB_SPAN;
    const gap = Math.max(0, stagger);
    const look = {
      effect,
      masked: effect === 'rise' && wrappers.length > 0,
      baseOpacity,
      blur: enableBlur ? blurStrength : 0,
      offset: baseOffset,
      highlightColor
    };
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const order = pieces.map((_, index) => index);
      const last = pieces.map(() => -1);
      const state = { p: 0 };
      let count = pieces.length;

      const measure = () => {
        if (splitBy !== 'lines' || !wrappers.length) return;
        const rows = new Map();
        wrappers.forEach((w, index) => {
          const top = Math.round(w.offsetTop);
          if (!rows.has(top)) rows.set(top, []);
          rows.get(top).push(index);
        });
        count = rows.size;
        Array.from(rows.values()).forEach((lineIndices, rowIndex) => {
          lineIndices.forEach(index => {
            order[index] = rowIndex;
          });
        });
      };

      measure();

      const total = () => (count - 1) * gap + span;

      const render = () => {
        const p = state.p;
        const width = total();
        for (let i = 0; i < pieces.length; i++) {
          const start = order[i] * gap;
          const progress = width === 0 ? 1 : clamp01((p * width - start) / span);
          if (progress !== last[i]) {
            last[i] = progress;
            paintPiece(pieces[i], progress, look);
          }
        }
      };

      const reset = () => {
        last.fill(-1);
        for (let i = 0; i < pieces.length; i++) {
          paintPiece(pieces[i], 0, look);
        }
      };

      reset();

      if (mode === 'enter') {
        let run = null;
        const play = () => {
          if (run) run.kill();
          run = gsap.to(state, {
            p: 1,
            duration: total(),
            ease: 'none',
            onUpdate: render
          });
          if (baseRotation) gsap.to(el, { rotate: 0, duration: Math.min(total(), 1.4), ease: 'power3.out' });
        };
        const startAt = () => {
          const view = viewportHeight();
          const top =
            el.getBoundingClientRect().top -
            (scroller instanceof HTMLElement
              ? scroller.getBoundingClientRect().top + scroller.clientTop - scroller.scrollTop
              : -window.scrollY);
          const raw = top - view + 0.2 * Math.min(el.offsetHeight, view);
          return Math.min(raw, ScrollTrigger.maxScroll(scroller) - 1);
        };
        if (baseRotation) gsap.set(el, { transformOrigin: '0% 50%', rotate: baseRotation });
        ScrollTrigger.create({
          trigger: el,
          scroller,
          start: startAt,
          onEnter: play,
          onLeave: play,
          onRefresh: self => {
            if (self.progress > 0) play();
          }
        });
      } else {
        if (baseRotation) {
          gsap.fromTo(
            el,
            { transformOrigin: '0% 50%', rotate: baseRotation },
            {
              ease: 'none',
              rotate: 0,
              scrollTrigger: {
                trigger: el,
                scroller,
                start: 'top bottom',
                end: clampToScroll(rotationEnd),
                scrub
              }
            }
          );
        }
        gsap.to(state, {
          p: 1,
          ease: 'none',
          onUpdate: render,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: 'top 92%',
            end: clampToScroll(wordAnimationEnd),
            scrub
          }
        });
      }

      const resizeObserver =
        splitBy === 'lines' && typeof ResizeObserver !== 'undefined'
          ? new ResizeObserver(() => {
              measure();
              last.fill(-1);
              render();
            })
          : null;

      if (resizeObserver) resizeObserver.observe(el);

      return () => {
        if (resizeObserver) resizeObserver.disconnect();
      };
    });

    return () => mm.revert();
  }, [
    mounted,
    scrollContainerRef,
    text,
    splitBy,
    effect,
    mode,
    duration,
    highlightColor,
    enableBlur,
    baseOpacity,
    baseRotation,
    blurStrength,
    baseOffset,
    stagger,
    smoothing,
    rotationEnd,
    wordAnimationEnd
  ]);

  const Component = as || 'h2';

  return (
    <Component
      ref={containerRef}
      className={`scroll-reveal ${containerClassName}`.trim()}
      style={style}
      aria-label={text ?? undefined}
    >
      <span
        ref={textRef}
        className={`scroll-reveal-text ${textClassName}`.trim()}
        aria-hidden={text === null ? undefined : true}
      >
        {splitText ?? children}
      </span>
    </Component>
  );
};

export default ScrollReveal;
