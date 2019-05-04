import React from 'react';
import { Nav, ListGroup, ListGroupItem, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, Container, Button } from 'reactstrap';
import { NavLink, Link } from 'react-router-dom';
import logo from './../../img/logo.png';
import { loginStatus } from './../../actions/usersActions';
import { FaUserAlt, FaSignOutAlt, FaSignInAlt  } from 'react-icons/fa';
import SearchForm from './SearchForm';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';


class Header extends React.Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          dropdownOpen: false,
        }
    }
    
    componentDidMount() {
        const username = localStorage.getItem('username')
        const token = localStorage.getItem('jwt');
        this.props.loginStatus(username, token, this.props.history)
    }
    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }
    logOutUser = e => {
        e.preventDefault();
        localStorage.setItem('jwt', '');
        localStorage.setItem('username', '');
        const username = localStorage.getItem('username')
        const token = localStorage.getItem('jwt');
        this.props.loginStatus(username, token, this.props.history)
    }
    render() {
        return(
            <div className="navbar-wrapper">
                <div className="top-navbar">
                    <Container>
                        <Link to={'/'}>
                            <img src={logo} alt="logo"/>
                            <span className="fanzone">Fanzone</span>
                        </Link>
                        {this.props.isLoggedIn ?
                            <div className="nav-account">
                                <FaUserAlt/> <span>Hi, {this.props.user.username} </span>
                                <Button color="black" onClick={this.logOutUser}>
                                    <FaSignOutAlt/>
                                </Button>
                            </div>
                            :
                            <div className="login">
                                <NavLink to={'/login'}><span>Log in </span><FaSignInAlt /></NavLink>
                            </div>
                        }
                        
                    </Container>
                </div>

                <Container className="bottom-navbar">
                    <Nav>
                    
                        <ListGroup>
                            <ListGroupItem >
                                <NavLink exact to={'/'} >Home</NavLink>

                            </ListGroupItem>

                            <ListGroupItem>

                                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                    <DropdownToggle caret>
                                    News
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem>
                                            <NavLink to={'/category/1'}>EPL</NavLink>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <NavLink to={'/category/2'} >UEFA CL</NavLink>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <NavLink to={'/category/3'} >LA LIGA</NavLink>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </ListGroupItem>
                            
                            <ListGroupItem>
                                <NavLink to={'/blog'}> Blog</NavLink>
                            </ListGroupItem>

                            <ListGroupItem>
                                <NavLink to={'/contact'}> Contact</NavLink>
                            </ListGroupItem>
                                
                        </ListGroup>
                    
                    </Nav>

                    <SearchForm/>
                    
                </Container>
            </div>
        )
    }
}
const MapStateToProps = ({ usersReducer: state }) => {
    return {
        user: {
            username: state.user.username,
            token: state.user.token
        },
        isLoggedIn: state.isLoggedIn
    }
}
export default withRouter(connect(MapStateToProps, { loginStatus })(Header));