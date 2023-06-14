import React from 'react';
import { Modal, Card, ListGroup, ListGroupItem } from 'react-bootstrap';

export function HelpModal({ show, onClose }) {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>How to use</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card>
          <Card.Body>
            <Card.Title>Simple Rules</Card.Title>
            <Card.Text>
              To create a simple rule, use the following format:
              <br />
              <code>command:: shortcut URL:: url</code>
              <br />
              For example:
              <br />
              <code>command:: g URL:: https://www.google.com</code>
              <br />
              This will create a shortcut for going to Google.
            </Card.Text>
            <Card.Title>Rules with Parameters</Card.Title>
            <Card.Text>
              To create a rule with a parameter, use the following format:
              <br />
              <code>
                command:: shortcut &#123;&#123;param&#125;&#125; URL::
                url&#123;&#123;param&#125;&#125;
              </code>
              <br />
              For example:
              <br />
              <code>
                command:: mail &#123;&#123;folder&#125;&#125; URL::
                https://mail.google.com/mail/u/0/#&#123;&#123;folder&#125;&#125;
              </code>
              <br />
              This will create a shortcut for going to a specific folder in
              Gmail. To use it, type "mail foldername" (e.g. "mail inbox").
            </Card.Text>
            <Card.Text>
              Note: Only one parameter is supported at this time, and it must be
              at the end of the command.
            </Card.Text>
          </Card.Body>
        </Card>
      </Modal.Body>
    </Modal>
  );
}
// {'{{param}}'}
