import './Post.css'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { lockedOutSupabase } from '../client';

const Post = (props) => {

    const created_at = props.created_at.slice(0, 10);
    const [likes, setLikes] = useState(props.likes)

    const addLike = async() => {
        const newLikes = likes + 1
        setLikes(newLikes)

        await lockedOutSupabase
        .from('Posts')
        .update({likes: newLikes})
        .eq('id', props.id)
        .select()
    }

    return (
        <div className="whole_post"> {/* shift + alt + a for comments */}
            <Link to={'edit/'+ props.id}> <button className="edit_post">edit post</button> </Link>
            <h1 className="post_title">{props.title}</h1> {/* button to open the post with color change*/}
            <p className="post_subtitle">{props.subtitle}</p>
            {props.image.length > 0 && <img src={props.image} />}
            <p>{props.link}</p>
            <Link to={'detail/'+ props.id}> <button className="edit_post">see more</button> </Link>
            <div className="post_footer">
                <p>{created_at}</p>
                <button onClick={addLike}>{likes}</button>
            </div>
        </div>

    );
};

export default Post;