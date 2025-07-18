// Example: frontend/src/App.tsx
import {  Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './page/Home'
import Upload from './components/Uploader'

import ScrollToTop from './ScrollToTop';

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path="upload" element={<Upload />} />
          
        </Route>
      </Routes>
    </>
  )
}

export default App