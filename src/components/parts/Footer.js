import React from "react";
import { Link } from "react-router-dom";
import { Nav, ListGroup, ListGroupItem, Container } from "reactstrap";

class Footer extends React.Component {
  render() {
    return (
      <footer>
        <Container className="">
          <hr className="footer-hr" />

          <Nav>
            <ListGroup>
              <Link to={"/"}>Home</Link>
              <Link to={"/news"}>Latest News</Link>
              <Link to={"/news/epl"}>Premier League</Link>
              <Link to={"/news/laliga"}>La Liga</Link>
              <Link to={"/news/uefacl"}>Champions League</Link>
            </ListGroup>

            <ListGroup>
              <Link to={"/blog"}> Blog</Link>
              <Link to={"/old-school"}>Old School</Link>
              <Link to={"/old-school/players"}>Players</Link>
              <Link to={"/old-school/teams"}>Teams</Link>
              <Link to={"/old-school/coaches"}>Coaches</Link>
            </ListGroup>
            <ListGroup>
              <Link to={"/videos"}> Videos</Link>
              <Link to={"/videos"}>Latest</Link>
              <Link to={"/videos/highlights"}>Highlights</Link>
              <Link to={"/videos/goals"}>Goals</Link>
              <Link to={"/videos/interviews"}>Interviews</Link>
            </ListGroup>

            <ListGroup>
              <Link to={"/contact"}> Contact</Link>
              <Link to={"/contact"}> About</Link>
              <Link to={"/contact"}> Privacy</Link>
              <Link to={"/contact"}> Employment</Link>
            </ListGroup>
          </Nav>
          <hr className="footer-hr" />
          <p>
            <span>Fanzone</span> <span>| </span>Copyright 2019
          </p>
        </Container>
      </footer>
    );
  }
}
export default Footer;
