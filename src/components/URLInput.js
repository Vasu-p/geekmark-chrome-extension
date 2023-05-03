import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';

export function URLInput({ label, value, onChange, className, ...props }) {
  return (
    <Stack
      gap={3}
      direction={'horizontal'}
      className={`align-items-center ${className}`}
    >
      <kbd className="col-3 App-text alight-self-stretch">{label}</kbd>
      <Form.Control type="input" onChange={onChange} value={value || ''} />
    </Stack>
  );
}
