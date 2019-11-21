import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import moment from 'moment';
import $ from "jquery";
import {
    fetchLatestPosts,
} from "../../actions/postsActions";

class WelcomeBloglist extends React.Component {
    componentDidMount() {
        this.props.fetchLatestPosts();
        const blog = document.getElementsByClassName('container-row new-blog')
        const position = $(".container-row.new-blog").position();
        const carousel = $(".container.carousel-container");

        $.when(blog[0] && blog[0].length > 0 && position).then(function () {
            if (blog[0] && blog[0].clientWidth < 500) {
                $(window).scroll(function () {
                    if (($(window).scrollTop() > $(carousel[0]).outerHeight(true) + 80) && ($(window).scrollTop() < $(blog[0]).outerHeight(true) - 80)) {
                        $('.blog-bg').css({ "position": "fixed", "top": "0" });
                    }
                    else {
                        $('.blog-bg').css({ "position": "absolute", "top": "" });
                    }
                });
            }
        }).catch(function (err) {
            console.log(err)
            this.props.history.push(`/${this.props.location.pathname}`)
        })
    }
    render() {
        let maxLenTitle = 50;
        let maxLenBody = 200;

        return (

            <div className="container-row new-blog">
                <img src="https://res.cloudinary.com/htg1iqq1p/image/upload/v1574377567/tdbc8baih5kl6nuy2ccd.jpg" alt="shiny photoshopped stadium" className="blog-bg" />
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
                                    console.log(blog)
                                    if (index !== 0) {
                                        return (
                                            <div
                                                key={index}
                                                id={blog.id}
                                                blog={blog}
                                                className="category-blog col-md-6 col-xs-12"
                                            >
                                                <Link to={`/blog/${blog.id}`}>
                                                    <div className="authors">
                                                        <div className="list-header">
                                                            {/* <img src={blog.postMainImg} alt="" /> */}
                                                            {blog.title.length < 50 && <h2>{blog.title}</h2>}
                                                            {blog.title.length > 50 && <h2>{blog.title.slice(0, maxLenTitle).concat('...')}</h2>}
                                                            <p className="ubuntu">{new Date().toDateString()}</p>
                                                        </div>
                                                        <img
                                                            src={blog.avatar}
                                                            alt="avatar"
                                                            className="avatar"
                                                        />
                                                    </div>

                                                    <div className="body">

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
    };
};

export default withRouter(
    connect(
        mapStateToProps,
        { fetchLatestPosts }
    )(WelcomeBloglist)
);
