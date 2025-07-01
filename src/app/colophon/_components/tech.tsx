'use client';

import React, { forwardRef, useRef } from 'react';

import { cn } from '@/lib/utils';
import { AnimatedBeam } from '@/components/magicui/animated-beam';

const Circle = forwardRef<HTMLDivElement, { className?: string; children?: React.ReactNode }>(
  ({ className, children }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]',
          className,
        )}
      >
        {children}
      </div>
    );
  },
);

Circle.displayName = 'Circle';

export function Tech() {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);
  const div8Ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative flex w-full items-center justify-center overflow-hidden p-10"
      ref={containerRef}
    >
      <div className="flex size-full flex-col items-stretch justify-between gap-10">
        <div className="flex flex-row justify-between">
          <Circle ref={div1Ref}>
            <Icons.nextjs />
          </Circle>
          <Circle ref={div2Ref}>
            <Icons.tailwindcss />
          </Circle>
          <Circle ref={div3Ref}>
            <Icons.shadcn />
          </Circle>
          <Circle ref={div4Ref}>
            <Icons.motion />
          </Circle>
        </div>
        <div className="flex flex-row justify-between">
          <Circle ref={div5Ref}>
            <Icons.mdx />
          </Circle>
          <Circle ref={div6Ref}>
            <Icons.prisma />
          </Circle>
          <Circle ref={div7Ref}>
            <Icons.vercel />
          </Circle>
          <Circle ref={div8Ref}>
            <Icons.github />
          </Circle>
        </div>
      </div>

      <AnimatedBeam duration={3} containerRef={containerRef} fromRef={div1Ref} toRef={div4Ref} />
      <AnimatedBeam duration={6} containerRef={containerRef} fromRef={div4Ref} toRef={div8Ref} />
      <AnimatedBeam duration={8} containerRef={containerRef} fromRef={div8Ref} toRef={div5Ref} />
      <AnimatedBeam duration={12} containerRef={containerRef} fromRef={div5Ref} toRef={div1Ref} />
    </div>
  );
}

const Icons = {
  shadcn: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100">
      <g
        stroke="#000"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="6.25"
        clip-path="url(#a)"
      >
        <path d="M81.25 49.999 50 81.249m25-65.625L15.625 74.999" />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0-.001h100v100H0z" />
        </clipPath>
      </defs>
    </svg>
  ),
  nextjs: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100">
      <path
        fill="#000"
        d="M50 99.999c27.614 0 50-22.386 50-50s-22.386-50-50-50-50 22.386-50 50 22.386 50 50 50"
      />
      <path
        fill="url(#a)"
        d="M83.06 87.51 38.412 30H30v39.983h6.73V38.545L77.777 91.58a50 50 0 0 0 5.283-4.07"
      />
      <path fill="url(#b)" d="M70.556 29.999h-6.667v40h6.667z" />
      <defs>
        <linearGradient
          id="a"
          x1="60.556"
          x2="80.278"
          y1="64.721"
          y2="89.166"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="b"
          x1="67.222"
          x2="67.111"
          y1="29.999"
          y2="59.374"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stop-opacity="0" />
        </linearGradient>
      </defs>
    </svg>
  ),
  tailwindcss: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100">
      <path
        fill="#06B6D4"
        d="M50 20q-20 0-25 19.994 7.5-9.997 17.5-7.498c3.804.95 6.522 3.71 9.532 6.764 4.902 4.974 10.576 10.731 22.969 10.731q20 0 24.999-19.995-7.5 9.997-17.5 7.5c-3.803-.951-6.521-3.71-9.531-6.765C68.067 25.758 62.392 20 50 20M25 49.991q-20 0-25 19.995 7.5-9.998 17.5-7.498c3.803.952 6.522 3.71 9.532 6.763C31.933 74.225 37.608 79.984 50 79.984q20 0 25-19.995-7.5 9.997-17.5 7.498c-3.803-.95-6.522-3.71-9.532-6.763C43.066 55.75 37.393 49.991 25 49.991"
      />
    </svg>
  ),
  motion: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100">
      <path
        fill="#000"
        d="M80.822 64.821c1.05 1.05.306 2.845-1.178 2.845H52c-.922 0-1.667.744-1.667 1.666v27.645c0 1.483-1.794 2.228-2.844 1.178L17.65 68.315a2.22 2.22 0 0 1-.65-1.571V35.999c0-.922.744-1.666 1.667-1.666h31.666zM50.333 34.333 19.844 3.843C18.794 2.794 19.54 1 21.022 1H82c.922 0 1.667.745 1.667 1.667v30c0 .922-.745 1.667-1.667 1.667z"
      />
    </svg>
  ),
  mdx: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 106 100">
      <path
        stroke="#000"
        stroke-width="5.051"
        d="M8.05 20h89.9a5.05 5.05 0 0 1 5.05 5.05v49.496a5.05 5.05 0 0 1-5.05 5.05H8.05A5.05 5.05 0 0 1 3 74.546V25.05A5.05 5.05 0 0 1 8.05 20Z"
      />
      <path
        fill="#000"
        d="M15.626 66.97V32.626h10.101l10.101 12.627L45.93 32.625h10.1V66.97h-10.1V47.273L35.827 59.899l-10.1-12.626V66.97zm63.131 0-15.15-16.667h10.101V32.626h10.101v17.677H93.91z"
      />
    </svg>
  ),
  vercel: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100">
      <path fill="#000" fill-rule="evenodd" d="M100 93.957 50 7 0 93.957z" clip-rule="evenodd" />
    </svg>
  ),
  prisma: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100">
      <path
        fill="#2D3748"
        fill-rule="evenodd"
        d="M9.774 68.638a4.98 4.98 0 0 1-.04-5.268L47.126 2.376c2.08-3.392 7.102-3.096 8.768.518l34.159 74.1a4.98 4.98 0 0 1-3.092 6.853L33.824 99.79a4.98 4.98 0 0 1-5.637-2.104zM51.44 20.21c.36-1.794 2.819-2.053 3.545-.373L78.548 74.36a1.868 1.868 0 0 1-1.18 2.53L40.653 87.85a1.867 1.867 0 0 1-2.365-2.157z"
        clip-rule="evenodd"
      />
    </svg>
  ),
  github: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100">
      <path
        fill="#161614"
        d="M50 1C22.39 1 0 23.386 0 51c0 22.092 14.327 40.834 34.193 47.446 2.499.462 3.417-1.085 3.417-2.406 0-1.192-.047-5.131-.068-9.309-13.91 3.025-16.846-5.9-16.846-5.9-2.274-5.779-5.551-7.315-5.551-7.315-4.537-3.104.341-3.04.341-3.04 5.022.353 7.665 5.153 7.665 5.153 4.46 7.644 11.697 5.434 14.55 4.156.449-3.232 1.745-5.437 3.175-6.686-11.106-1.264-22.78-5.552-22.78-24.71 0-5.459 1.953-9.92 5.151-13.42-.519-1.26-2.23-6.346.485-13.233 0 0 4.198-1.344 13.753 5.125 3.988-1.108 8.266-1.663 12.515-1.682 4.25.019 8.53.574 12.526 1.682 9.544-6.469 13.736-5.125 13.736-5.125 2.722 6.887 1.01 11.973.49 13.232 3.206 3.502 5.146 7.962 5.146 13.42 0 19.205-11.697 23.434-22.83 24.671 1.793 1.552 3.391 4.595 3.391 9.26 0 6.69-.058 12.074-.058 13.721 0 1.33.9 2.89 3.435 2.399C85.692 91.819 100 73.085 100 51c0-27.614-22.386-50-50-50"
      />
      <path
        fill="#161614"
        d="M18.727 72.227c-.11.248-.502.322-.857.152-.363-.163-.567-.502-.45-.751.109-.256.5-.327.862-.156.363.163.57.505.445.755m2.46 2.194c-.24.221-.706.118-1.022-.231-.327-.349-.388-.814-.146-1.04.246-.22.698-.117 1.026.232.327.353.39.816.14 1.04zm1.687 2.808c-.307.213-.808.013-1.118-.432-.306-.444-.306-.977.007-1.191.31-.214.804-.021 1.118.42.305.452.305.985-.008 1.203m2.853 3.252c-.274.302-.858.22-1.285-.192-.437-.403-.56-.975-.284-1.277.277-.303.864-.218 1.295.191.434.403.566.979.274 1.278m3.688 1.098c-.12.391-.683.57-1.25.403-.565-.171-.935-.63-.821-1.026.118-.394.682-.58 1.253-.401.565.17.936.625.818 1.024m4.197.465c.014.413-.466.755-1.06.762-.599.013-1.082-.32-1.088-.726 0-.416.469-.755 1.067-.765.594-.012 1.081.32 1.081.73m4.123-.158c.071.403-.342.816-.932.926-.58.106-1.118-.143-1.192-.541-.072-.413.35-.826.928-.933.592-.103 1.12.14 1.196.548"
      />
    </svg>
  ),
};
