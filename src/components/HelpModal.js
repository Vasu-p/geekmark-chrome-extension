import React from 'react';
import { Modal } from 'react-bootstrap';

export function HelpModal({ show, onClose }) {
  return (
    <Modal show={show} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Geekmark Help</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ height: '80vh', overflowY: 'scroll' }}>
        The Geekmark bookmark extension allows users to specify bookmark rules
        with commands and URLs. These rules provide a convenient way to navigate
        to specific URLs by typing commands in the browser's address bar.
        <h2>Rule Format</h2>
        Each rule consists of two parts: a command and a URL. The command is
        what the user types in the address bar, and the URL is the corresponding
        web address to navigate to. The extension supports simple rules as well
        as rules with parameters.
        <h3>Simple Rules</h3>
        Simple rules are straightforward mappings between a command and a URL.
        When the user types the command, the extension will open the specified
        URL.
        <h4>Rule Format:</h4>
        {/* prettier-ignore */}
        <code>
          command:: [command]
          URL:: [URL]
        </code>
        <h4>Example:</h4>
        {/* prettier-ignore */}
        <code>
          command:: g
          URL:: https://www.google.com
        </code>
        In this example, when the user types "g" in the address bar and presses
        Enter, the extension will open "https://www.google.com".
        <h3>Rules with Parameters</h3>
        Rules with parameters allow users to specify dynamic parts in the URL.
        The parameter acts as a placeholder that can be replaced with specific
        values when using the command. The parameter must be the last part of
        the command and can be placed anywhere in the URL.
        <h4>Rule Format:</h4>
        {/* prettier-ignore */}
        <code>
          command:: [command] {'{{param}}'}
          URL:: [URL with {'{{param}}'} placeholder]
        </code>
        <h4>Example:</h4>
        {/* prettier-ignore */}
        <code>
          command:: mail {'{{param}}'}
          URL:: https://mail.google.com/mail/u/0/#{'{{param}}'}
        </code>
        In this example, the user can type "mail inbox" in the address bar, and
        the extension will open "https://mail.google.com/mail/u/0/#inbox".
        Similarly, typing "mail sent" will open
        "https://mail.google.com/mail/u/0/#sent".
        <h3>Limitations</h3>
        <ul>
          <li>Only one parameter is supported per rule.</li>
          <li>The parameter must be the last part of the command.</li>
          <li>The parameter can be placed anywhere in the URL.</li>
        </ul>
        <h2>Usage</h2>
        To use the Geekmark bookmark extension, follow these steps:
        <ol>
          <li>Install the Geekmark extension in your browser.</li>
          <li>Open the extension settings or options.</li>
          <li>
            Add a new bookmark rule by specifying the command and URL.
            <ul>
              <li>
                For simple rules, enter the command and the corresponding URL.
              </li>
              <li>
                For rules with parameters, enter the command with the parameter
                placeholder and the URL with the {'{{param}}'} placeholder.
              </li>
            </ul>
          </li>
          <li>Save the bookmark rule.</li>
          <li>
            To use a bookmark rule, type the command in the browser's address
            bar and press Enter.
          </li>
        </ol>
      </Modal.Body>
    </Modal>
  );
}

/*
Using React Boostrap https://react-bootstrap.github.io/ write help component in React for a bookmark extension named Geekmark which helps user to specify bookmark rules.

Each rule has two parts: command and URL.

Users can specify simple rules such as
command:: g
URL:: https://www.google.com

command:: mail
URL:: https://mail.google.com/mail/u/0/#inbox

Users can specify rules with parameters. For example,
command:: mail {{param}}
URL:: https://mail.google.com/mail/u/0/#{{param}}
if user types "mail inbox" it will go to "https://mail.google.com/mail/u/0/#inbox"
if user types "mail sent" it will go to "https://mail.google.com/mail/u/0/#sent"

another example
command:: laxto {{airport}}
URL:: https://www.skyscanner.com/transport/flights/lax/{{airport}}?oym=2307&selectedoday=01&iym=2307&selectediday=01
if user types "laxto bna" it will go to "https://www.skyscanner.com/transport/flights/lax/bna?oym=2307&selectedoday=01&iym=2307&selectediday=01"
if user types "laxto san" it will go to "https://www.skyscanner.com/transport/flights/lax/san?oym=2307&selectedoday=01&iym=2307&selectediday=01"

The parameter name doesnt matter (param, airport in above examples). They should just match in command and URL. The param must be at last in command but it can be anywhere in URL. Only 1 param is supported at this moment.

Constraints:

- Do not use Row, Col, Container, Accordion components
- Use <kbd> html tag for command
- Use <code> html tag for URL
*/

// {'{{param}}'}
