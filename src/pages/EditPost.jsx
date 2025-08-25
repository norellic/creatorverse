import PostForm from "../components/PostForm.jsx";
import { useParams} from "react-router-dom";
import { useState, useEffect } from "react";
import { lockedOutSupabase } from "../client.js";

const EditPost = () => {

    const [post, setPost] = useState({title: "", subtitle: "", image: "", link: ""})
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

    const editPost = async(event) => {
        event.preventDefault()

        await lockedOutSupabase
        .from('Posts')
        .update({title: post.title, subtitle: post.subtitle, image: post.image, link: post.link})
        .eq('id', id)

        window.location = "/";
    }

    const deletePost = async(event) => {
        event.preventDefault()

        await lockedOutSupabase
        .from('Posts')
        .delete()
        .eq('id', id)

        window.location = "/";
    }

    const handleChange = (event) => {
        const {name, value} = event.target
        setPost( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    return (
        <div>
            <PostForm post={post} handleChange={handleChange} />
            <button onClick={editPost}>Edit</button>
            <button onClick={deletePost}>Delete</button>
        </div>
    )
}

export default EditPost;