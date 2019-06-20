import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

function PurchaseForm(props) {
  return (
  <Form>
    <Form.Row>
      <Form.Group as={Col} className="purchase-modal" controlId="formGridEmail">
        <Form.Label className="purchase-modal">Email</Form.Label>
        <Form.Control className="purchase-modal" type="email" placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="purchase-modal" as={Col} controlId="formGridPassword">
        <Form.Label className="purchase-modal">Password</Form.Label>
        <Form.Control className="purchase-modal" type="password" placeholder="Password" />
      </Form.Group>
    </Form.Row>

    <Form.Group className="purchase-modal" controlId="formGridAddress1">
      <Form.Label className="purchase-modal">Address</Form.Label>
      <Form.Control className="purchase-modal" placeholder="1234 Main St" />
    </Form.Group>

    <Form.Group className="purchase-modal" controlId="formGridAddress2">
      <Form.Label className="purchase-modal">Address 2</Form.Label>
      <Form.Control className="purchase-modal" placeholder="Apartment, studio, or floor" />
    </Form.Group>

    <Form.Row>
      <Form.Group className="purchase-modal" as={Col} controlId="formGridCity">
        <Form.Label className="purchase-modal" >City</Form.Label>
        <Form.Control className="purchase-modal" />
      </Form.Group>

      <Form.Group className="purchase-modal" as={Col} controlId="formGridState">
        <Form.Label className="purchase-modal" >State</Form.Label>
        <Form.Control className="purchase-modal" as="select">
          <option className="purchase-modal" >Choose...</option>
          <option className="purchase-modal">...</option>
        </Form.Control>
      </Form.Group>

      <Form.Group className="purchase-modal" as={Col} controlId="formGridZip">
        <Form.Label className="purchase-modal">Zip</Form.Label>
        <Form.Control className="purchase-modal" />
      </Form.Group>
    </Form.Row>

    <Form.Group className="purchase-modal" id="formGridCheckbox">
      <Form.Check tclassName="purchase-modal" ype="checkbox" label="Check me out" />
    </Form.Group>

    <Button className="purchase-modal" variant="primary" onClick={props.onHide}>
      Submit
    </Button>
  </Form>);
}
export default PurchaseForm;