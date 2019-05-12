import React from 'react';
import { connect } from 'react-redux';
import PostsList from './PostsList';
import loading from './../../../src/loading.gif'
import { withRouter } from 'react-router-dom';

class PostsListViews extends React.Component {

    render() {
        return(
            <div className="col-md-8 post-list">
                <div className="container">
                    <h1>Blog</h1>
                    
                    {this.props.loading ? 
                        <div><img alt='Loading gif' src={loading} /></div>

                        :
                        <>
                        {this.props.posts.length > 0 ? 
                            <PostsList posts={this.props.posts} />
                            :
                            <div>No posts found</div>
                        }
                        
                        </>
                    }

                </div>
                
            </div>
        )
    }
}

const mapStateToProps = ({ postsReducer: state }) => {
    return {
        posts: state.posts,
        loading: state.loading,
        error: state.error,
        adding: state.adding,
        added: state.added,
        deleting: state.deleting,
        deleted: state.deleted,
        editing: state.editing,
        edited: state.edited,
        editForm: state.editForm,
        addForm: state.addForm,
        post: state.post
    };
  };

export default withRouter(connect(
    mapStateToProps,
    {}
)(PostsListViews));