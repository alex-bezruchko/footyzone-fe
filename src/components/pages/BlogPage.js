import React from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../../actions/postsActions';
import PostsListView from '../posts/PostsListViews';
import { Container } from 'reactstrap';
import { withRouter } from 'react-router-dom';


class PostsListViews extends React.Component {
  
    
    componentDidMount() {
        this.props.fetchPosts();
    }
    render() {
        return (
            <Container>
                <PostsListView posts={this.props.posts} />
            </Container>
        )
    }
}
const mapStateToProps = ({ postsReducer: state}) => {
    return {
        posts: state.posts,
    }
}

export default withRouter(connect(mapStateToProps, { fetchPosts })(PostsListViews));