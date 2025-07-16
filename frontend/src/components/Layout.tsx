// import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Layout = () => (
  <div >
     <h1 className='text-4xl'>Upload file using cloudinary service in mern stack</h1>
    <nav className='flex py-4 gap-4'>
      <Link to="/convert">Home</Link>
      <Link to="/upload">Upload </Link>
      <Link to="/secure-upload"> Secure Upload</Link>
    </nav>
    {/* for horizonatl line */}
    {/* <hr />  */}
    <Outlet />
  </div>
)

export default Layout