// Example: frontend/src/App.tsx
import {  Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './page/Home'
import Upload from './components/Uploader'
import SecureUpload from './components/SecureUpload'

function App() {
  return (
   
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path='convert' element={<Home />} />
          <Route path="upload" element={<Upload />} />
          <Route path="secure-upload" element={<SecureUpload />} />
        </Route>
      </Routes>
  
  )
}

export default App