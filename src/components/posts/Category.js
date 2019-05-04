import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import loading from './../../../src/loading.gif';
import { Link } from 'react-router-dom';
import { fetchPostsByCategory } from '../../actions/postsActions';

import { Container } from 'reactstrap';

class Category extends React.Component {

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.fetchPostsByCategory(id);
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        const id = this.props.match.params.id;

        if (id !== prevProps.match.params.id) {
          this.props.fetchPostsByCategory(id);
        }
    }
    
    
    render() {
        return(

            <div className="col-md-8 post-list">

                {this.props.posts.length === null ? 

                    <div>
                        <img alt='Loading gif' src={loading} />
                    </div>

                    :

                    <Container>

                        <h1>Category </h1>
                        {this.props.posts.map((post, index) => {
                            return (
                                <div key={index} id={post.id} post={post}>
                                    <Link to={`/post/${post.id}`}>
                                        <h2>
                                            {post.title}
                                        </h2>
                                        <img src={post.postMainImg} alt=""/>
                                        <div className="body">
                                            {post.body}
                                        </div>
                                    </Link>
                                </div>   
                            )  
                        })}
                    </Container>

                }
                
            </div>
            
         )
    }
}
const mapStateToProps = ({ postsReducer: state }) => {
    return {
        posts: state.posts,
        loading: state.loading
    };
  };

export default withRouter(connect(
    mapStateToProps,
    {fetchPostsByCategory}
)(Category));