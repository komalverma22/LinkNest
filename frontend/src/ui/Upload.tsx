import React from 'react'

const Upload = () => {
  return (
     <div className="text-white p-7 lg:p-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 pt-8 lg:pt-32">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 inline-block text-transparent bg-clip-text">
              Create. Connect. Share.
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
  )
}

export default Upload
