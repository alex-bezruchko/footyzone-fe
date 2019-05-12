import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import loading from './../../../src/loading.gif';
import { Link } from 'react-router-dom';
import { fetchPostsByCategory, fetchAllCategories } from '../../actions/postsActions';

import { Container } from 'reactstrap';

class Category extends React.Component {

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.fetchAllCategories()
        this.props.fetchPostsByCategory(id);
        
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        const id = this.props.match.params.id;

        if (id !== prevProps.match.params.id) {
            // this.props.fetchAllCategories()
            this.props.fetchPostsByCategory(id);
        }
    }
    
    
    render() {
        const category_id = this.props.match.params.id;
        const catName = this.props.categories.find(function(cat) {
            return Number(cat.id) === Number(category_id);
          });
        return(

            <div className="col-md-8 post-list">

                {this.props.loading ? 

                    <div>
                        <img alt='Loading gif' src={loading} />
                    </div>

                    :

                    <Container>

                        <h1>{catName? <span> {catName.name}</span> : <span></span> }</h1>
                        {this.props.posts.map((post, index) => {
                            return (
                                <div key={index} id={post.id} post={post} className="category-list">
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
        loading: state.loading,
        categories: state.categories
    };
  };

export default withRouter(connect(
    mapStateToProps,
    {fetchPostsByCategory, fetchAllCategories}
)(Category));