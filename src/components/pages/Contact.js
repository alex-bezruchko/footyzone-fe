import React from 'react';
import { FormGroup, Input, Button } from 'reactstrap';

const Contact = props => {
    return(
        <div className="form contact">
            <h1>Contact Form</h1>
            <FormGroup>
                <Input 
                    placeholder="About You"
                />
                <Input 
                    placeholder="Message"
                    type="textarea"
                />
                <Button color="success">Send</Button>
            </FormGroup>
        </div>
    )
}

export default Contact;