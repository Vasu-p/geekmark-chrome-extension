import React from 'react';
import {
  Modal,
  Container,
  Row,
  Col,
  Accordion,
  Card,
  Button,
} from 'react-bootstrap';

export function HelpModal({ show, onClose }) {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>How to use</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col>
              <h1>Geekmark Help</h1>
              <p>
                Welcome to the Geekmark help page. Here you can find information
                on how to use the extension.
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <Accordion>
                <Card>
                  <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                      Adding Simple Rules
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      To add a simple rule, simply type in the format "shortcut
                      -> URL" into the input field on the extension popup. For
                      example, to create a shortcut for Google, you would type
                      "g -> https://google.com". Once you've added a rule, you
                      can use the shortcut to quickly navigate to the URL by
                      typing the shortcut into the address bar and pressing
                      enter.
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card>
                  <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="1">
                      Adding Rules with Parameters
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="1">
                    <Card.Body>
                      To add a rule with parameters, use double curly braces to
                      indicate where the parameter should be inserted in the
                      URL. For example, to create a shortcut for Gmail that goes
                      to the inbox or sent folder depending on the parameter,
                      you would type "mail {{param}} ->
                      https://mail.google.com/mail/u/0/#{{param}}". Once
                      you've added a rule, you can use the shortcut with a
                      parameter to quickly navigate to the appropriate URL by
                      typing the shortcut followed by the parameter into the
                      address bar and pressing enter.
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
}
