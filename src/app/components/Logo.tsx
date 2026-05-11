import React from 'react';

/** Served from `public/brand/` — used across web + mobile preview (screenshots pick this up). */
export const BRAND_WORDMARK_SRC = '/brand/wordmark.png';
export const BRAND_MARK_SRC = '/brand/mark.png';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

const sizeToClass: Record<NonNullable<LogoProps['size']>, string> = {
  sm: 'h-7 sm:h-8',
  md: 'h-9 sm:h-10',
  lg: 'h-14 sm:h-16',
};

export function Logo({ size = 'md', showText = true, className = '' }: LogoProps) {
  const h = sizeToClass[size];
  const src = showText ? BRAND_WORDMARK_SRC : BRAND_MARK_SRC;

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <img
        src={src}
        alt={showText ? 'ZokaiHub' : ''}
        aria-hidden={!showText}
        decoding="async"
        className={`${h} w-auto max-w-[min(100%,280px)] object-contain object-center`}
        draggable={false}
      />
    </div>
  );
}

/** App icon mark (adaptive icon source from brand kit). */
export function LogoIcon({ className = '' }: { className?: string }) {
  return (
    <div className={`relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-xl ${className}`}>
      <img
        src={BRAND_MARK_SRC}
        alt=""
        aria-hidden
        decoding="async"
        className="size-9 object-contain"
        draggable={false}
      />
    </div>
  );
}

/** Header / footer: wordmark image (includes full brand lockup from design assets). */
export function LogoFull({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img
        src={BRAND_WORDMARK_SRC}
        alt="ZokaiHub"
        decoding="async"
        className="h-9 w-auto max-w-[220px] object-contain object-start sm:h-10 sm:max-w-[260px]"
        draggable={false}
      />
    </div>
  );
}
