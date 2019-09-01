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
  Modal, ModalHeader, ModalBody, ModalFooter, Alert
} from "reactstrap";
import axios from "axios";
import { NavLink, Link, withRouter } from "react-router-dom";
import logo from "./../../img/logo.png";
import $ from "jquery";
import { loginStatus, update } from "./../../actions/usersActions";
import {
  FaSignInAlt,
  FaPlusCircle,
  FaLockOpen,
  FaUserPlus,
} from "react-icons/fa";
import SearchForm from "./SearchForm";
import { connect } from "react-redux";

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false,
      dropdownSchool: false,
      isOpen: false,
      modal: false,
      newAvatar: "",
      uploadStatus: ""
    };

    this.toggleNews = this.toggleNews.bind(this);
    this.toggleOld = this.toggleOld.bind(this);
    this.toggleNav = this.toggleNav.bind(this);
    this.toggleModal = this.toggleModal.bind(this);

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

    $(".navbar-toggler").click(function () {
      if ($(this).css("transform") === 'none') {
        $(this).css("transform", "rotate(180deg)");
      } else {
        $(this).css("transform", "rotate(-180deg)");
      }
    });
  }
  toggleModal() {
    this.setState(prevState => ({
      modal: !prevState.modal,
      uploadStatus: ""
    }));
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
  imageFileHandler = e => {
    e.preventDefault();
    this.setState({
      uploadStatus: ""
    })
    const formData = new FormData();
    let file = e.target.files[0];
    formData.append("file", file);
    formData.append("upload_preset", "sm7zid93");
    formData.append("api_key", "915419188456665");

    let headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Origin": "*",
      Authorization: "M7938KD1Akyo8XBTmf7jF68jiHA",
    };
    axios
      .post(
        "https://api.cloudinary.com/v1_1/htg1iqq1p/upload",
        formData,
        headers
      )
      .then(response => {
        console.log(response)
        this.setState({
          newAvatar: response.data.secure_url,
          uploadStatus: "Uploaded successfully."
        });
        // this.props.loginStatus()

      })
      .catch(err => {
        this.setState({
          newAvatar: "",
          uploadStatus: "Too big file."
        });
      });
  };

  updateHandler = e => {
    this.setState({
      uploadStatus: ""
    })
    e.preventDefault();
    let updatedAvatar = this.state.newAvatar;
    let updateInfo = {
      username: this.props.user.username,
      avatar: updatedAvatar
    }
    this.props.update(updateInfo)
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
    // this.props.loginStatus()
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
      isOpen: !prevState.isOpen,
    }));
  };
  render() {
    return (
      <div id="navigation" className="navbar-wrapper">
        <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Add Avatar</ModalHeader>
          <ModalBody>
            <input
              id="file-upload"
              onChange={this.imageFileHandler}
              type="file"
              name="file"
            />
            {this.state.uploadStatus && this.state.uploadStatus.length > 0 && <Alert>{this.state.uploadStatus}</Alert>}
          </ModalBody>
          <ModalFooter>
            <button className="blue" onClick={this.updateHandler}>Update</button>{' '}
            <button className="white" onClick={this.toggleModal}>Cancel</button>
          </ModalFooter>
        </Modal>
        <div className="top-navbar">
          <Container>
            <Link to={"/"}>
              <span className="fanzone">Fanzone</span>
            </Link>
            {this.props.isLoggedIn ? (
              <div className="nav-account">
                <span className=" hidden-xs">
                  <p>Hi, {this.props.user.username}!</p>
                  <img src={this.props.user.avatar} alt="avatar" onClick={this.toggleModal} />
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
                  <img onClick={this.toggleNav} src={logo} alt="logo" />

                  {/* <img  src={burger} alt="toggle" /> */}
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
                    <Link onClick={this.toggleNav} to={"/old-school"}>
                      {" "}
                      Old School
                    </Link>
                  </ListGroupItem>


                </ListGroup>
                <ListGroup className="visible-xs">
                  {this.props.isLoggedIn ? (
                    <div className="nav-account">
                      <div className="hidden-xs">
                        <p>Hi, {this.props.user.username}!</p>
                        <img src={this.props.user.avatar} alt="avatar" onClick={this.toggleModal} />
                        <Link onClick={this.toggleNav} to={`/${this.props.user.username}/create-post`}>
                          Add a Post
                          <FaPlusCircle />
                        </Link>
                      </div>
                      <Button color="black" onClick={this.logOutUser} >
                        Log Out
                        <FaLockOpen />
                      </Button>
                    </div>
                  ) : (
                      <></>
                    )}
                </ListGroup>
              </Nav>
              <SearchForm isOpen={this.state.isOpen} toggleNav={this.toggleNav} />
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
    { loginStatus, update }
  )(Header)
);
