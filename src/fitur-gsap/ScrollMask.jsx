import React, { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";
import "./ScrollMask.css";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollMask({
  src = "",
  alt = "Portfolio Visual",
  welcomeText = "SELAMAT DATANG",
  title = "PORTFOLIO DANDI PRATAMA",
  scrollHint = "Scroll ke bawah",
  variant = "iris",
  scrollLength = 3.2,
  settle = 0.84,
  zoom = 1.24,
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
      frame.style.clipPath = `circle(${radius}% at 50% 50%)`;
    }

    if (darkVeil) {
      const veilOpacity = Math.max(0, 1 - expandProgress * 1.3);
      darkVeil.style.opacity = `${veilOpacity}`;
      darkVeil.style.pointerEvents = veilOpacity > 0.05 ? "auto" : "none";
    }

    if (media) {
      const currentScale = zoom - (zoom - 1.0) * expandProgress;
      media.style.transform = `scale(${currentScale})`;
    }

    if (intro) {
      const out = Math.min(1, Math.max(0, p / 0.42));
      const outEase = out * out;
      intro.style.opacity = `${1 - outEase}`;
      intro.style.transform = `translate3d(0, ${-45 * outEase}px, 0)`;
      intro.style.pointerEvents = out >= 0.75 ? "none" : "auto";
    }

    if (hint) {
      const hintOut = Math.min(1, Math.max(0, p / 0.18));
      hint.style.opacity = `${1 - hintOut}`;
      hint.style.transform = `translate3d(0, ${18 * hintOut}px, 0)`;
    }
  }, [settle, zoom]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: track,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.6,
        onUpdate: (self) => {
          applyProgress(self.progress);
        },
      });
    }, track);

    applyProgress(0);

    return () => ctx.revert();
  }, [applyProgress, scrollLength]);

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

        {/* Layer 2: Soft Dark Veil Overlay (Hitamnya Halus & Lembut) */}
        <div ref={darkVeilRef} className="scroll-mask-dark-veil" aria-hidden="true" />

        {/* Layer 3: Welcome Overlay (Font Poppins, Bersih Tanpa Role) */}
        <div ref={introOverlayRef} className="scroll-mask-welcome-overlay">
          {welcomeText && (
            <p className="welcome-headline-lead">
              {welcomeText}
            </p>
          )}

          <h1 className="welcome-main-title">
            {title}
          </h1>
        </div>

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
