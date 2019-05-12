import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import loading from './../../../src/loading.gif';
import { Link } from 'react-router-dom';
import { fetchPostsByCategory } from '../../actions/postsActions';

import { Container } from 'reactstrap';
import axios from 'axios';

class Category extends React.Component {

    constructor() {
        super();
        this.state = {
            categories: []
        }
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.fetchPostsByCategory(id);
        axios
        .get('https://footyzone-be.herokuapp.com/api/posts/categories')
        .then(res => {
            this.setState({ categories: res.data})
        })
        .catch(err => {
            console.log(err)
        })
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        const id = this.props.match.params.id;

        if (id !== prevProps.match.params.id) {
          this.props.fetchPostsByCategory(id);
        }
    }
    
    
    render() {
        const category_id = this.props.match.params.id;
        const Categories = this.state.categories;
        const catName = Categories.find(function(cat) {
            return cat.id == category_id;
          });
        return(

            <div className="col-md-8 post-list">

                {this.props.posts.length === null ? 

                    <div>
                        <img alt='Loading gif' src={loading} />
                    </div>

                    :

                    <Container>

                        <h1>{catName? <span> {catName.name}</span> : <span></span> }</h1>
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