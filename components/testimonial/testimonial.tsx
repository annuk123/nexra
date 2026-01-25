"use client";
import { Section } from "@/design-system/layout/Section";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

const testimonials = [
  {
    text: "Validating before building saves months of pain. Clarity early is an unfair advantage.",
    author: "Founder, Twitter",
  },
  {
    text: "Clarity before commitment. I didn’t even need to read the whole page.",
    author: "Indie Hacker",
  },
  {
    text: "Super clean. Signed up instantly.",
    author: "Builder",
  },
  {
    text: "Idea validation plus competitor awareness is early-stage gold.",
    author: "Founder",
  },
  {
    text: "A thinking partner for founders sounds powerful.",
    author: "Founder, Twitter",
  },
  {
    text: "Very strong concept. This will do well.",
    author: "Indie Hacker",
  },
  {
    text: "This could be extremely useful for founders.",
    author: "Builder",
  },
  {
    text: "The exact reasons startups fail are what Nexra surfaces.",
    author: "Founder, private DM",
  },
];

export default function Testimonials() {
    const containerRef = useRef(null);
    const [active, setActive] = useState(0);
  
  return (
    
    <div className="relative">
  <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-linear-to-r from-black/30 to-transparent z-10" />
  <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-linear-to-l from-black/30 to-transparent z-10" />

    <Section size="md">
      <p className="text-xs tracking-widest text-neutral-500">
        BUILDING IN PUBLIC
      </p>

      <h2 className="mt-4 text-3xl sm:text-4xl font-semibold">
        Early feedback from founders
      </h2>

      <p className="mt-3 text-neutral-400 max-w-2xl">
        Live feedback from Twitter, DMs, and early users.
      </p>

      {/* Swipe Row */}
      <div className="mt-12 flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide">
        {/* {testimonials.map((t, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
            className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-5 
           w-55 sm:w-65 md:w-75 snap-center shrink-0"
          >
            <p className="text-sm text-neutral-200 leading-relaxed break-word">

              “{t.text}”
            </p>
            <p className="mt-3 text-xs text-neutral-500">— {t.author}</p>
          </motion.div>
        ))} */}
         {/* Swipe Row */}
      <div
        ref={containerRef}
        onScroll={(e) => {
          const index = Math.round((e.target as HTMLElement).scrollLeft / 300);
          setActive(index);
        }}
        className="mt-12 flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide"
      >
        {testimonials.map((t, i) => (
          <Card key={i} {...t} />
        ))}
      </div>

      {/* Apple-style dots */}
      
      </div>
          <div className="mt-4 flex gap-2 justify-center">
        {testimonials.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 w-1.5 rounded-full transition ${
              active === i ? "bg-neutral-100" : "bg-neutral-600"
            }`}
          />
        ))}
      </div>
    </Section>

    </div>
  );
}


interface CardProps {
  
  text: string;
  author: string;
}

function Card({ text, author }: CardProps) {
  return (
          <motion.div
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
            className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-5 
           w-55 sm:w-65 md:w-75 snap-center shrink-0"
          >
            <p className="text-sm text-neutral-200 leading-relaxed break-word">

              “{text}”
            </p>
            <p className="mt-3 text-xs text-neutral-500">— {author}</p>
          </motion.div>
  );
}
