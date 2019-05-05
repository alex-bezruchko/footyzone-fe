import React from 'react';
import { Input, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { signup } from './../../actions/usersActions';
import { withRouter, Link } from 'react-router-dom';

class SignUp extends React.Component {
   constructor(props) {
        super(props); 
        this.state = {
            username: '',
            password: '',
            passRepeat: '',
            usernameError: false,
            passwordError: false,
            passRepeatError: false,
            notMatchingPassError: false
        }

   }
    componentDidMount() {
        this.setState({
            username: '',
            password: '',
            passRepeat: '',
            usernameError: false,
            passwordError: false,
            passRepeatError: false,
            notMatchingPassError: false
        })
    }
    changeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value,
        })
        
    }

    signupHandler = e => {
        e.preventDefault();
        if (this.state.username.length === 0 && this.state.password.length === 0 && this.state.passRepeat.length === 0) {
            
            this.setState({usernameError: true, passwordError: true, passRepeatError: true})

        } else if (this.state.username.length !== 0 && this.state.password.length === 0 && this.state.passRepeat.length === 0) {
            
            this.setState({usernameError: false, passwordError: true, passRepeatError: true })

        } else if (this.state.username.length === 0 && this.state.password.length !== 0 && this.state.passRepeat.length === 0) {
            
            this.setState({usernameError: true, passwordError: false, passRepeatError: true})

        } else if (this.state.username.length !== 0 && this.state.password.length !== 0 && this.state.passRepeat.length === 0) {
            
            this.setState({usernameError: false, passwordError: false, passRepeatError: true})

        } else if (this.state.username.length === 0 && this.state.password.length === 0 && this.state.passRepeat.length !== 0) {
            
            this.setState({usernameError: true, passwordError: true, passRepeatError: false})

        } else {

            if (this.state.password !== this.state.passRepeat) {
                
                this.setState({usernameError: false, passwordError: false, passRepeatError: false, notMatchingPassError: true})

            } else {
                
                this.setState({usernameError: false, passwordError: false, passRepeatError: false, notMatchingPassError: false})
                this.props.signup(this.state.username, this.state.password, this.props.history);

            }
        }

    }

    render() {

        return(
            <div className="login">
                <form className="form login-form" onSubmit={this.signupHandler}>
                    <h1>Sign Up</h1>
                    <Input
                        onChange={this.changeHandler}
                        placeholder="Username"
                        name="username"
                        type="text"
                        value={this.state.username}
                    />
                    { this.state.usernameError ? <Alert color="danger">Username is required.</Alert> : null }
                    
                    <Input
                        onChange={this.changeHandler}
                        placeholder="Password"
                        name="password"
                        type="password"
                        value={this.state.password}
                    />
                    { this.state.passwordError ? <Alert color="danger">Password is required.</Alert> : null }
                    
                    <Input
                        onChange={this.changeHandler}
                        placeholder="Confirm Password"
                        name="passRepeat"
                        type="password"
                        value={this.state.passRepeat}
                    />
                    { this.state.passRepeatError ? <Alert color="danger">Password repeat is required.</Alert> : null }
                    
                    { this.state.notMatchingPassError === true ? <Alert color="danger">Passwords do not match.</Alert> : null }

                    <button className="btn btn-info" type="submit">Sign Up</button>
                </form>
                <div className="sign-up">
                    <h4>
                        Already have an account? 
                        <Link to={'/login'}>
                            <button className="btn btn-success">Log In</button>
                        </Link>
                    </h4>
                    
                </div>

            </div>
        )
    }
}
const MapStateToProps = ({ usersReducer: state }) => {
    return {
        username: state.user.username,
        password: state.user.password,
        // sign: state.loginError,
        // loading: state.loading
    }
}
export default withRouter(connect(MapStateToProps, {signup})(SignUp));
