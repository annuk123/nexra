"use client";

import { useEffect, useState } from "react";

export default function GridSparks() {
  const [sparks, setSparks] = useState<number[]>([]);

  useEffect(() => {
    // create 8 sparks
    setSparks(Array.from({ length: 8 }, (_, i) => i));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {sparks.map((i) => (
        <span
          key={i}
          className="spark"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${8 + Math.random() * 12}s`,
          }}
        />
      ))}
    </div>
  );
}
