import { useParams } from 'react-router-dom';
import { lockedOutSupabase } from '../client';
import { useEffect, useState } from 'react';
import './PostDetail.css';

const PostDetail = () => {
  const [post, setPost] = useState({ title: '', subtitle: '', image: '', link: '' });
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState(0);
  const { id } = useParams();
  const [createdAt, setCreatedAt] = useState('');

  const fetchComments = async () => {
    const { data } = await lockedOutSupabase
      .from('Comments')
      .select()
      .eq('postId', id)
      .order('created_at', { ascending: true });

    setComments(data);
  };

  useEffect(() => {
    const fetchPostData = async () => {
      const { data } = await lockedOutSupabase
        .from('Posts')
        .select()
        .eq('id', id);

      if (data && data.length > 0) {
        const postData = data[0];
        setPost(postData);
        setLikes(postData.likes);
        setCreatedAt(postData.created_at.slice(0, 10));
      }
    };
    fetchPostData();
    fetchComments();
  }, [id]);

  const submitComment = async (event) => {
    event.preventDefault();

    await lockedOutSupabase
      .from('Comments')
      .insert({ postId: id, text: comment })
      .select();

    setComment('');
    fetchComments();
  };

  const handleChange = (event) => {
    setComment(event.target.value);
  };

  const addLike = async () => {
    const newLikes = likes + 1;
    setLikes(newLikes);

    await lockedOutSupabase
      .from('Posts')
      .update({ likes: newLikes })
      .eq('id', id)
      .select();
  };

  return (
    <div className="container">
      <article className="post-detail">
        <h1>{post.title}</h1>
        <p className="subtitle">{post.subtitle}</p>
        <a href={post.link} className="link" target="_blank" rel="noopener noreferrer">
          {post.link}
        </a>
        <p className="created-at">Posted on: {createdAt}</p>
        <button className="secondary" onClick={addLike}>
          Likes: {likes}
        </button>
        {post.image.length > 0 && <img src={post.image} alt={post.title} className="post-image" />}
      </article>

      <form className="comment-form">
        <div className="form-group">
          <label htmlFor="comment">Write your thoughts:</label>
          <input
            type="text"
            id="comment"
            name="comment"
            value={comment}
            onChange={handleChange}
            className="contrast"
          />
        </div>
        <button type="submit" onClick={submitComment}>
          Submit
        </button>
      </form>

      <section className="comment-section">
        <h3>Comments</h3>
        {comments && comments.length > 0 ? (
          comments.map((c, index) => (
            <article key={index} className="comment">
              {c.text}
            </article>
          ))
        ) : (
          <p>No comments yet</p>
        )}
      </section>
    </div>
  );
};

export default PostDetail;