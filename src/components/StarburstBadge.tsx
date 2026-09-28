import React from 'react';

interface StarburstBadgeProps {
  points?: number;
  innerRadius?: number;
  outerRadius?: number;
  fillColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
  className?: string;
  children: React.ReactNode;
  rotate?: number;
}

export const StarburstBadge: React.FC<StarburstBadgeProps> = ({
  points = 14,
  innerRadius = 38,
  outerRadius = 50,
  fillColor = '#ffdf00',
  strokeColor = '#000000',
  strokeWidth = 2,
  className = '',
  children,
  rotate = 0,
}) => {
  // Generate jagged starburst path
  const center = 50;
  const step = Math.PI / points;
  let path = '';

  for (let i = 0; i < 2 * points; i++) {
    const r = i % 2 === 0 ? outerRadius : innerRadius;
    const angle = i * step - Math.PI / 2;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    path += (i === 0 ? 'M' : 'L') + ` ${x.toFixed(2)} ${y.toFixed(2)} `;
  }
  path += 'Z';

  return (
    <div
      className={`relative inline-flex items-center justify-center cursor-pointer select-none transition-transform duration-100 active:scale-95 ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-[2px_3px_0_rgba(0,0,0,0.85)]"
      >
        <path
          d={path}
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinejoin="miter"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center pointer-events-none">
        {children}
      </div>
    </div>
  );
};
