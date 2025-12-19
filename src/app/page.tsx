"use client";

import { useEffect, useRef } from "react";

type EyeProps = {
  x: number;
  y: number;
  size?: number;
};

const Eye = ({ x, y, size = 80 }: EyeProps) => {
  const pupilRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!pupilRef.current) return;

      const eye = pupilRef.current.parentElement!;
      const rect = eye.getBoundingClientRect();

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;

      const maxMove = size * 0.15;
      const angle = Math.atan2(dy, dx);
      const distance = Math.min(maxMove, Math.hypot(dx, dy));

      const px = Math.cos(angle) * distance;
      const py = Math.sin(angle) * distance;

      pupilRef.current.style.transform = `translate(${px}px, ${py}px)`;
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [size]);

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: "50%",
        background: "#fff",
        border: "4px solid #e5e5e5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        ref={pupilRef}
        style={{
          width: size * 0.3,
          height: size * 0.3,
          background: "#000",
          borderRadius: "50%",
          transition: "transform 0.12s ease-out",
        }}
      />
    </div>
  );
};

export default function Page() {
  const eyes = [
    { x: 180, y: 160 },
    { x: 320, y: 220 },
    { x: 240, y: 340 },
    { x: 420, y: 150 },
  ];

  return (
    <main
      style={{
        width: "100vw",
        height: "100vh",
        background: "#faf7f2",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {eyes.map((eye, i) => (
        <Eye key={i} x={eye.x} y={eye.y} />
      ))}

      <div
        style={{
          position: "fixed",
          bottom: 20,
          width: "100%",
          textAlign: "center",
          fontSize: 14,
          color: "#777",
        }}
      >
        👀 カーソルを動かしてね
      </div>
    </main>
  );
}
