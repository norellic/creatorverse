import { Link } from 'react-router-dom';
import { useState } from 'react';
import { lockedOutSupabase } from '../client';
import './Post.css';

const Post = (props) => {
  const created_at = props.created_at.slice(0, 10);
  const [likes, setLikes] = useState(props.likes);

  const addLike = async () => {
    const newLikes = likes + 1;
    setLikes(newLikes);

    await lockedOutSupabase
      .from('Posts')
      .update({ likes: newLikes })
      .eq('id', props.id)
      .select();
  };

  return (
    <article className="post-card">
  <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    <h2>{props.title}</h2>
    <Link to={'edit/' + props.id}>
      <button>Edit</button>
    </Link>
  </header>

  {props.subtitle && <p><em>{props.subtitle}</em></p>}

  {props.image.length > 0 && (
    <img className="post-image" src={props.image} alt={props.title} />
  )}

  {props.link && <p>{props.link}</p>}

  <footer style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    <small>{created_at}</small>
    <div>
      <Link to={'detail/' + props.id}>
        <button>See more</button>
      </Link>
      <button onClick={addLike} style={{ marginLeft: "0.5rem" }}>
        ❤️ {likes}
      </button>
    </div>
  </footer>
</article>

  );
};

export default Post;
