import { useParams } from 'react-router-dom'
import { lockedOutSupabase } from '../client'
import { useEffect, useState } from 'react'


const PostDetail = () => {

    const [post, setPost] = useState({title: "", subtitle: "", image: ""})
    const [comment, setComment] = useState("")
    const [comments, setComments] = useState([])
    const {id} = useParams()

    const fetchComments = async(event) => {

        const {data} = await lockedOutSupabase
        .from('Comments')
        .select()
        .eq('postId', id)
        .order('created_at', {ascending: true})
        

        setComments(data)
        console.log(data)
    }

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
        fetchPostData();
        fetchComments();

    }, [id])

    const submitComment = async(event) => {
        event.preventDefault(); // prevents page refresh

        await lockedOutSupabase
        .from('Comments')
        .insert({postId: id, text:comment})
        .select()

        setComment("")
        fetchComments();
    }

    const handleChange = (event) => {
        setComment(event.target.value)
    }

    return (
        <div>
            <p>{post.title}</p>
            {post.subtitle}
            
            {/* COMMENT FORM */}
            <form>
                <label htmlFor="comment">Write your thoughts here:</label>
                <input type="text" id="comment" name="comment" value={comment} onChange={handleChange}/>
                <input type='submit' value="Submit" onClick={submitComment} />
            </form>

            {/* COMMENTS */}
            <div className="comment-section">
            <h3>Comments</h3>
            {
                comments && comments.length > 0 ? (
                comments.map((c, index) => (
                    <div key={index} className="comment">
                    {c.text}
                    </div>
                ))
                ) : (
                <p>No comments yet</p>
                )
            }
</div>

        </div>
    )
}

export default PostDetail;