import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './HeroPortrait.css';

// Preload image
const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

function HeroPortrait({ halftoneUrl = '/foto-utama.png', colorUrl = '/foto-utama.png' }) {
  const containerRef = useRef(null);
  const revealLayerRef = useRef(null);
  const rafRef = useRef(null);
  const posRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const isHoveredRef = useRef(false);

  useEffect(() => {
    // Preload color image
    preloadImage(colorUrl);

    const container = containerRef.current;
    const revealLayer = revealLayerRef.current;
    if (!container || !revealLayer) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Lerp function for smooth following
    const lerp = (start, end, factor) => start + (end - start) * factor;

    // Get responsive radius
    const getRadius = () => {
      const vw = window.innerWidth;
      if (vw < 640) return 120;
      if (vw < 1024) return 150;
      return 180;
    };

    // Update mask position
    const updateMask = () => {
      if (!isHoveredRef.current) return;

      const lerpFactor = 0.15;
      posRef.current.x = lerp(posRef.current.x, posRef.current.targetX, lerpFactor);
      posRef.current.y = lerp(posRef.current.y, posRef.current.targetY, lerpFactor);

      const radius = getRadius();
      revealLayer.style.setProperty('--x', `${posRef.current.x}px`);
      revealLayer.style.setProperty('--y', `${posRef.current.y}px`);
      revealLayer.style.setProperty('--r', `${radius}px`);

      rafRef.current = requestAnimationFrame(updateMask);
    };

    // Handle pointer move
    const handlePointerMove = (e) => {
      if (prefersReducedMotion) return;

      const rect = container.getBoundingClientRect();
      posRef.current.targetX = e.clientX - rect.left;
      posRef.current.targetY = e.clientY - rect.top;

      if (!isHoveredRef.current) {
        posRef.current.x = posRef.current.targetX;
        posRef.current.y = posRef.current.targetY;
      }
    };

    // Handle pointer enter
    const handlePointerEnter = (e) => {
      if (prefersReducedMotion) {
        revealLayer.style.setProperty('--r', `${getRadius()}px`);
        return;
      }

      isHoveredRef.current = true;
      const rect = container.getBoundingClientRect();
      posRef.current.x = e.clientX - rect.left;
      posRef.current.y = e.clientY - rect.top;
      posRef.current.targetX = posRef.current.x;
      posRef.current.targetY = posRef.current.y;

      // Animate radius in
      gsap.to(revealLayer, {
        '--r': `${getRadius()}px`,
        duration: 0.5,
        ease: 'power3.out',
      });

      rafRef.current = requestAnimationFrame(updateMask);
    };

    // Handle pointer leave
    const handlePointerLeave = () => {
      if (prefersReducedMotion) {
        revealLayer.style.setProperty('--r', '0px');
        return;
      }

      isHoveredRef.current = false;

      // Animate radius out
      gsap.to(revealLayer, {
        '--r': '0px',
        duration: 0.4,
        ease: 'power2.inOut',
        onComplete: () => {
          if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
          }
        },
      });
    };

    // Add event listeners
    container.addEventListener('pointerenter', handlePointerEnter);
    container.addEventListener('pointermove', handlePointerMove);
    container.addEventListener('pointerleave', handlePointerLeave);

    // Handle window resize
    const handleResize = () => {
      if (isHoveredRef.current) {
        revealLayer.style.setProperty('--r', `${getRadius()}px`);
      }
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      container.removeEventListener('pointerenter', handlePointerEnter);
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('resize', handleResize);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [colorUrl]);

  return (
    <div ref={containerRef} className="hero-portrait-container">
      {/* Halftone layer (base) */}
      <div className="hero-portrait-layer hero-portrait-halftone">
        <img src={halftoneUrl} alt="" className="hero-portrait-img" />
      </div>

      {/* Color reveal layer (masked) */}
      <div
        ref={revealLayerRef}
        className="hero-portrait-layer hero-portrait-reveal"
        style={{
          '--x': '50%',
          '--y': '50%',
          '--r': '0px',
        }}
      >
        <img src={colorUrl} alt="Dandi Pratama" className="hero-portrait-img" />
      </div>
    </div>
  );
}

export default HeroPortrait;
