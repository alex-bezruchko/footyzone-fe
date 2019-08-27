import React from "react";
import {
    FacebookShareButton,
    FacebookIcon,
    TwitterShareButton,
    TwitterIcon,
    WhatsappShareButton,
    WhatsappIcon,
    RedditShareButton,
    RedditIcon,
    PinterestShareButton,
    PinterestIcon,
} from "react-share";

import { FaPrint, FaCalendar } from "react-icons/fa";

const BlogSocials = ({ props }) => {


    return (

        <div className="single-share">
            <div className="socials">
                {props.postsReducer.post.title &&
                    props.postsReducer.post.title.length > 0 ? (
                        <>
                            <FacebookShareButton
                                url={window.location.href}
                                media={props.postsReducer.post.title}
                                className="button"
                            >
                                <FacebookIcon size={32} round={false} />
                            </FacebookShareButton>
                            <TwitterShareButton
                                url={window.location.href}
                                media={props.postsReducer.post.title}
                                className="button"
                            >
                                <TwitterIcon size={32} round={false} />
                            </TwitterShareButton>
                            <PinterestShareButton
                                url={window.location.href}
                                media={props.postsReducer.post.title}
                                className="button"
                            >
                                <PinterestIcon size={32} round={false} />
                            </PinterestShareButton>
                            <WhatsappShareButton
                                url={window.location.href}
                                media={props.postsReducer.post.title}
                                className="button"
                            >
                                <WhatsappIcon size={32} round={false} />
                            </WhatsappShareButton>
                            <RedditShareButton
                                url={window.location.href}
                                media={props.postsReducer.post.title}
                                className="button"
                            >
                                <RedditIcon size={32} round={false} />
                            </RedditShareButton>
                        </>
                    ) : (
                        <></>
                    )}
            </div>
            <div className="author">
                <FaPrint /> by<span> {props.postsReducer.post.username}</span>
                <br></br>
                <FaCalendar /> {" "}
                {new Date(
                    props.postsReducer.post.published
                ).toDateString()}
            </div>
        </div>


    );
};

export default BlogSocials;
