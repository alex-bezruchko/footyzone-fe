import React from "react";
import { Route, withRouter } from "react-router-dom";
import { Container } from "reactstrap";
import SingleView from "./components/posts/SingleView";
import Category from "./components/posts/Category";
import SubCategory from "./components/posts/SubCategory";
import RelatedPosts from "./components/posts/RelatedPosts";
import BlogPage from "./components/pages/BlogPage";
import SearchResultsList from "./components/pages/SearchResultsList";
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
          <Container className="content">
            <Route exact path="/" component={Welcome} />
            <Route exact path="/:cat_name/" component={Category} />
            <Route
              exact
              path="/:cat_name/:subcat_name"
              component={SubCategory}
            />

            {/* <Route exact path="/news" component={RelatedPosts} />
            <Route exact path="/videos" component={RelatedPosts} /> */}

            <Route
              exact
              path="/:category_name/:subcat_name/:id"
              component={SingleView}
            />
            {/* <Route
              exact
              path="/:category_name/:subcat_name/"
              component={RelatedPosts}
            /> */}

            <Route
              exact
              path="/search"
              render={props => <SearchResultsList {...props} />}
            />
            <Route exact path="/posts/add" component={PostCrud} />
            <Route exact path="/users/:id/posts" component={UsersPosts} />
            {/* <Route exact path="/blog" component={BlogPage} /> */}
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/users" component={Users} />
            {/* <Route exact path="/category/:id" component={RelatedPosts} /> */}
          </Container>
        </section>
      </div>
    );
  }
}

export default withRouter(App);
