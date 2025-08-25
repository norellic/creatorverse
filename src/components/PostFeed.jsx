import Post from './Post.jsx'

const PostFeed = ( { posts }) => {

    return (
        <div className="post_feed">

          {
            posts && posts.length > 0 ?
            [...posts]
            .map((post, index) =>
              < Post
                key={post.id}
                id={post.id}
                title={post.title}
                link= {post.link}
                subtitle={post.subtitle}
                image={post.image}
                created_at={post.created_at}
                likes={post.likes}
              />) : <h2>'thats rough buddy'</h2>
          }
        </div>
    )
}

export default PostFeed;