import { useState, useEffect } from 'react'
import './App.css'
import { lockedOutSupabase } from './client.js'
import Post from './components/Post.jsx'
import CreatePost from './components/CreatePost.jsx'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'

function App() {

  return (
    <>
      <div className="navbar">
        <h3 className="navbar_text">Home</h3>
      </div>

      <div className="whole_page">
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* <Route path="/edit/:id" element={<EditPost />} /> */}
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
