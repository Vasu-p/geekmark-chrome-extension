/*global chrome*/
import React, { useCallback, useState } from 'react';
import { Button, Stack, ListGroup, Modal } from 'react-bootstrap';

import ReactJson from 'react-json-view';

import { AddModal } from './AddModal';

import { useLocalStorage } from '../../utils/hooks/useLocalStorage';
import { transformDataset } from '../../utils/formatUtils';

export function DatasetsTab({ onDatasetsSave }) {
  const [selectedDataset, setSelectedDataset] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const {
    data: datasets,
    setData: setDatasets,
    deleteData: deleteDataset,
    addData: addDataset,
  } = useLocalStorage('datasets', 'array', (dataset) => dataset.name);

  const handleView = useCallback((dataset) => {
    setSelectedDataset(dataset);
    setShowViewModal(true);
  }, []);

  return (
    <>
      <Stack gap={1} className={'mt-1'}>
        <Button
          variant="success"
          className="ms-auto"
          onClick={() => setShowAddModal(true)}
        >
          Add New Dataset
        </Button>
        <ListGroup>
          {datasets.length === 0 && (
            <ListGroup.Item>
              No Datasets found. Please add using "Add New Dataset"
            </ListGroup.Item>
          )}
          {datasets.map((dataset) => (
            <ListGroup.Item>
              <Stack direction="horizontal" gap={2}>
                <h5 className="mb-0">{dataset.name}</h5>
                <span>
                  Use as <kbd>{`{{${dataset.shortName}}}`}</kbd> in the rules
                </span>
                <Button className="ms-auto" onClick={() => handleView(dataset)}>
                  View
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    deleteDataset(dataset.name);
                  }}
                >
                  Delete
                </Button>
              </Stack>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Stack>
      <Modal show={showViewModal} onHide={() => setShowViewModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedDataset?.name || ''}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReactJson
            src={selectedDataset?.values || {}}
            style={{
              height: '400px',
              textAlign: 'left',
              overflow: 'auto',
            }}
            name={null}
            enableClipboard={false}
            displayDataTypes={false}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowViewModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <AddModal
        show={showAddModal}
        onSuccess={(newDataset) => {
          addDataset(transformDataset(newDataset));
          setShowAddModal(false);
        }}
        onClose={() => setShowAddModal(false)}
      />
    </>
  );
}
