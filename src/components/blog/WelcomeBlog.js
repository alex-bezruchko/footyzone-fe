import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import moment from 'moment';
import {
    fetchLatestPosts,
    // fetchAllCategories,
} from "../../actions/postsActions";
import { Link } from "react-router-dom";

class WelcomeBloglist extends React.Component {
    componentDidMount() {
        this.props.fetchLatestPosts();
    }
    render() {
        let maxLenTitle = 50;

        return (

            <div className="container-row new-blog">

                <div className="col-md-12">
                    {this.props.posts.length > 0 ? (

                        <>
                            <div className="container header">
                                <div className="container new-blog header">
                                    <h1 className="bungee">Blog</h1>
                                    <Link to={`/blog/${this.props.posts[0].id}`}>
                                        <img alt={this.props.posts[0].title} src={this.props.posts[0].postMainImg} />
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
                                                            De Ligt is yet to clarify his future but appears to
                                                            have his sights set on Juventus after revealing the
                                                            club are interested and a desire to play alongside
                                                            some of their defenders.
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
