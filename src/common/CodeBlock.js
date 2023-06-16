import { Card } from 'react-bootstrap';

export function CodeBlock({ title, body }) {
  return (
    <Card style={{ marginBottom: '1rem' }}>
      <Card.Header>{title}</Card.Header>
      <Card.Body>
        <Card.Text>
          <code>{body}</code>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
