import { useParams } from 'react-router-dom'
import { lockedOutSupabase } from '../client'
import { useEffect, useState } from 'react'


const PostDetail = () => {

    const [post, setPost] = useState({title: "", subtitle: "", image: ""})
    const {id} = useParams()

    useEffect(() => {
        const fetchPostData = async(event) => {

            const {data} = await lockedOutSupabase
            .from('Posts')
            .select()
            .eq('id', id)

            if (data && data.length > 0) {
                setPost(data[0])
            }
        }
        fetchPostData()
    }, [])

    return (
        <div>
            {post.title}
            {post.subtitle}
            
            {/* COMMENTS */}

        </div>
    )
}

export default PostDetail;