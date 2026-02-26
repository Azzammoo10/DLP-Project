import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * Animated counter that counts up when element enters viewport.
 */
export default function CountUp({ end, suffix = "", prefix = "", duration = 2, decimals = 0 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const step = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / (duration * 1000), 1);
            // ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(eased * end);
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}
