import React from "react";
import { FormGroup, Input, Button } from "reactstrap";
import loading from "./../../../src/loading.gif";

const Contact = props => {
  window.scrollTo(0, 0);

  return (
    <div className="container form contact login">
      <h1 className="bungee">Contact</h1>

      {props.loading ? (
        <img src={loading} alt="Contact form is loading gif" />
      ) : (
          <FormGroup>
            <Input placeholder="About You" />
            <Input placeholder="Message" type="textarea" />
            <button className="blue">Send</button>
          </FormGroup>
        )}
    </div>
  );
};

export default Contact;
