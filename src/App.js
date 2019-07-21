import React from "react";
import { Route, withRouter } from "react-router-dom";
import { Container } from "reactstrap";
import SingleNews from "./components/news/SingleNews";
import SingleBlog from "./components/blog/SingleBlog";
import Newslist from "./components/news/Newslist";
import NewsCategories from "./components/news/NewsCategories";
// import RelatedPosts from "./components/posts/RelatedPosts";
import Bloglist from "./components/blog/Bloglist";
import WelcomeBloglist from "./components/blog/WelcomeBloglist";
// import SearchResultsList from "./components/pages/SearchResultsList";
import Welcome from "./components/pages/Welcome";
import Contact from "./components/pages/Contact";
import Users from "./components/users/Users";
import UsersPosts from "./components/users/UsersPosts";
import PostCrud from "./components/pages/PostCrud";

import "./App.scss";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <section>
          <div className="content-row">
            <Route exact path="/" component={Welcome} />
            <Route exact path="/" component={WelcomeBloglist} />
            <Route exact path="/news/" component={Newslist} />
            <Route exact path="/blog/" component={Bloglist} />
            <Route exact path="/news/:subcat_name" component={NewsCategories} />
            <Route exact path="/news/:subcat_name/:id" component={SingleNews} />
            {/* <Route path="/news/:subcat_name" component={RelatedPosts} /> */}
            <Route exact path="/blog/:id" component={SingleBlog} />

            <Route exact path="/posts/add" component={PostCrud} />
            <Route exact path="/users/:id/posts" component={UsersPosts} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/users" component={Users} />

            {/* <Route exact path="/videos" component={RelatedPosts} />
            <Route
              exact
              path="/:category_name/:subcat_name/"
              component={RelatedPosts}
            />
            <Route
              exact
              path="/search"
              render={props => <SearchResultsList {...props} />}
            /> */}
          </div>
        </section>
      </div>
    );
  }
}

export default withRouter(App);
