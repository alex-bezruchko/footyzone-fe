import React from 'react';
import { connect } from 'react-redux';
import { Route ,withRouter } from 'react-router-dom';
import { Container } from 'reactstrap';
import { loginStatus } from './../../actions/usersActions';
import LoginForm from './LoginForm';
import Header from './../parts/Header';
import App from './../../App.js';
import axios from 'axios';

class Authenticate extends React.Component {
    
    componentDidMount() {
      const username = localStorage.getItem('username')
      const token = localStorage.getItem('jwt');
      this.props.loginStatus(username, token, this.props.history)
    }
    

    searchTerm = term => {
        this.setState({ searchStatus: 'Searching...'})
        let newNotes = [];
        axios
          .get('https://fe-notes.herokuapp.com/note/get/all')
          .then(response => {
            
            response.data.map(note => {
    
              if ((note.title.toLowerCase().includes(term.toLowerCase()) || note.textBody.toLowerCase().includes(term.toLowerCase()))) {
                newNotes.push(note)
              }
              return newNotes;
            });
            if (newNotes.length > 0) {
              this.setState({
                notes: newNotes,
                searchStatus: `Here is what we found matching with ' ${term} ': `
              })
            }
            else {
              this.setState({
                notes: [],
                searchStatus: 'Sorry, nothing found.'
              })
            }
            
    
          })
          .catch(err => {
            console.log(err);
            
          })
          this.props.history.push(`/`);
    
    }

    render() {
        return(
            <div>
                <Header {...this.props} {...this.state} />

                <Container>
                    {this.props.isLoggedIn === true ?
                        <div>
                            <Route path="/" render={props =>
                                <App {...props} 
                                // isLoggedIn={this.state.isLoggedIn}
                                logOutUser={this.logOutUser}
                                />
                            }/>
                        </div>
                        :
                        <Route exact path="/login" render={props => 
                            <LoginForm {...this.state} {...props} />
                        }/>
                    }
                </Container>
            </div>
        )
    }
}


const MapStateToProps = ({ usersReducer: state }) => {
  console.log(state)
    return {
        user: {
          username: state.user.username,
          token: state.user.token
        },
        isLoggedIn: state.isLoggedIn,
        loginLoading: state.loginLoading,
        loginError: state.loginError,
    }
}
export default withRouter(connect(MapStateToProps, { loginStatus })(Authenticate));