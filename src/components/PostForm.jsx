import './PostForm.css';

const PostForm = ({ post, handleChange }) => {
  return (
    <form>
      <div className="form-group">
        <label htmlFor="title">Name:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={post.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="subtitle">Description:</label>
        <input
          type="text"
          id="subtitle"
          name="subtitle"
          value={post.subtitle}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="link">Page Link:</label>
        <input
          type="text"
          id="link"
          name="link"
          value={post.link}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="image">Image URL:</label>
        <input
          type="url"
          id="image"
          name="image"
          value={post.image}
          onChange={handleChange}
        />
      </div>
    </form>
  );
};

export default PostForm;