import React from "react";
import {
  Nav,
  ListGroup,
  ListGroupItem,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Container,
  NavbarToggler,
  Navbar,
  Collapse,
  Button,
} from "reactstrap";
// import $ from "jquery";
import { NavLink, Link, withRouter } from "react-router-dom";
import logo from "./../../img/logo.png";
import burger from "./../../img/burger.png";

import { loginStatus } from "./../../actions/usersActions";
import {
  FaSignInAlt,
  FaPlusCircle,
  FaLockOpen,
  FaUserPlus,
  // FaArticle
} from "react-icons/fa";
import SearchForm from "./SearchForm";
import { connect } from "react-redux";
import axios from "axios";

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggleNews = this.toggleNews.bind(this);
    this.toggleOld = this.toggleOld.bind(this);
    this.toggleNav = this.toggleNav.bind(this);

    this.state = {
      dropdownOpen: false,
      dropdownSchool: false,
      // categories: [],
      // subcategories: [],
      isOpen: false,
    };
  }

  componentDidMount() {
    const username = localStorage.getItem("username");
    const token = localStorage.getItem("jwt");
    const user_id = localStorage.getItem("user_id");
    const avatar = localStorage.getItem("avatar");
    this.props.loginStatus(
      username,
      token,
      user_id,
      avatar,
      this.props.history
    );

    // axios
    //   .get("https://footyzone-be.herokuapp.com/api/news/categories")
    //   .then(res => {
    //     this.setState({ categories: res.data });
    //   })
    //   .catch(err => {
    //     this.setState({ categories: [] });
    //   });
    // axios
    //   .get("https://footyzone-be.herokuapp.com/api/news/subcategories")
    //   .then(res => {
    //     this.setState({ subcategories: res.data });
    //   })
    //   .catch(err => {
    //     this.setState({ subcategories: [] });
    //   });
  }
  // $(".")
  toggleNews() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  }
  toggleOld() {
    this.setState(prevState => ({
      dropdownSchool: !prevState.dropdownSchool,
    }));
  }
  toggleNav() {
    let body = document.getElementsByTagName("body");
    let width = 600;
    if (body[0]) {
      width = body[0].clientWidth;
    }
    if (width < 600) {
      this.setState({
        isOpen: !this.state.isOpen,
      });
    }
  }
  logOutUser = e => {
    e.preventDefault();
    localStorage.setItem("jwt", "");
    localStorage.setItem("username", "");
    localStorage.setItem("avatar", "");
    localStorage.setItem("user_id", "");

    const username = localStorage.getItem("username");
    const token = localStorage.getItem("jwt");
    const avatar = localStorage.getItem("avatar");
    const user_id = localStorage.getItem("user_id");
    this.props.loginStatus(
      username,
      token,
      user_id,
      avatar,
      this.props.history
    );
    this.setState(prevState => ({
      toggleNav: !prevState.toggleNav,
    }));
  };
  render() {
    return (
      <div id="navigation" className="navbar-wrapper">
        <div className="top-navbar">
          <Container>
            <Link to={"/"}>
              <img src={logo} alt="logo" />
              <span className="fanzone">Fanzone</span>
            </Link>
            {this.props.isLoggedIn ? (
              <div className="nav-account">
                <span className=" hidden-xs">
                  <p>Hi, {this.props.user.username}!</p>
                  <img src={this.props.user.avatar} alt="avatar" />
                  <NavLink to={`/${this.props.user.username}/create-post`}>
                    <FaUserPlus />
                  </NavLink>
                </span>
                <Button
                  className=" hidden-xs"
                  color="black"
                  onClick={this.logOutUser}
                >
                  <FaLockOpen />
                </Button>
                {/* <button id="toggler"> */}
                <NavbarToggler
                  aria-controls="basic-navbar-nav"
                  onClick={this.toggleNav}
                >
                  <img onClick={this.toggleNav} src={burger} alt="toggle" />
                </NavbarToggler>
                {/* </button> */}
              </div>
            ) : (
                <div className="login">
                  <NavLink to={"/login"} onClick={this.toggleNav}>
                    <span>Log in </span>
                    <FaSignInAlt />
                  </NavLink>
                </div>
              )}
          </Container>
        </div>

        <div className="bottom-navbar container">
          <Navbar expand="md">
            <Collapse isOpen={this.state.isOpen} navbar>
              {/* Mobile User Info */}
              <Nav>
                <ListGroup>
                  <ListGroupItem>
                    <Link onClick={this.toggleNav} to={"/"}>
                      Home
                    </Link>
                  </ListGroupItem>

                  <ListGroupItem>
                    <Dropdown
                      isOpen={this.state.dropdownOpen}
                      toggle={this.toggleNews}
                    >
                      <DropdownToggle caret>News</DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem>
                          <Link onClick={this.toggleNav} to={"/news/1"}>
                            Latest
                          </Link>
                        </DropdownItem>
                        <DropdownItem>
                          <Link
                            onClick={this.toggleNav}
                            to={"/leagues/epl/page/1"}
                          >
                            Premier League
                          </Link>
                        </DropdownItem>
                        <DropdownItem>
                          <Link
                            onClick={this.toggleNav}
                            to={"/leagues/laliga/page/1"}
                          >
                            La Liga
                          </Link>
                        </DropdownItem>
                        <DropdownItem>
                        <Link
                          onClick={this.toggleNav}
                          to={"/leagues/uefacl/page/1"}
                        >
                          Champions League
                          </Link>
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </ListGroupItem>

                  <ListGroupItem>
                    <Link onClick={this.toggleNav} to={"/blog/page/1"}>
                      {" "}
                      Blog
                    </Link>
                  </ListGroupItem>

                  <ListGroupItem>
                    <Dropdown
                      isOpen={this.state.dropdownSchool}
                      toggle={this.toggleOld}
                    >
                      <DropdownToggle caret>Old School</DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem>
                          <Link onClick={this.toggleNav} to={"/old-school"}>
                            Latest
                          </Link>
                        </DropdownItem>
                        <DropdownItem>
                          <Link
                            onClick={this.toggleNav}
                            to={"/old-school/players"}
                          >
                            Players
                          </Link>
                        </DropdownItem>
                        <DropdownItem>
                          <Link
                            onClick={this.toggleNav}
                            to={"/old-school/teams"}
                          >
                            Teams
                          </Link>
                        </DropdownItem>
                        <DropdownItem>
                          <Link
                            onClick={this.toggleNav}
                            to={"/old-school/coaches"}
                          >
                            Coaches
                          </Link>
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </ListGroupItem>

                  
                </ListGroup>
                <ListGroup className="visible-xs">
                  {this.props.isLoggedIn ? (
                    <div className="nav-account">
                      <div className="hidden-xs">
                        <p>Hi, {this.props.user.username}!</p>
                        <img src={this.props.user.avatar} alt="avatar" />
                        <NavLink onClick={this.toggleNav} to={`/${this.props.user.username}/create-post`}>
                          Add a Post
                          <FaPlusCircle />
                        </NavLink>
                      </div>
                      <Button color="black" onClick={this.toggleNav} onClick={this.logOutUser} >
                        Log Out
                        <FaLockOpen />
                      </Button>
                    </div>
                  ) : (
                      <></>
                    )}
                </ListGroup>
              </Nav>
              <SearchForm />
            </Collapse>
          </Navbar>
        </div>
      </div>
    );
  }
}
const MapStateToProps = ({ usersReducer: state }) => {
  return {
    user: {
      username: state.user.username,
      token: state.user.token,
      avatar: state.user.avatar,
    },
    isLoggedIn: state.isLoggedIn,
  };
};
export default withRouter(
  connect(
    MapStateToProps,
    { loginStatus }
  )(Header)
);
