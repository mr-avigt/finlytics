import { useEffect, useState, useRef } from "react";

export default function useCountUp(end, duration = 800) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  // 👇 Detect when visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  // 👇 Animate only when visible
  useEffect(() => {
    if (!visible) return;

    let start = 0;
    const startTime = performance.now();

    const animate = (time) => {
      const progress = Math.min((time - startTime) / duration, 1);

      // 🔥 easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);

      const current = Math.floor(eased * end);
      setValue(current);

      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [visible, end, duration]);

  return [value, ref];
}