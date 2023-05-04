import React, { useState } from 'react';
import { Button, Form, Stack } from 'react-bootstrap';

import ReactJson from 'react-json-view';

export function DatasetsTab({ onDatasetsSave }) {
  const [json, setJson] = useState({});
  const [current, setCurrent] = useState('');
  return (
    <Stack gap={2}>
      <Form.Control
        as={'textarea'}
        rows={10}
        value={current}
        onChange={(e) => setCurrent(e.target.value)}
      />
      <ReactJson src={json} />
      <Button onClick={() => setJson(JSON.parse(current))}>Update</Button>
    </Stack>
  );
}
