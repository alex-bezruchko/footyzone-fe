import React from 'react';
import { Input, Form, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { login } from './../../actions/usersActions';
import { withRouter } from 'react-router-dom';

class LoginForm extends React.Component {
   constructor(props) {
        super(props); 
        this.state = {
            username: '',
            password: ''
        }
   }
    
    changeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value,
        })
        
    }
    loginHandler = e => {
        e.preventDefault();
        
        this.props.login(this.state.username, this.state.password, this.props.history);

    }

    render() {
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
                <Input
                    onChange={this.changeHandler}
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={this.state.password}
                />
                <Button type="submit">LogIn</Button>
            </Form>
        )
    }
}
const MapStateToProps = ({ usersReducer: state }) => {
    return {
        username: state.user.username,
        // loginError: state.loginError,
        // loading: state.loading
    }
}
export default withRouter(connect(MapStateToProps, {login})(LoginForm));
