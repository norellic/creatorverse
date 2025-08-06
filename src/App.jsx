import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Link } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx'
import EditPost from './pages/EditPost.jsx'
import PostDetail from './pages/PostDetail.jsx';

import { useState, useEffect } from 'react';
import { lockedOutSupabase } from './client.js';
import SearchResults from './pages/SearchResults.jsx';

function App() {

  const [search, setSearch] = useState("");
  const [matchingPosts, setMatchingPosts] = useState([])

  useEffect(() => {
    const fetchMatchingPosts = async () => {

      const {data} =await lockedOutSupabase
      .from('Posts')
      .select()
      .ilike('title', `%${search}%`)

      search.length > 0 ? setMatchingPosts(data) : setMatchingPosts([])
      console.log(data)
    }
    fetchMatchingPosts();

  }, [search])

  return (
    <>
    <Router>
      <div className="navbar">

        <div className="searchbar">
          <input type="text" name="searchbar" placeholder="search" id="searchbar" value={search} onChange={(event) => setSearch(event.target.value)}/>
          <Link to={`/search-results/${search}`}><input type="submit" value="search" id="search_button"/></Link>
         
          <div className="search_results">
            { 
              matchingPosts && matchingPosts.length > 0 ? (
                matchingPosts.map((result, index) => (
                <div key={index} className="result">
                    <Link to={`/detail/${result.id}`}  onClick={() =>setSearch("")}>{result.title}</Link>
                </div>
              ))
              ) : ( 
              <p></p>
              )
            }

          </div>
        </div>
        <Link to="/"><button className="navbar_text">Home</button></Link>
      </div>

      <div className="whole_page">
        
          <Routes>
            <Route path="/" element={<HomePage />} /> 
            <Route path="/search-results/:search" element={<SearchResults />} />
            <Route path="/edit/:id" element={<EditPost />} />
            <Route path="/detail/:id" element={<PostDetail />} />
          </Routes>
      </div>
      </Router>
    </>
  )
}

export default App
