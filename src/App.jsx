import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Link } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx'
import EditPost from './pages/EditPost.jsx'
import PostDetail from './pages/PostDetail.jsx';

function App() {

  return (
    <>
    <Router>
      <div className="navbar">
        <Link to="/"><button className="navbar_text">Home</button></Link>
      </div>

      <div className="whole_page">
        
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/edit/:id" element={<EditPost />} />
            <Route path="/detail/:id" element={<PostDetail />} />
          </Routes>
      </div>
      </Router>
    </>
  )
}

export default App
