import React from 'react';

interface BotSvgIconProps {
  className?: string;
  eyeColor?: string;
}

/**
 * Minimalist Bot SVG Icon based on the provided user asset:
 * Features top antenna peg, rounded squircle head with circular eye cutouts,
 * and a smooth curved capsule bowl torso.
 */
export const BotSvgIcon: React.FC<BotSvgIconProps> = ({
  className = 'w-6 h-6',
  eyeColor = '#ffffff',
}) => {
  return (
    <svg
      viewBox="0 0 800 800"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Top Antenna Peg */}
      <rect x="375" y="65" width="50" height="75" rx="25" />

      {/* Head Squircle */}
      <rect x="180" y="115" width="440" height="305" rx="90" />

      {/* Eyes Cutouts */}
      <circle cx="320" cy="255" r="38" fill={eyeColor} />
      <circle cx="480" cy="255" r="38" fill={eyeColor} />

      {/* Lower Torso Capsule / Bowl */}
      <path d="M 170 465 C 170 445 190 440 215 440 L 585 440 C 610 440 630 445 630 465 C 630 630 520 735 400 735 C 280 735 170 630 170 465 Z" />
    </svg>
  );
};
