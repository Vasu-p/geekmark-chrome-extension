import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';

export function URLInput({ label, value, onChange }) {
  return (
    <Stack gap={3} direction={'horizontal'} className={'align-items-center'}>
      <label className="col-3 App-text">{label}</label>
      <Form.Control type="input" onChange={onChange} value={value || ''} />
    </Stack>
  );
}
