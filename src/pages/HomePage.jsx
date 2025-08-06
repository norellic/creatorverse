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
        .order('created_at', { ascending: true })

        setPosts(data)
        }

        fetchPosts()
    }, [])

    return (
        <div className="post_feed">

          < CreatePost />
          <PostFeed posts={posts} />

        </div>
    )
}

export default HomePage;