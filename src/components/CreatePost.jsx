import { useState } from 'react'
import PostForm from './PostForm.jsx'
import { lockedOutSupabase } from '../client.js'

const CreatePost = () => {

    const createPost = async(event) => {

        event.preventDefault() /* I think I do want it to reload the page if I am on the feed page */

        await lockedOutSupabase

        .from('Posts')
        .insert({title: post.title, subtitle: post.subtitle, image: post.image, link: post.link})
        .select()

        window.location = "/"
    }

    const [post, setPost] = useState({title: "", subtitle: "", image: "", link: ""})

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
            <input type='submit' value="Submit"onClick={createPost} />
        </div>
    )
}

export default CreatePost;