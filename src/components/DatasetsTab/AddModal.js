import React, { useCallback } from 'react';

import { Button, Form, Modal } from 'react-bootstrap';

export function AddModal({ show, onSuccess, onClose }) {
  const handleSave = useCallback(() => {
    onSuccess();
  }, [onSuccess]);

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Dataset</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Dataset Name</Form.Label>
            <Form.Control type={'input'} placeholder="Enter title" />
            <Form.Text className="text-muted">
              Use this to refer to this dataset in your rules
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>JSON</Form.Label>
            <Form.Control
              as={'textarea'}
              placeholder='["abc", "def", ...]'
              style={{ height: '400px' }}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
