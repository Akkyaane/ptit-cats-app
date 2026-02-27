interface CatLogoProps {
  className?: string;
  animated?: boolean;
}

export default function CatLogo({ className = "", animated = true }: CatLogoProps) {
  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Ears */}
        <path
          d="M20 45 L30 15 L45 40 Z"
          className="fill-orange-400 dark:fill-orange-500"
        />
        <path
          d="M80 45 L70 15 L55 40 Z"
          className="fill-orange-400 dark:fill-orange-500"
        />
        {/* Inner ears */}
        <path
          d="M25 40 L32 22 L42 38 Z"
          className="fill-pink-300 dark:fill-pink-400"
        />
        <path
          d="M75 40 L68 22 L58 38 Z"
          className="fill-pink-300 dark:fill-pink-400"
        />
        {/* Face */}
        <ellipse
          cx="50"
          cy="58"
          rx="35"
          ry="32"
          className="fill-orange-300 dark:fill-orange-400"
        />
        {/* Eyes */}
        <g className={animated ? "animate-blink" : ""}>
          <ellipse cx="35" cy="52" rx="6" ry="8" className="fill-white" />
          <ellipse cx="65" cy="52" rx="6" ry="8" className="fill-white" />
          <circle cx="36" cy="53" r="4" className="fill-zinc-800 dark:fill-zinc-900" />
          <circle cx="66" cy="53" r="4" className="fill-zinc-800 dark:fill-zinc-900" />
          <circle cx="37" cy="51" r="1.5" className="fill-white" />
          <circle cx="67" cy="51" r="1.5" className="fill-white" />
        </g>
        {/* Nose */}
        <ellipse cx="50" cy="65" rx="4" ry="3" className="fill-pink-400 dark:fill-pink-500" />
        {/* Mouth */}
        <path
          d="M50 68 Q50 73 45 75"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="text-zinc-600 dark:text-zinc-700"
          fill="none"
        />
        <path
          d="M50 68 Q50 73 55 75"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="text-zinc-600 dark:text-zinc-700"
          fill="none"
        />
        {/* Whiskers */}
        <g className="text-zinc-500 dark:text-zinc-600">
          <line x1="10" y1="55" x2="28" y2="58" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="8" y1="62" x2="28" y2="63" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="10" y1="69" x2="28" y2="68" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="90" y1="55" x2="72" y2="58" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="92" y1="62" x2="72" y2="63" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="90" y1="69" x2="72" y2="68" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}
