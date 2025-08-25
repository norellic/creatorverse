import { useParams } from 'react-router-dom'
import { lockedOutSupabase } from '../client'
import { useEffect, useState } from 'react'

const PostDetail = () => {

    const [post, setPost] = useState({title: "", subtitle: "", image: "", link: ""})
    const [comment, setComment] = useState("")
    const [comments, setComments] = useState([])
    const [likes, setLikes] = useState(0)
    const {id} = useParams()
    const [createdAt, setCreatedAt] = useState("");

    const fetchComments = async() => {

        const {data} = await lockedOutSupabase
        .from('Comments')
        .select()
        .eq('postId', id)
        .order('created_at', {ascending: true})
        
        setComments(data)
    }

    useEffect(() => {
        const fetchPostData = async() => {

            const {data} = await lockedOutSupabase
            .from('Posts')
            .select()
            .eq('id', id)

            if (data && data.length > 0) {
                const postData = data[0];
                setPost(postData)
                setLikes(postData.likes)
                setCreatedAt(postData.created_at.slice(0, 10));
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

    const addLike = async() => {
        const newLikes = likes + 1
        setLikes(newLikes)

        await lockedOutSupabase
        .from('Posts')
        .update({likes: newLikes})
        .eq('id', id)
        .select()
    }

    return (
        <div>
            <p>{post.title}</p>
            <p>{post.subtitle}</p>
            <p>{post.link}</p>
            <p>{createdAt}</p>
            <button onClick={addLike}>{likes}</button>

            {post.image.length > 0 && <img src={post.image} />}

            
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