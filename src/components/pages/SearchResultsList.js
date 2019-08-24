import React from 'react';
import loading from './../../../src/loading.gif';
import blank from './../../img/blank.jpeg';
import $ from "jquery";
import { connect } from 'react-redux';
import { searchTerm } from '../../actions/newsActions';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import SearchForm from "./../parts/SearchForm";
import PopularNews from "./../../components/news/PopularNews";

class SearchResultsList extends React.Component {

    componentDidMount() {
        if (this.props.term) {
            this.props.searchTerm(this.props.term);
        } else {
            this.props.history.push('/search');
        }

        let client = document.getElementsByTagName("section");
        if (client[0] && client[0].clientWidth > 992) {
            let element = document.getElementsByClassName("popular");
            $.when(element).then(function () {
                let width = element[0].clientWidth;
                $(".popular").css("width", width);
                $(".popular .twitter-fixed").css("width", width);
            });
        } else {
            $(".popular").css("min-width", "100%");
            $(".popular .twitter-fixed").css("min-width", "100%");
        }

        $(window).scroll(function (e) {
            let article = document.getElementsByClassName("search");
            let result = document.getElementsByClassName("post-detail-cord");

            if (article[0]) {
                let height = article[0].clientHeight;

                console.log(height)
                // if (result > 200) {
                if (
                    $(window).scrollTop() > 500 &&
                    $(window).scrollTop() < (height * 8.5) / 10
                ) {
                    if (result[0] && result[0].clientHeight) {
                        if (result[0].clientHeight < 20) {
                            $(".col-md-4 .popular").removeClass("twitter-fixed");
                        } else {
                            $(".col-md-4 .popular").addClass("twitter-fixed");
                        }
                    } else {
                        $(".col-md-4 .popular").addClass("twitter-fixed");
                    }
                    // let resultHeight = result[0].clientHeight;

                    // }
                } else {
                    $(".col-md-4 .popular").removeClass("twitter-fixed");
                }
            }
        });
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
                        <SearchForm />
                    </div>
                    <div className="container">
                        <h1 className="bungee">Results{""}:</h1>

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
                                                    <img className="col-md-8-img" src={news.newsMainImg} alt={news.title} />
                                                    :
                                                    <img className="col-md-8-img" src={blank} alt="blank" />
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
                                    <h2 className="bungee">No results</h2>
                                }

                            </div>
                        }
                    </div>

                </div>
                <div className="col-md-4 col-xs-12">
                    <div className="popular">
                        <PopularNews />
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