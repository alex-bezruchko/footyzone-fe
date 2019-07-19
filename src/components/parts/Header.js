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
import { loginStatus } from "./../../actions/usersActions";
import {
  FaUserAlt,
  FaSignOutAlt,
  FaSignInAlt,
  FaPlusCircle,
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
      categories: [],
      subcategories: [],
      isOpen: false,
    };
  }

  componentDidMount() {
    const username = localStorage.getItem("username");
    const token = localStorage.getItem("jwt");
    this.props.loginStatus(username, token, this.props.history);
    axios
      .get("https://footyzone-be.herokuapp.com/api/news/categories")
      .then(res => {
        this.setState({ categories: res.data });
      })
      .catch(err => {
        this.setState({ categories: [] });
      });
    axios
      .get("https://footyzone-be.herokuapp.com/api/news/subcategories")
      .then(res => {
        this.setState({ subcategories: res.data });
      })
      .catch(err => {
        this.setState({ subcategories: [] });
      });

    // $(window).scroll(function(e) {
    //   if ($(window).scrollTop() > 75) {
    //     $("#navigation").addClass("fixed-navbar");
    //     $(".top-navbar").addClass("hidden");
    //   } else {
    //     $("#navigation").removeClass("fixed-navbar");
    //     $(".top-navbar").removeClass("hidden");
    //   }
    // });
  }
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
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  logOutUser = e => {
    e.preventDefault();
    localStorage.setItem("jwt", "");
    localStorage.setItem("username", "");
    const username = localStorage.getItem("username");
    const token = localStorage.getItem("jwt");
    this.props.loginStatus(username, token, this.props.history);
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
                <FaUserAlt />
                <span>
                  Hi, {this.props.user.username}
                  <NavLink to={"/posts/add"}>
                    <FaPlusCircle />
                  </NavLink>
                </span>
                <Button color="black" onClick={this.logOutUser}>
                  <FaSignOutAlt />
                </Button>
                <NavbarToggler onClick={this.toggleNav} />
              </div>
            ) : (
              <div className="login">
                <NavLink to={"/login"}>
                  <span>Log in </span>
                  <FaSignInAlt />
                </NavLink>
              </div>
            )}
          </Container>
        </div>

        <Container className="bottom-navbar">
          <Navbar expand="md">
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav>
                <ListGroup>
                  <ListGroupItem>
                    <NavLink exact to={"/"}>
                      Home
                    </NavLink>
                  </ListGroupItem>

                  <ListGroupItem>
                    <Dropdown
                      isOpen={this.state.dropdownOpen}
                      toggle={this.toggleNews}
                    >
                      <DropdownToggle caret>News</DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem>
                          <Link to={"/news"}>Latest</Link>
                        </DropdownItem>
                        <DropdownItem>
                          <Link to={"/news/epl"}>Premier League</Link>
                        </DropdownItem>
                        <DropdownItem>
                          <Link to={"/news/laliga"}>La Liga</Link>
                        </DropdownItem>
                        <DropdownItem>
                          <Link to={"/news/uefacl"}>Champions League</Link>
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </ListGroupItem>

                  <ListGroupItem>
                    <NavLink to={"/blog"}> Blog</NavLink>
                  </ListGroupItem>

                  <ListGroupItem>
                    <Dropdown
                      isOpen={this.state.dropdownSchool}
                      toggle={this.toggleOld}
                    >
                      <DropdownToggle caret>Old School</DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem>
                          <Link to={"/old-school"}>Latest</Link>
                        </DropdownItem>
                        <DropdownItem>
                          <Link to={"/old-school/players"}>Players</Link>
                        </DropdownItem>
                        <DropdownItem>
                          <Link to={"/old-school/teams"}>Teams</Link>
                        </DropdownItem>
                        <DropdownItem>
                          <Link to={"/old-school/coaches"}>Coaches</Link>
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </ListGroupItem>

                  <ListGroupItem>
                    <NavLink to={"/contact"}> Contact</NavLink>
                  </ListGroupItem>
                </ListGroup>
              </Nav>
              <SearchForm />
            </Collapse>
          </Navbar>
        </Container>
      </div>
    );
  }
}
const MapStateToProps = ({ usersReducer: state }) => {
  return {
    user: {
      username: state.user.username,
      token: state.user.token,
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
