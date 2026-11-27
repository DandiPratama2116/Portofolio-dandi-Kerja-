import React, { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";
import "./ScrollMask.css";

gsap.registerPlugin(ScrollTrigger);

// Helper untuk memecah teks menjadi huruf-huruf yang melompat dari atas satu per satu
const renderAnimatedLetters = (text, charClass = "jump-char", wordClass = "jump-word") => {
  if (!text) return null;
  const words = text.split(" ");
  return words.map((word, wIdx) => (
    <span
      key={wIdx}
      className={`jump-word ${wordClass}`.trim()}
      style={{ display: "inline-block", whiteSpace: "nowrap" }}
    >
      {word.split("").map((char, cIdx) => (
        <span
          key={cIdx}
          className={`jump-char ${charClass}`.trim()}
          style={{ display: "inline-block", willChange: "transform, opacity" }}
        >
          {char}
        </span>
      ))}
      {wIdx < words.length - 1 && (
        <span className="jump-space" style={{ display: "inline-block" }}>
          &nbsp;
        </span>
      )}
    </span>
  ));
};

export default function ScrollMask({
  src = "",
  alt = "Portfolio Visual",
  welcomeText = "SELAMAT DATANG",
  title = "PORTFOLIO DANDI PRATAMA",
  subtitle = "SOFTWARE ENGINEER",
  scrollHint = "Scroll ke bawah",
  variant = "iris",
  scrollLength = 2.8,
  settle = 0.82,
  zoom = 1.18,
  children,
  className = "",
  style = {},
}) {
  const trackRef = useRef(null);
  const stageRef = useRef(null);
  const darkVeilRef = useRef(null);
  const maskFrameRef = useRef(null);
  const mediaRef = useRef(null);
  const introOverlayRef = useRef(null);
  const hintRef = useRef(null);

  const applyProgress = useCallback((p) => {
    const frame = maskFrameRef.current;
    const media = mediaRef.current;
    const intro = introOverlayRef.current;
    const hint = hintRef.current;
    const darkVeil = darkVeilRef.current;

    const rawExpand = Math.min(1, Math.max(0, p / settle));
    const expandProgress = Math.pow(rawExpand, 1.35);

    if (frame) {
      const radius = expandProgress * 125;
      const circleVal = `circle(${radius}% at 50% 50%)`;
      frame.style.clipPath = circleVal;
      frame.style.webkitClipPath = circleVal;
    }

    if (darkVeil) {
      const veilOpacity = Math.max(0, 1 - expandProgress * 1.3);
      darkVeil.style.opacity = `${veilOpacity}`;
      darkVeil.style.pointerEvents = "none";
    }

    if (media) {
      const currentScale = zoom - (zoom - 1.0) * expandProgress;
      media.style.transform = `scale(${currentScale})`;
    }

    if (intro) {
      const out = Math.min(1, Math.max(0, p / 0.42));
      const outEase = out * out;
      intro.style.opacity = `${1 - outEase}`;
      intro.style.transform = `translate3d(0, ${-42 * outEase}px, 0)`;
      intro.style.pointerEvents = out > 0.1 ? "none" : "auto";
    }

    if (hint) {
      const hintOut = Math.min(1, Math.max(0, p / 0.18));
      hint.style.opacity = `${1 - hintOut}`;
      hint.style.transform = `translate3d(0, ${18 * hintOut}px, 0)`;
      hint.style.pointerEvents = "none";
    }
  }, [settle, zoom]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const isMobile = window.innerWidth <= 768;
    const scrubSpeed = isMobile ? 0.7 : 1.2;

    const ctx = gsap.context(() => {
      // ── Timeline Animasi Huruf Lompat dari Atas Satu per Satu ──
      const entranceTl = gsap.timeline({
        defaults: { ease: "back.out(2.2)" },
        delay: 0.1,
      });

      // 1. Teks SELAMAT DATANG / WELCOME tampil halus dan tenang tanpa animasi lompat
      entranceTl.fromTo(
        ".welcome-lead-wrapper",
        { y: -16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
      );

      // 2. Setiap huruf PORTFOLIO DANDI PRATAMA lompat dari atas satu per satu
      entranceTl.fromTo(
        ".jump-char-title",
        {
          y: -110,
          opacity: 0,
          scaleY: 1.45,
          scaleX: 0.75,
          rotation: (i) => (i % 2 === 0 ? 10 : -10),
        },
        {
          y: 0,
          opacity: 1,
          scaleY: 1,
          scaleX: 1,
          rotation: 0,
          duration: 0.7,
          stagger: {
            each: 0.032,
            from: "start",
          },
          ease: "back.out(2.6)",
        },
        "-=0.2"
      );

      // 3. Setiap huruf SOFTWARE ENGINEER lompat dari atas satu per satu
      entranceTl.fromTo(
        ".jump-char-subtitle",
        {
          y: -45,
          opacity: 0,
          scaleY: 1.3,
          scaleX: 0.8,
        },
        {
          y: 0,
          opacity: 1,
          scaleY: 1,
          scaleX: 1,
          duration: 0.5,
          stagger: {
            each: 0.022,
            from: "start",
          },
          ease: "back.out(2.2)",
        },
        "-=0.25"
      );

      // 4. Petunjuk Scroll fade-in
      if (hintRef.current) {
        entranceTl.fromTo(
          hintRef.current,
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
          "-=0.2"
        );
      }

      // ── ScrollTrigger untuk Animasi Iris Pembuka Hero Saat Scroll ──
      ScrollTrigger.create({
        trigger: track,
        start: "top top",
        end: "bottom bottom",
        scrub: scrubSpeed,
        onUpdate: (self) => {
          applyProgress(self.progress);
        },
      });
    }, track);

    applyProgress(0);

    return () => ctx.revert();
  }, [applyProgress, scrollLength, title, welcomeText, subtitle]);

  return (
    <div
      ref={trackRef}
      className={`scroll-mask-runway ${className}`.trim()}
      style={{
        height: `calc(100vh * ${scrollLength})`,
        ...style,
      }}
    >
      <div ref={stageRef} className="scroll-mask-stage">
        <div ref={maskFrameRef} className="scroll-mask-viewport-frame">
          <div ref={mediaRef} className="scroll-mask-media-stage">
            {src ? (
              <img src={src} alt={alt} className="scroll-mask-direct-img" draggable={false} />
            ) : (
              children
            )}
          </div>
        </div>

        {/* Layer 2: Soft Dark Veil Overlay (Hitam Halus & Nyaman) */}
        <div ref={darkVeilRef} className="scroll-mask-dark-veil" aria-hidden="true" />

        {/* Layer 3: Welcome Overlay */}
        <div ref={introOverlayRef} className="scroll-mask-welcome-overlay">
          {welcomeText && (
            <div className="welcome-lead-wrapper">
              <span className="welcome-headline-lead">
                {welcomeText}
              </span>
            </div>
          )}

          <h1 className="welcome-main-title">
            {renderAnimatedLetters(title, "jump-char-title", "jump-word-title")}
          </h1>

          {subtitle && (
            <p className="welcome-subtitle">
              {renderAnimatedLetters(subtitle, "jump-char-subtitle", "jump-word-subtitle")}
            </p>
          )}
        </div>

        {/* Layer 4: Petunjuk Scroll */}
        <div ref={hintRef} className="scroll-mask-scroll-hint">
          <div className="scroll-hint-mouse">
            <span className="scroll-hint-dot" />
          </div>
          <span className="scroll-hint-text">{scrollHint}</span>
          <ChevronDown size={14} className="scroll-hint-arrow" />
        </div>
      </div>
    </div>
  );
}
