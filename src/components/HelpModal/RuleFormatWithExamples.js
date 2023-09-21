import { Card, ListGroup } from 'react-bootstrap';
import { URLInput } from '../URLInput';

// exampleRules is an array of objects with the following properties:
//   - command
//   - url
export function RuleFormatWithExamples({
  exampleRules = [],
  exampleInteractions = [],
}) {
  return (
    <Card style={{ marginBottom: '1rem' }}>
      <Card.Body>
        <Card.Text>
          <Card.Title as={'h5'}>Example Rules</Card.Title>
          <hr />
          {exampleRules.map((rule, index) => (
            <URLInput
              key={index}
              label={rule.command}
              value={rule.url}
              className={'mt-2'}
            />
          ))}
          <Card.Title className="mt-4" as={'h5'}>
            Example Interactions
          </Card.Title>
          <hr />
          <ListGroup>
            {exampleInteractions.map((example, index) => (
              <ListGroup.Item key={index}>
                <kbd>{example.command}</kbd> →{' '}
                <span className="link-primary">{example.url}</span>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
