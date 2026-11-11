import { useLayoutEffect, useRef, useState } from 'react';

/**
 * Renders children at a fixed design size (e.g. 1200×600) and scales the whole
 * thing down to fit narrower screens, so pixel-accurate mockups stay intact.
 */
export default function ScaleBox({ width, height, className = '', children, style }) {
  const outer = useRef(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const el = outer.current;
    if (!el) return;
    const update = () => setScale(Math.min(1, el.clientWidth / width));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [width]);

  return (
    <div ref={outer} className={className} style={{ width: '100%', maxWidth: width, height: height * scale, ...style }}>
      <div
        style={{
          width,
          height,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          position: 'relative',
        }}
      >
        {children}
      </div>
    </div>
  );
}
