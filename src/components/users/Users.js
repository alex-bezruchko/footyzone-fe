import React from 'react';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import axios from 'axios';

class Users extends React.Component {
    
    state = {
        users: [],
        isAuthorized: false
    }
    componentDidMount() {

        const headers = { authorization: localStorage.getItem('jwt') };
        const endpoint = 'https://footyblog.herokuapp.com/api/users/';
        axios
            .get(endpoint, { headers })
            .then(res => {
                // console.log(res)
                this.setState({ users: res.data, isAuthorized: true })
            })
            .catch(e => {
                console.log(e);
            })
    }
    render() {
        return (
            <Container>
                Users
                    {this.state.isAuthorized ?
                    <ListGroup>
                        {this.state.users.map(u => {
                            console.log(u);
                            return  <ListGroupItem department={u.department} key={u.id}>Username: <b>{u.username}</b> Department: <b>{u.department}</b> </ListGroupItem>
                        })}
                    </ListGroup>
                    :
                    <Container> <h1>You'are not authorized to view this info</h1></Container>  
                }
                    
                
            </Container>
        )       
    }
}
export default Users;