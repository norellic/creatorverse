import './Post.css'
import { Link } from 'react-router-dom';

const Post = (props) => {

    const created_at = props.created_at.slice(0, 10);

    return (
        <div className="whole_post"> {/* shift + alt + a for comments */}
            <Link to={'edit/'+ props.id}> <button className="edit_post">edit post</button> </Link>
            <h1 className="post_title">{props.title}</h1> {/* button to open the post with color change*/}
            <div className="post_footer">
                <p>{created_at}</p>
                <button>{props.likes}</button>
            </div>
        </div>

    );
};

export default Post;