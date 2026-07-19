"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import CountUp from "react-countup";

export default function Statistics() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "150px" });
  const endValues = [10, 5, 18];
  const suffixes = [
    "ans d'engagement",
    "animaux sauvés",
    "tonnes de croquettes distribuées",
  ];

  return (
    <ul
      aria-label="Statistiques clés"
      className="flex gap-12 md:gap-24 flex-col md:flex-row"
    >
      {endValues.map((endValue, i) => (
        <li key={suffixes[i]} className="flex flex-col items-center text-lg">
          <span
            ref={ref}
            aria-hidden="true"
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary"
          >
            {i !== 0 ? "+" : ""}
            {isInView ? <CountUp end={endValue} duration={2} /> : 0}
            {i !== 0 ? "K" : ""}
          </span>
          <span className="sr-only" aria-live="polite" aria-atomic="true">
            {isInView
              ? `${i !== 0 ? "+" : ""}${endValue}${i !== 0 ? "K" : ""} ${suffixes[i]}`
              : ""}
          </span>
          {suffixes[i]}
        </li>
      ))}
    </ul>
  );
}