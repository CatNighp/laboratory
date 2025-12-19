import { useEffect, useRef, useState } from "react";

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

      const rect = pupilRef.current.parentElement!.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;

      const distance = Math.min(12, Math.sqrt(dx * dx + dy * dy));
      const angle = Math.atan2(dy, dx);

      const px = Math.cos(angle) * distance;
      const py = Math.sin(angle) * distance;

      pupilRef.current.style.transform = `translate(${px}px, ${py}px)`;
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

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
        border: "4px solid #eee",
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
          transition: "transform 0.1s ease-out",
        }}
      />
    </div>
  );
};

export default function EyeFollowPage() {
  const eyes = [
    { x: 200, y: 150 },
    { x: 350, y: 220 },
    { x: 260, y: 320 },
    { x: 420, y: 140 },
  ];

  return (
    <div
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
          color: "#777",
          fontSize: 14,
        }}
      >
        👀 カーソルを動かしてね
      </div>
    </div>
  );
}
