import { useState } from 'react'
import PostForm from './PostForm.jsx'
import { lockedOutSupabase } from '../client.js'

const CreatePost = () => {
  const [post, setPost] = useState({
    title: "",
    subtitle: "",
    image: "",
    link: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const createPost = async (event) => {
    event.preventDefault();

    await lockedOutSupabase
      .from('Posts')
      .insert({
        title: post.title,
        subtitle: post.subtitle,
        image: post.image,
        link: post.link,
      })
      .select();

    window.location = "/";
  };

  return (
    <main className="container">
      <h2>Create a Post</h2>
      <form onSubmit={createPost}>
        <PostForm post={post} handleChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
};

export default CreatePost;
