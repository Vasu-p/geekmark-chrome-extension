import React from 'react';
import { Modal } from 'react-bootstrap';

export function HelpModal({ show, onClose }) {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>How to use</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
    </Modal>
  );
}
