import React from "react";
import { Input, Alert, UncontrolledAlert } from "reactstrap";
import { connect } from "react-redux";
import { login } from "./../../actions/usersActions";
import { withRouter, Link } from "react-router-dom";
import loading from "./../../../src/loading.gif";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      usernameError: false,
      passwordError: false,
    };
  }
  componentDidMount() {
    this.setState({
      usernameError: false,
      passwordError: false,
    });
  }
  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  loginHandler = e => {
    e.preventDefault();
    if (this.state.username.length === 0 && this.state.password.length === 0) {
      this.setState({ usernameError: true, passwordError: true });
    } else if (
      this.state.username.length !== 0 &&
      this.state.password.length === 0
    ) {
      this.setState({ usernameError: false, passwordError: true });
    } else if (
      this.state.username.length === 0 &&
      this.state.password.length !== 0
    ) {
      this.setState({ usernameError: true, passwordError: false });
    } else {
      this.setState({ usernameError: false, passwordError: false });
      this.props.login(
        this.state.username,
        this.state.password,
        this.props.history
      );
    }
  };

  render() {
    return (
      <div className="container login">
        {this.props.loginLoading === true ? (
          // <div className="loading">
          <img
            src={loading}
            className="loading"
            alt="PostForm form is loading gif"
          />
        ) : (
            // </div>
            <form className="form login-form" onSubmit={this.loginHandler}>
              <div className="container">
                {this.props.signupSuccess === true ? (
                  <UncontrolledAlert color="success">
                    User was successfully registered.
                </UncontrolledAlert>
                ) : null}
              </div>
              <h1 className="bungee">Login</h1>
              <Input
                onChange={this.changeHandler}
                placeholder="Username"
                name="username"
                type="text"
                value={this.state.username}
              />
              {this.state.usernameError ? (
                <Alert color="danger">Username is required.</Alert>
              ) : null}

              <Input
                onChange={this.changeHandler}
                placeholder="Password"
                name="password"
                type="password"
                value={this.state.password}
              />
              {this.state.passwordError ? (
                <Alert color="danger">Password is required.</Alert>
              ) : null}

              {this.props.loginError === true ? (
                <Alert color="danger">
                  These credentials do not match our records.
              </Alert>
              ) : null}

              <button className="blue" type="submit">
                LogIn
            </button>
            </form>
          )}
        <div className="sign-up">
          <div className="sign-wrapper">
            <h5>Don't have an account?</h5>
            <Link to={"/signup"}>
              <button className="white">Sign Up</button>
            </Link>
          </div>

        </div>
      </div>
    );
  }
}
const MapStateToProps = ({ usersReducer: state }) => {
  return {
    username: state.user.username,
    loginError: state.loginError,
    loginLoading: state.loginLoading,
    signupSuccess: state.signupSuccess,
  };
};
export default withRouter(
  connect(
    MapStateToProps,
    { login }
  )(LoginForm)
);
