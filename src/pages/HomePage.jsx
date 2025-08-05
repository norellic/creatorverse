import { lockedOutSupabase } from '../client.js'
import Post from '../components/Post.jsx'
import CreatePost from '../components/CreatePost.jsx'
import { useState, useEffect } from 'react'

const HomePage = () => {

    const [posts, setPosts] = useState([])

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


    /* search bar */
    return (
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
    )
}

export default HomePage;