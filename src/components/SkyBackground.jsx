import { useEffect, useRef, useMemo, useCallback } from "react";
import "../css/SkyBackground.css";

// ── Seeded random for deterministic star placement ──
function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// ── Generate star data (memoised) ──
function generateStars(count, seed = 42) {
  const rand = seededRandom(seed);
  const sizes = ["sm", "md", "lg"];
  const twinkles = ["twinkle-1", "twinkle-2", "twinkle-3"];
  const stars = [];

  for (let i = 0; i < count; i++) {
    const sizeIdx = rand() < 0.6 ? 0 : rand() < 0.8 ? 1 : 2;
    const twinkleIdx = Math.floor(rand() * 3);

    stars.push({
      id: i,
      x: rand() * 100,
      y: rand() * 100,
      size: sizes[sizeIdx],
      twinkle: twinkles[twinkleIdx],
      delay: rand() * 6,
    });
  }
  return stars;
}

// ── Cloud SVG shapes ──
function CloudSVG({ color = "#fff", opacity = 0.9, width = 200 }) {
  const h = width * 0.45;
  return (
    <svg
      viewBox="0 0 200 90"
      width={width}
      height={h}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <ellipse cx="60" cy="60" rx="60" ry="30" fill={color} opacity={opacity} />
      <ellipse cx="100" cy="42" rx="50" ry="35" fill={color} opacity={opacity} />
      <ellipse cx="145" cy="55" rx="45" ry="28" fill={color} opacity={opacity} />
      <ellipse cx="80" cy="50" rx="40" ry="25" fill={color} opacity={opacity * 0.9} />
      <ellipse cx="125" cy="45" rx="35" ry="22" fill={color} opacity={opacity * 0.85} />
    </svg>
  );
}

function SkyBackground({ darkMode }) {
  const skyRef = useRef(null);
  const shootingRef = useRef(null);
  const shootingTimerRef = useRef(null);
  const scrollRAFRef = useRef(null);
  const mouseRAFRef = useRef(null);

  // Detect reduced motion preference
  const prefersReduced = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  // Detect mobile
  const isMobile = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth <= 768;
  }, []);

  // Generate stars – fewer on mobile
  const starCount = isMobile ? 60 : 120;
  const stars = useMemo(() => generateStars(starCount), [starCount]);

  // ── Scroll parallax ──
  useEffect(() => {
    if (prefersReduced) return;
    const sky = skyRef.current;
    if (!sky) return;

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        scrollRAFRef.current = requestAnimationFrame(() => {
          const offset = window.scrollY * 0.08;
          sky.style.setProperty("--scroll-y", `${offset}px`);
          ticking = false;
        });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollRAFRef.current) cancelAnimationFrame(scrollRAFRef.current);
    };
  }, [prefersReduced]);

  // ── Mouse parallax (desktop only) ──
  useEffect(() => {
    if (prefersReduced || isMobile) return;
    const sky = skyRef.current;
    if (!sky) return;

    let ticking = false;
    const onMove = (e) => {
      if (!ticking) {
        ticking = true;
        mouseRAFRef.current = requestAnimationFrame(() => {
          const mx = (e.clientX / window.innerWidth - 0.5) * 12;
          const my = (e.clientY / window.innerHeight - 0.5) * 8;
          sky.style.setProperty("--mouse-x", `${mx}px`);
          sky.style.setProperty("--mouse-y", `${my}px`);
          ticking = false;
        });
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (mouseRAFRef.current) cancelAnimationFrame(mouseRAFRef.current);
    };
  }, [prefersReduced, isMobile]);

  // ── Shooting star (dark mode only) ──
  const triggerShootingStar = useCallback(() => {
    const el = shootingRef.current;
    if (!el || prefersReduced) return;

    // Random start position
    const startX = 10 + Math.random() * 40;
    const startY = 5 + Math.random() * 25;
    el.style.left = `${startX}%`;
    el.style.top = `${startY}%`;

    // Remove and re-add class to retrigger animation
    el.classList.remove("active");
    // Force reflow
    void el.offsetWidth;
    el.classList.add("active");

    // Remove class after animation
    setTimeout(() => {
      el.classList.remove("active");
    }, 1300);
  }, [prefersReduced]);

  useEffect(() => {
    if (!darkMode || prefersReduced) {
      if (shootingTimerRef.current) {
        clearTimeout(shootingTimerRef.current);
        shootingTimerRef.current = null;
      }
      return;
    }

    const scheduleNext = () => {
      const delay = 6000 + Math.random() * 6000; // 6-12s
      shootingTimerRef.current = setTimeout(() => {
        triggerShootingStar();
        scheduleNext();
      }, delay);
    };

    scheduleNext();

    return () => {
      if (shootingTimerRef.current) {
        clearTimeout(shootingTimerRef.current);
        shootingTimerRef.current = null;
      }
    };
  }, [darkMode, prefersReduced, triggerShootingStar]);

  // ── Pause on tab hidden ──
  useEffect(() => {
    const sky = skyRef.current;
    if (!sky) return;

    const onVisibility = () => {
      sky.setAttribute("data-paused", document.hidden ? "true" : "false");
    };

    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  return (
    <div
      className="sky-bg"
      ref={skyRef}
      aria-hidden="true"
      data-paused="false"
      style={{
        "--scroll-y": "0px",
        "--mouse-x": "0px",
        "--mouse-y": "0px",
      }}
    >
      {/* ── SUN (light mode) ── */}
      <div className="sky-sun" />

      {/* ── MOON (dark mode) ── */}
      <div className="sky-moon" />

      {/* ── NEBULA (dark mode) ── */}
      <div className="sky-nebula" />
      <div className="sky-nebula-2" />

      {/* ── CLOUDS (light mode, faint in dark) ── */}
      <div
        className="sky-clouds-layer"
        style={{ transform: `translateY(calc(var(--scroll-y) * 0.3))` }}
      >
        {/* Far clouds */}
        <div className="sky-cloud sky-cloud--far c1">
          <CloudSVG opacity={0.6} />
        </div>
        <div className="sky-cloud sky-cloud--far c2">
          <CloudSVG opacity={0.5} />
        </div>

        {/* Mid clouds */}
        <div
          className="sky-cloud sky-cloud--mid c3"
          style={{ transform: `translate(var(--mouse-x, 0), var(--mouse-y, 0))` }}
        >
          <CloudSVG opacity={0.7} />
        </div>
        <div className="sky-cloud sky-cloud--mid c4">
          <CloudSVG opacity={0.65} />
        </div>
        <div className="sky-cloud sky-cloud--mid c5">
          <CloudSVG opacity={0.6} />
        </div>

        {/* Near clouds */}
        <div className="sky-cloud sky-cloud--near c6">
          <CloudSVG opacity={0.85} />
        </div>
        <div className="sky-cloud sky-cloud--near c7">
          <CloudSVG opacity={0.8} />
        </div>
      </div>

      {/* ── STARS (dark mode) ── */}
      <div
        className="sky-stars-layer"
        style={{
          transform: `translate(
            calc(var(--mouse-x, 0px) * 0.5),
            calc(var(--mouse-y, 0px) * 0.5 + var(--scroll-y, 0px) * 0.15)
          )`,
        }}
      >
        {stars.map((star) => (
          <div
            key={star.id}
            className={`sky-star sky-star--${star.size} sky-star--${star.twinkle}`}
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
      </div>

      {/* ── SHOOTING STAR (dark mode) ── */}
      <div className="sky-shooting-star" ref={shootingRef} />
    </div>
  );
}

export default SkyBackground;
