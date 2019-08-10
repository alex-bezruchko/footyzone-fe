import React from 'react';
import loading from './../../../src/loading.gif';
import blank from './../../img/blank.jpeg';

import { connect } from 'react-redux';
import { searchTerm } from '../../actions/newsActions';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

class SearchResultsList extends React.Component {

    componentDidMount() {
        if (this.props.term) {
            this.props.searchTerm(this.props.term);
        } else {
            this.props.history.push('/search');
        }
    }


    //check if component has diff props
    componentDidUpdate(prevProps, prevState) {
        // only update chart if the data has changed
        if (prevProps.term !== this.props.term) {
            if (this.props.term) {
                this.props.searchTerm(this.props.term);
            } else {
                this.props.history.push('/blog');
            }
        }
    }


    render() {
        let maxLenBody = 250;
        return (
            <div className="container search">
                <div className="col-md-8 search-list">
                    <div className="container">
                        <h1 className="bungee">Results: </h1>

                        {this.props.loading ?
                            <div className="col-md-6 text-center"><img alt='Loading gif' src={loading} /></div>

                            :
                            <div className="post-detail-card">
                                {this.props.news.length > 0 ?
                                    <div>
                                        {this.props.news.map((news, index) => {
                                            return <Link key={index} to={`/news/${news.subcat_slug}/${news.id}`}>
                                                <div className="card-detail">
                                                    <h2>{news.title}</h2>
                                                </div>
                                                {news.newsMainImg ?
                                                    <img src={news.newsMainImg} alt={news.title} />
                                                    :
                                                    <img src={blank} alt="blank" />
                                                }

                                                <div className="post-detail-body">
                                                    {news.body ?
                                                        <div className="body">{news.body.slice(0, maxLenBody).concat('...')}</div>
                                                        :
                                                        <></>
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
            </div>

        )
    }
}

const mapStateToProps = ({ newsReducer: state }) => {
    return {
        news: state.news,
        loading: state.loading,
        term: state.term
    }
}

export default withRouter(connect(
    mapStateToProps,
    { searchTerm }
)(SearchResultsList));