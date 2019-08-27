import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import moment from 'moment';
import stadium from "./../../img/small-blog.jpg";
import $ from "jquery";
import {
    fetchLatestPosts,
    // fetchAllCategories,
} from "../../actions/postsActions";
import { Link } from "react-router-dom";

class WelcomeBloglist extends React.Component {
    componentDidMount() {
        this.props.fetchLatestPosts();

        // })
    }
    render() {
        let maxLenTitle = 50;
        let maxLenBody = 200;
        let blog = document.getElementsByClassName('container-row new-blog')
        let old_school = document.getElementsByClassName('container-row welcome-blog')

        // let window_height = $(window).height();
        $.when(blog[0]).then(function () {
            let x = $(".container-row.new-blog").position();
            console.log(x.top)
            console.log(blog[0])
            $.when(x).then(function () {
                if (blog[0].clientWidth < 500) {
                    $(window).scroll(function () {
                        // console.log(`scroll + ${$(window).position()}`)
                        if (($(window).scrollTop() > x.top) && ($(window).scrollTop() < $(blog[0]).outerHeight(true))) {
                            $('.blog-bg').css({ "position": "fixed", "top": "0" });
                        }
                        else {
                            $('.blog-bg').css({ "position": "absolute", "top": "" });
                        }
                    });
                }
            })

        })

        return (

            <div className="container-row new-blog">
                <img src={stadium} alt="shiny photoshopped stadium" className="blog-bg" />
                <div className="col-md-12">
                    {this.props.posts.length > 0 ? (

                        <>
                            <div className="col-md-8 header">
                                <div className="new-blog header">
                                    <h1 className="bungee">Blog</h1>
                                    <Link to={`/blog/${this.props.posts[0].id}`}>
                                        <img className="col-md-8-img" alt={this.props.posts[0].title} src={this.props.posts[0].postMainImg} />
                                        <div className="header-info">
                                            <div className="header-title"><h2>{this.props.posts[0].title}</h2> <p className="published bungee">{moment(this.props.posts[0].published).format("LL")}</p></div>
                                            <p className="sans large">{this.props.posts[0].body.slice(0, 350).concat('...')}</p>
                                            <p className="sans mobile">{this.props.posts[0].body.slice(0, 175).concat('...')}</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div className="container pundits">
                                <div className="container">
                                    <h1 className="bungee">Pundits</h1>
                                </div>

                                {this.props.posts.map((blog, index) => {
                                    if (index !== 0) {
                                        return (
                                            <div
                                                key={index}
                                                id={blog.id}
                                                blog={blog}
                                                className="category-blog col-md-3 col-sm-6 col-xs-12"
                                            >
                                                <Link to={`/blog/${blog.id}`}>
                                                    <img
                                                        src={blog.avatar}
                                                        alt="avatar"
                                                        className="avatar"
                                                    />
                                                    <div className="body">
                                                        <div className="list-header">
                                                            {/* <img src={blog.postMainImg} alt="" /> */}
                                                            {blog.title.length < 50 && <h2>{blog.title}</h2>}
                                                            {blog.title.length > 50 && <h2>{blog.title.slice(0, maxLenTitle).concat('...')}</h2>}
                                                        </div>
                                                        <p>
                                                            {blog.body.slice(0, maxLenBody).concat('...')}
                                                        </p>
                                                    </div>
                                                </Link>
                                            </div>
                                        );
                                    }
                                })}
                            </div>

                        </>
                    ) : (
                            <></>
                        )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ postsReducer: state }) => {
    return {
        posts: state.posts,
        loading: state.loading,
        //   categories: state.categories,
    };
};

export default withRouter(
    connect(
        mapStateToProps,
        { fetchLatestPosts }
    )(WelcomeBloglist)
);
