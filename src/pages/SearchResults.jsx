import PostFeed from '../components/PostFeed.jsx'
import { useParams, useNavigate } from 'react-router-dom'
import { lockedOutSupabase } from '../client.js'
import { useState, useEffect } from 'react'

const SearchResults = () => {

    const [matchingPosts, setMatchingPosts] = useState([])
    const {search} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchMatchingPosts = async () => {
    
          const {data} =await lockedOutSupabase
          .from('Posts')
          .select()
          .ilike('title', `%${search}%`)
    
          search.length > 0 ? setMatchingPosts(data) : setMatchingPosts([])
        }
        fetchMatchingPosts();
    
      }, [search])
    
    return(
        <PostFeed posts={matchingPosts} />
    )

}

export default SearchResults