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
  Button,
} from "reactstrap";
import $ from "jquery";
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

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      categories: [],
      subcategories: [],
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
  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
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
          <Nav>
            <ListGroup>
              <ListGroupItem>
                <NavLink exact to={"/"}>
                  Home
                </NavLink>
              </ListGroupItem>

              <ListGroupItem>
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                  <DropdownToggle caret>News</DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem>
                      <Link to={"/news"}>All News</Link>
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

                    {/* {this.state.subcategories.filter((cat, index) => {
                      if (cat === )
                      return (
                        <DropdownItem key={index}>
                          <NavLink to={`/news/${cat.subcat_slug}/`}>
                            {cat.subcat_name}
                          </NavLink>
                        </DropdownItem>
                      );
                    })} */}
                  </DropdownMenu>
                </Dropdown>
              </ListGroupItem>

              <ListGroupItem>
                <NavLink to={"/blog"}> Blog</NavLink>
              </ListGroupItem>

              <ListGroupItem>
                <NavLink to={"/contact"}> Contact</NavLink>
              </ListGroupItem>
            </ListGroup>
          </Nav>

          <SearchForm />
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
