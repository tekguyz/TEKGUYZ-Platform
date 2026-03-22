import React from 'react';

export function LogoMark({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`text-primary ${className}`}
    >
      {/* Hexagon Outline */}
      <polygon 
        points="12 2, 21 7, 21 17, 12 22, 3 17, 3 7" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinejoin="round"
      />
      
      {/* Left Eye: < */}
      <polyline 
        points="9 10, 6 12, 9 14" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      
      {/* Right Eye: > */}
      <polyline 
        points="15 10, 18 12, 15 14" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      
      {/* Mouth: _ (Blinking) */}
      <line 
        x1="10" 
        y1="17" 
        x2="14" 
        y2="17" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round"
        className="animate-blink"
      />
    </svg>
  );
}

export function Logotype({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center font-black uppercase tracking-[0.2em] ${className}`}>
      <span>TEKGUY</span>
      <span className="relative inline-flex">
        <span className="invisible">Z</span>
        <span className="absolute inset-0" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)' }}>Z</span>
        <span className="absolute inset-0 translate-x-[2px] translate-y-[2px] text-brand-slice" style={{ clipPath: 'polygon(0 45%, 100% 45%, 100% 100%, 0 100%)' }}>Z</span>
      </span>
    </div>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <LogoMark className="w-7 h-7 drop-shadow-[0_0_12px_var(--primary)]" />
      <Logotype className="text-xl text-foreground" />
    </div>
  );
}
