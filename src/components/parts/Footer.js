import React from "react";
import { Link } from "react-router-dom";
import { Nav, ListGroup, Input, Form, Button, Container } from "reactstrap";
import { FaEnvelope } from "react-icons/fa";

import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  RedditShareButton,
  RedditIcon,
  PinterestShareButton,
  PinterestIcon,
} from "react-share";
class Footer extends React.Component {
  render() {
    return (
      <footer>
        <Container className="">
          <hr className="footer-hr" />

          <Nav>
            <ListGroup>
              <Link to={"/"}>Home</Link>
              <Link to={"/news/1"}>Latest News</Link>
              <Link to={"/news/transfer"}>Transfers</Link>
              <Link to={"/leagues/epl/page/1"}>Premier League</Link>
              <Link to={"/leagues/laliga/page/1"}>La Liga</Link>
              <Link to={"/leagues/uefacl/page/1"}>Champions League</Link>
            </ListGroup>

            <ListGroup>
              <Link to={"/blog/page/1"}> Blog</Link>
              <Link to={"/pundits"}> Pundits</Link>
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
            <ListGroup>
              <div className="footer-socials">
                <FacebookShareButton
                  url={"https://footyzone-be.herokuapp.com/"}
                  media={"Footy Zone"}
                  className="button"
                >
                  <FacebookIcon size={32} round={false} />
                </FacebookShareButton>
                <TwitterShareButton
                  url={"https://footyzone-be.herokuapp.com/"}
                  media={"Footy Zone"}
                  className="button"
                >
                  <TwitterIcon size={32} round={false} />
                </TwitterShareButton>
                <PinterestShareButton
                  url={"https://footyzone-be.herokuapp.com/"}
                  media={"Footy Zone"}
                  className="button"
                >
                  <PinterestIcon size={32} round={false} />
                </PinterestShareButton>
                <WhatsappShareButton
                  url={"https://footyzone-be.herokuapp.com/"}
                  media={"Footy Zone"}
                  className="button"
                >
                  <WhatsappIcon size={32} round={false} />
                </WhatsappShareButton>
                <RedditShareButton
                  url={"https://footyzone-be.herokuapp.com/"}
                  media={"Footy Zone"}
                  className="button"
                >
                  <RedditIcon size={32} round={false} />
                </RedditShareButton>
              </div>
              <Form
                id="search-nav"
                className="nav-search-form"
              // onSubmit={this.searchTermHandler}
              >
                <Input
                  placeholder="Subscribe"
                  // value={this.state.term}
                  type="text"
                  name="subscribe"
                // onChange={this.changeHandler}
                />
                <Button type="submmit" color="white">
                  <FaEnvelope />
                </Button>
              </Form>
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
