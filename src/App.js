import React from "react";
import { Route, withRouter, Switch } from "react-router-dom";
import SingleNews from "./components/news/SingleNews";
import SingleBlog from "./components/blog/SingleBlog";
import Newslist from "./components/news/Newslist";
import NewsCategories from "./components/news/NewsCategories";
import Bloglist from "./components/blog/Bloglist";
import OldSchoolList from "./components/oldschool/OldSchoolList";


import SearchResultsList from "./components/pages/SearchResultsList";
import Welcome from "./components/pages/Welcome";
import Contact from "./components/pages/Contact";
import Users from "./components/users/Users";
import UsersPosts from "./components/users/UsersPosts";
import PostCrud from "./components/pages/PostCrud";
import NewsCrud from "./components/news/NewsCrud";
import EmptyPage from "./components/authenticate/EmptyPage";
import "./App.scss";

class App extends React.Component {
  componentDidMount() {
    // window.scrollTo(0, 0);
  }
  componentDidUpdate() {
    // window.scrollTo(0, 0);
  }
  render() {
    return (
      <div className="App">
        <section>
          <div className="content-row">
            <Switch>
              <Route exact path="/" component={Welcome} />
              <Route exact path="/news/:page_id" component={Newslist} />
              <Route exact path="/news/:subcat_name/:id" component={SingleNews} />
              <Route exact path="/old-school/:subcat_name/:id" component={SingleNews} />
              <Route exact path="/blog/page/:page_id" component={Bloglist} />
              <Route
                exact
                path="/leagues/:subcat_name/page/:page_id"
                component={NewsCategories}
              />
              <Route
                exact
                path="/old-school/"
                component={OldSchoolList}
              />
              <Route exact path="/blog/:id" component={SingleBlog} />
              <Route exact path="/:username/create-post" component={PostCrud} />
              <Route exact path="/:username/create-news" component={NewsCrud} />
              <Route exact path="/users/:id/posts" component={UsersPosts} />
              <Route exact path="/contact" component={Contact} />
              <Route exact path="/users" component={Users} />

              <Route
                exact
                path="/search"
                render={props => <SearchResultsList {...props} />}
              />

              <Route path="/" component={EmptyPage} />
            </Switch>

          </div>
        </section>
      </div>
    );
  }
}

export default withRouter(App);
