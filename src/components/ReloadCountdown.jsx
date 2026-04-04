import { useState, useEffect, useRef } from "react";
import "./ReloadCountdown.css";

export default function ReloadCountdown() {
  const [visible, setVisible] = useState(false);
  const [count, setCount] = useState(3);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    // Show on first mount (page load / reload)
    setVisible(true);
    setCount(3);

    intervalRef.current = setInterval(() => {
      setCount((c) => {
        if (c <= 1) {
          clearInterval(intervalRef.current);
          return 0;
        }
        return c - 1;
      });
    }, 1000);

    // Auto-hide after countdown finishes + small delay
    timeoutRef.current = setTimeout(() => {
      setVisible(false);
    }, 3800);

    return () => {
      clearInterval(intervalRef.current);
      clearTimeout(timeoutRef.current);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={`reload-toast ${count === 0 ? "fading" : ""}`}>
      <div className="toast-icon">◈</div>
      <div className="toast-body">
        <span className="toast-title">Finlens loaded</span>
        <span className="toast-sub">Data restored from local storage</span>
      </div>
      <div className="toast-countdown">
        <svg className="countdown-ring" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="15" className="ring-bg" />
          <circle
            cx="18" cy="18" r="15"
            className="ring-fill"
            style={{ "--count": count }}
          />
        </svg>
        <span className="countdown-num">{count}</span>
      </div>
    </div>
  );
}
