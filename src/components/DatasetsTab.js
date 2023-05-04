import React, { useCallback, useState } from 'react';
import { Button, Stack, ListGroup, Modal } from 'react-bootstrap';

import ReactJson from 'react-json-view';

import { datasets } from '../mock/datasets';

export function DatasetsTab({ onDatasetsSave }) {
  const [selectedDataset, setSelectedDataset] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleView = useCallback((dataset) => {
    setSelectedDataset(dataset);
    setShowModal(true);
  }, []);

  const handleEdit = useCallback((dataset) => {
    setSelectedDataset(dataset);
    setShowModal(true);
  }, []);

  return (
    // <Stack gap={2}>
    //   <Form.Control
    //     as={'textarea'}
    //     rows={10}
    //     value={current}
    //     onChange={(e) => setCurrent(e.target.value)}
    //   />
    //   <ReactJson src={json} style={{ height: '400px', textAlign: 'left' }} />
    //   <Button onClick={() => setJson(JSON.parse(current))}>Update</Button>
    // </Stack>
    <>
      <ListGroup>
        {datasets.map((dataset) => (
          <ListGroup.Item>
            <Stack direction="horizontal" gap={2}>
              {dataset.name}
              <Button className="ms-auto" onClick={() => handleView(dataset)}>
                Edit
              </Button>
              <Button onClick={() => handleEdit(dataset)}>View</Button>
            </Stack>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedDataset?.name || ''}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReactJson
            src={selectedDataset?.values || {}}
            style={{ height: '400px', textAlign: 'left' }}
            name={null}
            enableClipboard={false}
            displayDataTypes={false}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
