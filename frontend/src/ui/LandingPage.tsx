import React from 'react';

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="flex min-h-screen flex-col items-center justify-start text-center px-4 sm:px-6 lg:px-8 pt-10">
        
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
            
            {/* Animated Corner Dots */}
            <div className="pointer-events-none animate-pulse group-hover/cover:hidden group-hover/cover:opacity-100 group h-2 w-2 rounded-full bg-neutral-600 dark:bg-white opacity-20 group-hover/cover:bg-white absolute -right-[2px] -top-[2px]"></div>
            <div className="pointer-events-none animate-pulse group-hover/cover:hidden group-hover/cover:opacity-100 group h-2 w-2 rounded-full bg-neutral-600 dark:bg-white opacity-20 group-hover/cover:bg-white absolute -bottom-[2px] -right-[2px]"></div>
            <div className="pointer-events-none animate-pulse group-hover/cover:hidden group-hover/cover:opacity-100 group h-2 w-2 rounded-full bg-neutral-600 dark:bg-white opacity-20 group-hover/cover:bg-white absolute -left-[2px] -top-[2px]"></div>
            <div className="pointer-events-none animate-pulse group-hover/cover:hidden group-hover/cover:opacity-100 group h-2 w-2 rounded-full bg-neutral-600 dark:bg-white opacity-20 group-hover/cover:bg-white absolute -bottom-[2px] -left-[2px]"></div>
          </div>
        with Complete Control
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl lg:text-lg text-gray-300 max-w-3xl opacity-80">
         Upload, convert, and share your photos, videos, and audio files with secure links. Set expiration dates, password protection, and track views effortlessly.
        </p>

        {/* CTA Button */}
        <button className="mt-8 px-8 py-4 bg-black/45 text-white font-medium text-lg rounded-lg hover:bg-violet-600 hover:scale-105 transition-all duration-300 z-10 shadow-lg hover:shadow-violet-500/25">
          Start Converting Now
        </button>
      </div>

      {/* Features Section */}
      <div className="text-white p-7 lg:p-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 pt-8 lg:pt-32">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 inline-block text-transparent bg-clip-text">
              Powerful Features
            </h1>
            
            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                <div className="text-violet-400 text-3xl mb-4">⚡</div>
                <h3 className="text-xl font-semibold mb-3">Lightning Fast</h3>
                <p className="text-gray-300">Convert your media files in seconds with our optimized processing engine</p>
              </div>
              
              <div className="p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                <div className="text-violet-400 text-3xl mb-4">🎯</div>
                <h3 className="text-xl font-semibold mb-3">High Quality</h3>
                <p className="text-gray-300">Maintain pristine quality while converting between different formats</p>
              </div>
              
              <div className="p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                <div className="text-violet-400 text-3xl mb-4">🔒</div>
                <h3 className="text-xl font-semibold mb-3">Secure & Private</h3>
                <p className="text-gray-300">Your files are processed securely and deleted after conversion</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;