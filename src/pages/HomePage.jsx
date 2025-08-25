import { lockedOutSupabase } from '../client.js'
import { useState, useEffect } from 'react'
import CreatePost from '../components/CreatePost.jsx'
import PostFeed from '../components/PostFeed.jsx'

const HomePage = () => {

    const [posts, setPosts] = useState([])

    useEffect(() => {

        const fetchPosts = async () => {
        const {data} = await lockedOutSupabase
        .from ('Posts')
        .select()
        .order('created_at', { ascending: false })

        setPosts(data)
        }

        fetchPosts()
    }, [])

    const sortbyCreatedDate = () => {

        const fetchPosts = async () => {
            const {data} = await lockedOutSupabase
            .from ('Posts')
            .select()
            .order('created_at', { ascending: false })
    
            setPosts(data)
            }
    
            fetchPosts()
    }

    const sortbyLikes = () => {

        const fetchPosts = async () => {
            const {data} = await lockedOutSupabase
            .from ('Posts')
            .select()
            .order('likes', { ascending: false })
    
            setPosts(data)
            }
    
            fetchPosts()
    }

    return (
        <div className="post_feed">
            <h1>Creatorverse</h1>

          < CreatePost />
            <button onClick={sortbyCreatedDate}>Sort by Date</button>
            <button onClick={sortbyLikes}>Sort by Likes</button>
          <PostFeed posts={posts} />

        </div>
    )
}

export default HomePage;