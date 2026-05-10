"use client";
import { useEffect, useState } from "react";

const LINES = [
  "Will anyone actually pay for this?",
  "Is this worth the next 2 years of my life?",
  "Am I building what people want or what I want?",
  "Should I have launched already?",
  "Do I actually have traction or am I lying to myself?",
];

export default function TruthStrip() {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    let timeout: any;

    if (typing) {
      if (displayed.length < LINES[index].length) {
        timeout = setTimeout(() => {
          setDisplayed(LINES[index].slice(0, displayed.length + 1));
        }, 35);
      } else {
        timeout = setTimeout(() => setTyping(false), 1800);
      }
    } else {
      timeout = setTimeout(() => {
        setDisplayed("");
        setTyping(true);
        setIndex((i) => (i + 1) % LINES.length);
      }, 400);
    }

    return () => clearTimeout(timeout);
  }, [displayed, typing, index]);

  return (
    <div className="border-y border-nx-border bg-nx-surface py-6 text-center">
      <div className="font-mono text-sm tracking-wide text-nx-muted">
        <span className="text-nx-amberLight font-medium">
          "{displayed}"
        </span>
        <span className="animate-pulse ml-1 text-nx-amberLight">|</span>
      </div>
    </div>
  );
}