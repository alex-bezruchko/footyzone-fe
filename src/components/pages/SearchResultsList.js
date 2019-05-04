import React from 'react';
import loading from './../../../src/loading.gif';
import blank from './../../img/blank.jpeg';

import { connect } from 'react-redux';
import { searchTerm } from '../../actions/postsActions';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

class SearchResultsList extends React.Component {

    componentDidMount() {
        if(this.props.term) {
            this.props.searchTerm(this.props.term);
        }else{
            this.props.history.push('/search');
        }
    }


    //check if component has diff props
    componentDidUpdate(prevProps, prevState) {
        // only update chart if the data has changed
        if (prevProps.term !== this.props.term) {
            if(this.props.term) {
                this.props.searchTerm(this.props.term);
            }else{
                this.props.history.push('/blog');
            }
        }
      }

    
    render() {
        return(
            <div className="col-md-8 post-list">
                <div className="container">
                <h1>Search results: </h1>
                
                {this.props.loading ? 
                    <div><img alt='Loading gif' src={loading} /></div>

                    :
                    <div className="post-detail-card">
                    {this.props.posts.length > 0 ? 
                        <div>
                            {this.props.posts.map((post, index) => {
                                return  <Link key={index} to={`/post/${post.id}`}>
                                            <div className="card-detail">
                                                <h2>{post.title}</h2>
                                            </div>
                                            {post.postMainImg ? 
                                                <img src={post.postMainImg} alt={post.title}/>
                                                :
                                                <img src={blank} alt="blank" />
                                            }
                                            
                                            <div className="post-detail-body">
                                                {post.body ? 
                                                    <div className="body">{post.body}</div>
                                                    :
                                                    <div className="body">Tottenham 'consider selling TWELVE players this summer' with Trippier, Eriksen and Alderweireld among. Tottenham 'consider selling TWELVE players this summer' with Trippier, Eriksen and Alderweireld among. Tottenham 'consider selling TWELVE players this summer' with Trippier, Eriksen and Alderweireld among</div>
                                                }
                                            </div>
                                        </Link>
                            })} 
                        </div>
                        :
                        <h2>No results found</h2>
                    }
                    
                    </div>
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
        term: state.term
    }
}

export default withRouter(connect(
    mapStateToProps,
    {searchTerm}
)(SearchResultsList));