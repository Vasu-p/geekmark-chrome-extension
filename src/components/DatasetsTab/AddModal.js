import React, { useCallback, useState } from 'react';

import { Button, Form, Modal } from 'react-bootstrap';

export function AddModal({ show, onSuccess, onClose }) {
  const [newDataset, setNewDataset] = useState({
    name: '',
    shortName: '',
    values: [],
  });

  const handleDatasetChange = useCallback(
    (key, value) => {
      setNewDataset({ ...newDataset, [key]: value });
    },
    [newDataset, setNewDataset]
  );

  const handleSave = useCallback(() => {
    onSuccess(newDataset);
    setNewDataset({
      name: '',
      shortName: '',
      values: [],
    });
  }, [onSuccess, newDataset]);

  const handleClose = useCallback(() => {
    setNewDataset({
      name: '',
      shortName: '',
      values: [],
    });
  }, []);

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Dataset</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type={'input'}
              placeholder="Dataset Name"
              onChange={(e) => handleDatasetChange('name', e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Short Name</Form.Label>
            <Form.Control
              type={'input'}
              placeholder="Dataset Short Name"
              onChange={(e) => handleDatasetChange('shortName', e.target.value)}
            />
            <Form.Text className="text-muted">
              Use this to refer to this dataset in your rules
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>JSON</Form.Label>
            <Form.Control
              as={'textarea'}
              placeholder='["abc", "def", ...]'
              style={{ height: '300px' }}
              onChange={(e) => {
                try {
                  let parsedValue = JSON.parse(e.target.value);
                  handleDatasetChange('values', parsedValue);
                } catch {}
              }}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
