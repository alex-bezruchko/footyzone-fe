import React from "react";
import { Input, Alert } from "reactstrap";
import { connect } from "react-redux";
import { login } from "./../../actions/usersActions";
import { withRouter, Link } from "react-router-dom";

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
      <div className="login">
        <form className="form login-form" onSubmit={this.loginHandler}>
          <h1>Login</h1>
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

          <button className="btn btn-info" type="submit">
            LogIn
          </button>
        </form>
        <div className="sign-up">
          <h4>
            Don't have an account?
            <Link to={"/signup"}>
              <button className="btn btn-success btn-sm">Sign Up</button>
            </Link>
          </h4>
        </div>
      </div>
    );
  }
}
const MapStateToProps = ({ usersReducer: state }) => {
  return {
    username: state.user.username,
    loginError: state.loginError,
    // loading: state.loading
  };
};
export default withRouter(
  connect(
    MapStateToProps,
    { login }
  )(LoginForm)
);
