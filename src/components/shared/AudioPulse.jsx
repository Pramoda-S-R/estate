import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import "./AudioPulse.scss";

const lineCount = 3;

export default function AudioPulse({ active, volume, hover }) {
  const lines = useRef([]);

  useEffect(() => {
    let timeout = null;

    const update = () => {
      lines.current.forEach((line, i) => {
        if (line) {
          line.style.height = `${Math.min(
            24,
            4 + volume * (i === 1 ? 400 : 60)
          )}px`;
        }
      });
      timeout = window.setTimeout(update, 100);
    };

    update();

    return () => clearTimeout(timeout);
  }, [volume]);

  return (
    <div className={clsx("audioPulse", { active, hover })}>
      {Array(lineCount)
        .fill(null)
        .map((_, i) => (
          <div
            key={i}
            ref={(el) => (lines.current[i] = el)}
            style={{ animationDelay: `${i * 133}ms` }}
          />
        ))}
    </div>
  );
}
