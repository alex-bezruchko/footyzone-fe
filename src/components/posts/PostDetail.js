import React from 'react';
import { connect } from 'react-redux';
import blank from './../../img/blank.jpeg';
import { deletePost, editForm } from '../../actions/postsActions';
import { Link } from 'react-router-dom';

const PostDetail = props => {
    return (
        <div className="post-detail-card">
            <Link to={`/post/${props.post.id}`}>
                <div className="card-detail">
                    <h2>{props.post.title}</h2>
                </div>
                {props.post.postMainImg ? 
                    <img src={props.post.postMainImg} alt={props.post.title}/>
                    :
                    <img src={blank} alt="blank" />
                }
                <div className="body">
                    {props.post.body? 
                        <div className="body">{props.post.body}</div>
                        :
                        <div className="body">Tottenham 'consider selling TWELVE players this summer' with Trippier, Eriksen and Alderweireld among. Tottenham 'consider selling TWELVE players this summer' with Trippier, Eriksen and Alderweireld among. Tottenham 'consider selling TWELVE players this summer' with Trippier, Eriksen and Alderweireld among</div>
                    }
                </div>
            </Link>
            
        </div>
            
    )
}


export default connect(null, {deletePost, editForm} )(PostDetail);