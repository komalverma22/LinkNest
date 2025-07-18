// import React from 'react'
import { Link, Outlet } from "react-router-dom";

const Layout = () => (
  <div className="min-h-screen">
    <header className="fixed top-0 left-0 w-full flex justify-center pt-4 px-4 z-50">
      {/* <nav className="backdrop-blur-md border border-white/20 rounded-4xl shadow-lg max-w-4xl w-full flex items-center justify-between px-8 py-1.5"> */}
      <nav className="backdrop-blur-sm bg-white/3 border border-white/10  rounded-lg shadow-lg max-w-4xl w-full flex items-center justify-between px-3 py-1.5">
        {/* Logo/Brand */}
        <div className="text-xl font-bold text-white tracking-wide">
          LINKNEST
        </div>

        {/* Navigation Links */}
        <div className="flex gap-8 text-white hover:text-white transition-colors font-sm opacity-80 hover:opacity-100">
          <Link
            to="/home"
          
          >
            Home
          </Link>
          <Link
            to="/upload"
            
          >
            Upload
          </Link>
          <Link
            to="/features"
          
          >
            Features
          </Link>
        </div>

        {/* Get Started Button */}
        <Link to="/get-started">
          <button className="px-3 py-1.25 border border-white/15 text-white opacity-90 rounded-md shadow-md hover:border-white/40 hover:opacity-100 transition-all">
            Get Started
          </button>
        </Link>
      </nav>
    </header>

    {/* Thin white line */}

    <main className="max-w-7xl mx-auto px-6 py-8 pt-28">
      <Outlet />
    </main>
  </div>
);

export default Layout;
