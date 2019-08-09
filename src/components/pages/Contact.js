import React from "react";
import { FormGroup, Input, Button } from "reactstrap";
import loading from "./../../../src/loading.gif";

const Contact = props => {
  return (
    <div className="container form contact">
      <h1 className="bungee">Contact</h1>

      {props.loading ? (
        <img src={loading} alt="Contact form is loading gif" />
      ) : (
        <FormGroup>
          <Input placeholder="About You" />
          <Input placeholder="Message" type="textarea" />
          <Button color="success">Send</Button>
        </FormGroup>
      )}
    </div>
  );
};

export default Contact;
