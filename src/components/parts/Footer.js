import React from "react";
import { Link } from "react-router-dom";
import {
  Nav,
  ListGroup,
  ListGroupItem,
  DropdownItem,
  Container,
} from "reactstrap";

class Footer extends React.Component {
  render() {
    return (
      <footer>
        <Container className="">
          <Nav>
            <ListGroup>
              <DropdownItem>
                <Link to={"/"}>Home</Link>
              </DropdownItem>
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
            </ListGroup>

            <ListGroup>
              <DropdownItem>
                <Link to={"/blog"}> Blog</Link>
              </DropdownItem>

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
            </ListGroup>

            <ListGroupItem>
              <Link to={"/contact"}> Contact</Link>
            </ListGroupItem>
          </Nav>
        </Container>
      </footer>
    );
  }
}
export default Footer;
