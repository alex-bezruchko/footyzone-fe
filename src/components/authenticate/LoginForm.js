import React from 'react';
import { Input, Form, Button, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { login } from './../../actions/usersActions';
import { withRouter } from 'react-router-dom';

class LoginForm extends React.Component {
   constructor(props) {
        super(props); 
        this.state = {
            username: '',
            password: '',
            usernameError: false,
            passwordError: false
        }

   }
    
    changeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value,
        })
        
    }
    loginHandler = e => {
        e.preventDefault();
        if (this.state.username.length === 0 && this.state.password.length === 0) {
            this.setState({usernameError: true, passwordError: true})
        } else if (this.state.username.length !== 0 && this.state.password.length === 0) {
            this.setState({usernameError: false, passwordError: true})
        } else if (this.state.username.length === 0 && this.state.password.length !== 0) {
            this.setState({usernameError: true, passwordError: false})
        } else {
            this.setState({usernameError: false, passwordError: false})
            this.props.login(this.state.username, this.state.password, this.props.history);
        }
        console.log(this.state)
    }

    render() {
        console.log(this.props)

        return(
            <Form className="form login-form" onSubmit={this.loginHandler}>
                <h1>Login</h1>
                <Input
                    onChange={this.changeHandler}
                    placeholder="Username"
                    name="username"
                    type="text"
                    value={this.state.username}
                />
                { this.state.usernameError ? <Alert color="danger">Username is required.</Alert> : null }
                {/* <Alert color="danger">{this.state.loginError}</Alert> */}
                <Input
                    onChange={this.changeHandler}
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={this.state.password}
                />

                { this.state.passwordError ? <Alert color="danger">Password is required.</Alert> : null }
                { this.props.loginError === true ? <Alert color="danger">These credentials do not match our records.</Alert> : null }

                <Button type="submit">LogIn</Button>
            </Form>
        )
    }
}
const MapStateToProps = ({ usersReducer: state }) => {
    return {
        username: state.user.username,
        loginError: state.loginError,
        // loading: state.loading
    }
}
export default withRouter(connect(MapStateToProps, {login})(LoginForm));
