import React from 'react'

const CornerDots = () => {
  return (
    <div>
       {/* Animated Corner Dots */}
            <div className="pointer-events-none animate-pulse group-hover/cover:hidden group-hover/cover:opacity-100 group h-2 w-2 rounded-full bg-neutral-600 dark:bg-white opacity-20 group-hover/cover:bg-white absolute -right-[2px] -top-[2px]"></div>
            <div className="pointer-events-none animate-pulse group-hover/cover:hidden group-hover/cover:opacity-100 group h-2 w-2 rounded-full bg-neutral-600 dark:bg-white opacity-20 group-hover/cover:bg-white absolute -bottom-[2px] -right-[2px]"></div>
            <div className="pointer-events-none animate-pulse group-hover/cover:hidden group-hover/cover:opacity-100 group h-2 w-2 rounded-full bg-neutral-600 dark:bg-white opacity-20 group-hover/cover:bg-white absolute -left-[2px] -top-[2px]"></div>
            <div className="pointer-events-none animate-pulse group-hover/cover:hidden group-hover/cover:opacity-100 group h-2 w-2 rounded-full bg-neutral-600 dark:bg-white opacity-20 group-hover/cover:bg-white absolute -bottom-[2px] -left-[2px]"></div>
    </div>
  )
}

export default CornerDots;
