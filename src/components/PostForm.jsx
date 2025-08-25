const PostForm = ({ post, handleChange }) => {

    return (
        <div className="formContainer">
            <form>
                <label htmlFor="title">Name: </label>
                <input type="text" id="title" name="title" value={post.title} onChange={handleChange} required/>
                <br/>

                <label htmlFor="subtitle"> Description: </label>
                <input type="text" id="subtitle" name="subtitle" value={post.subtitle} onChange={handleChange} />
                <br/>

                <label htmlFor="link"> Page Link: </label>
                <input type="text" id="link" name="link" value={post.link} onChange={handleChange} />
                <br/>

                <label htmlFor="image">Image URL: </label>
                <input type="text" id="image" name="image" value={post.image} onChange={handleChange} />
                <br/>
            </form>
        </div>
    )
}

export default PostForm;