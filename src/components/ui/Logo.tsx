import React from 'react';

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "w-16 h-16" }: LogoProps) {
  return (
    <svg 
      viewBox="0 0 500 500" 
      className={className} 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer black circle with cyan border */}
      <circle cx="250" cy="250" r="240" fill="#000000" stroke="#00ffff" strokeWidth="3" />
      
      {/* Inner orange circle */}
      <circle cx="250" cy="250" r="160" fill="#f59e0b" />
      
      {/* Text Path Top */}
      <path id="text-path-top" d="M 60,250 A 190,190 0 0,1 440,250" fill="none" />
      <text fill="#fbbf24" fontSize="56" fontWeight="bold" fontFamily="serif" letterSpacing="6">
        <textPath href="#text-path-top" startOffset="50%" textAnchor="middle">ELITE UNIV</textPath>
      </text>

      {/* Text Path Bottom */}
      <path id="text-path-bottom" d="M 20,250 A 230,230 0 0,0 480,250" fill="none" />
      <text fill="#fbbf24" fontSize="40" fontWeight="bold" fontFamily="serif" letterSpacing="4">
        <textPath href="#text-path-bottom" startOffset="50%" textAnchor="middle">DESIGN AND LAYOUT</textPath>
      </text>

      {/* Decorative Diamonds */}
      <g transform="translate(50, 250)">
        <circle cx="0" cy="0" r="16" fill="none" stroke="#fbbf24" strokeWidth="2" />
        <path d="M 0,-10 L 10,0 L 0,10 L -10,0 Z" fill="none" stroke="#fbbf24" strokeWidth="2" />
      </g>
      <g transform="translate(450, 250)">
        <circle cx="0" cy="0" r="16" fill="none" stroke="#fbbf24" strokeWidth="2" />
        <path d="M 0,-10 L 10,0 L 0,10 L -10,0 Z" fill="none" stroke="#fbbf24" strokeWidth="2" />
      </g>

      {/* Graduation Cap */}
      <g transform="translate(0, -10)">
        {/* Cap Base */}
        <path d="M 130,220 L 250,170 L 370,220 L 250,270 Z" fill="#451a1a" stroke="#fbbf24" strokeWidth="1.5" />
        {/* Cap Bottom */}
        <path d="M 170,240 L 170,280 Q 250,310 330,280 L 330,240 Z" fill="#451a1a" />
        
        {/* Tassel */}
        <circle cx="250" cy="220" r="5" fill="#fbbf24" />
        <path d="M 250,220 Q 320,230 350,280" fill="none" stroke="#fbbf24" strokeWidth="2.5" />
        <path d="M 345,280 L 355,280 L 360,320 L 340,320 Z" fill="#fbbf24" />

        {/* EU Text on Cap */}
        <text x="270" y="265" fill="#00ffff" fontSize="26" fontWeight="bold" fontFamily="serif" transform="rotate(-12 270 265)">EU</text>
      </g>

      {/* Diploma */}
      <g transform="translate(0, 10)">
        <rect x="140" y="280" width="220" height="35" rx="5" fill="#fef3c7" />
        <ellipse cx="360" cy="297.5" rx="12" ry="17.5" fill="#fde68a" stroke="#d97706" strokeWidth="1" />
        <path d="M 360,280 A 12,17.5 0 0,0 360,315" fill="none" stroke="#d97706" strokeWidth="2" />
        
        {/* Ribbon */}
        <path d="M 230,280 L 255,280 L 255,315 L 230,315 Z" fill="#7f1d1d" />
        <path d="M 235,315 L 215,355 L 242.5,340 L 260,365 L 255,315 Z" fill="#7f1d1d" />
      </g>
    </svg>
  );
}
