import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import { Container } from 'reactstrap';
import Post from './components/posts/Post';
import Category from './components/posts/Category';
import RelatedPosts from './components/posts/RelatedPosts';
import BlogPage from './components/pages/BlogPage';
import SearchResultsList from './components/pages/SearchResultsList';
import Welcome from './components/pages/Welcome';
import Contact from './components/pages/Contact';
import Users from './components/users/Users';

import './App.scss';

class App extends React.Component {
  
  render() {
    return (
      <div className="App">
        <section>

            <Container className="content">

              <Route exact path="/" component={Welcome} />
              <Route exact path="/category/:id" component={Category} />
              <Route exact path="/search" render={props =>
                  <SearchResultsList {...props}  />
                }
              />
              <Route exact path="/blog" component={BlogPage} />
              <Route exact path="/blog" component={RelatedPosts} />
              <Route exact path="/post/:id" component={Post} />
              <Route exact path="/contact" component={Contact} />
              <Route exact path="/users" component={Users}/>
              <Route exact path="/category/:id" component={RelatedPosts} />
            </Container>
            
        </section>
      </div>
    );
  }
}

export default withRouter(App);
