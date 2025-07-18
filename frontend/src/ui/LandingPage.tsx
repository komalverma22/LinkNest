import React from 'react';
import CornerDots from './CornerDots';
import Button from './Button';

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="flex min-h-screen flex-col items-center justify-start text-center pt-10">
        
        {/* Animated Grid Background */}
        <div 
          className="pointer-events-none absolute size-full overflow-hidden [perspective:400px] z-0 grid-pulse grid-visible" 
          style={{
            '--grid-angle': '65deg',
            '--cell-size': '55px',
            '--opacity': '0.5', // lighter grid
            '--light-line': 'rgba(255,255,255,0.2)', // much lighter
            '--dark-line': 'rgba(255,255,255,0.04)' // much lighter
          } as React.CSSProperties}
        >
          <div className="absolute inset-0 [transform:rotateX(var(--grid-angle))]">
            <div className="animate-grid [background-image:linear-gradient(to_right,var(--light-line)_1px,transparent_0),linear-gradient(to_bottom,var(--light-line)_1px,transparent_0)] [background-repeat:repeat] [background-size:var(--cell-size)_var(--cell-size)] [height:300vh] [inset:0%_0px] [margin-left:-200%] [transform-origin:100%_0_0] [width:600vw]"></div>
          </div>
          {/* Foggy/Blurred overlay, higher and greyish */}
       
          {/* Top fade rlay for smooth merge */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--background-color)] via-[rgba(80,80,91,0.52)] to-transparent to-80%"></div>
        </div>

        {/* Main Heading */}
        <h1 className=" text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto relative pt-7 pb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 font-custom">
          Share & Convert  <br/>
          <div className="relative group/cover inline-block m-2 px-2 py-2 transition duration-200 rounded-sm">
            <span className="inline-block relative z-20 transition duration-200 text-blue-300">
              Files
            </span>
            
           <CornerDots/>
          </div>
        with Complete Control
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl lg:text-lg text-gray-300 max-w-3xl opacity-80">
         Upload, convert, and share your photos, videos, and audio files with secure links. Set expiration dates, password protection, and track views effortlessly.
        </p>

        {/* CTA Button */}
        
        {/* 3D Blue Button */}
        <div className='mt-8'>
        <Button name="Explore Now"/>
        </div>
      </div>
     
      </div>
   
  );
};

export default LandingPage;