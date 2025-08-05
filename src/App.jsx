import { useState, useEffect } from 'react'
import './App.css'
import { lockedOutSupabase } from './client.js'
import Post from './components/Post.jsx'
import CreatePost from './components/CreatePost.jsx'

function App() {
  
  const [posts, setPosts] = useState([])

  //fetch data
  useEffect(() => {

    const fetchPosts = async () => {
      const {data} = await lockedOutSupabase
      .from ('Posts')
      .select()
      .order('created_at', { ascending: true })

      setPosts(data)
      console.log(data)
    }

    fetchPosts()
  }, [])

  //routes

  return (
    <>
      <div className="navbar">
        <h3 className="navbar_text">Home</h3>
      </div>

      <div className="whole_page">
        <div className="post_feed">

          < CreatePost />
          {
            posts && posts.length > 0 ?
            [...posts]
            .sort((a, b) => a.id - b.id)
            .map((post, index) =>
              < Post
                key={post.id}
                id={post.id}
                title={post.title}
                created_at={post.created_at}
                likes={post.likes}
              />) : <h2>'thats rough buddy'</h2>
          }
        </div>
      </div>
    </>
  )
}

export default App
