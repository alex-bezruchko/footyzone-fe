import React from 'react';
import PostDetail from './PostDetail';


const PostsList = props => {

    return(
        <div className="post-list">
        
            {props.posts.map((post, index) => {
                return <PostDetail id={post.id} post={post} key={index} />
            })}
        </div>
    )
}

export default PostsList;
