import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PurchaseForm from './PurchaseForm'

function PurchaseModal(props){
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className="purchase-modal__title">
          Purchase online
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="purchase-modal">
        <PurchaseForm onHide={props.onHide}/>
      </Modal.Body>
      <Modal.Footer>
        <Button className="purchase-modal__button" onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PurchaseModal;