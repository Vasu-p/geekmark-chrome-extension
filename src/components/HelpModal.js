import React from 'react';
import { Modal } from 'react-bootstrap';
import { CodeBlock } from '../common/CodeBlock';

export function HelpModal({ show, onClose }) {
  return (
    <Modal show={show} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Geekmark Help</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ height: '80vh', overflowY: 'scroll' }}>
        <p>
          The Geekmark bookmark extension allows users to specify bookmark rules
          with commands and URLs. These rules provide a convenient way to
          navigate to specific URLs by typing commands in the browser's address
          bar.
        </p>
        <h3>Rule Definition</h3>
        <p>
          Each rule consists of two parts: a <var>command</var> and a{' '}
          <var>URL</var>. The command is what the user types in the address bar,
          and the URL is the corresponding web address to navigate to. The
          extension supports simple rules as well as rules with parameters.
        </p>
        <h4>Simple Rules</h4>
        <p>
          Simple rules are straightforward mappings between a command and a URL.
          When the user types the command, the extension will open the specified
          URL.
        </p>
        <CodeBlock
          title={'Rule Format'}
          body={'Rule Command:: [command]\nRule URL:: [URL]'}
        />
        <CodeBlock
          title={'Example #1'}
          body={'Rule Command:: g\nRule URL:: https://www.google.com'}
        />
        <p>
          In this example, when the user types "g" in the address bar and
          presses Enter, the extension will open <a>https://www.google.com</a>.
        </p>
        <h4>Rules with Parameters</h4>
        <p>
          Rules with parameters allow users to specify dynamic parts in the URL.
          The parameter acts as a placeholder that can be replaced with specific
          values when using the command. The parameter must be the last part of
          the command and can be placed anywhere in the URL.
        </p>
        <CodeBlock
          title={'Rule Format'}
          body={
            'Rule Command:: [command] {{param}}\nRule URL::[URL with {{param}} placeholder]'
          }
        />
        <CodeBlock
          title={'Example #1'}
          body={
            'Rule Command:: mail {{param}}\nRule URL:: https://mail.google.com/mail/u/0/#{{param}}'
          }
        />
        <p>
          In this example, the user can type "mail inbox" in the address bar,
          and the extension will open{' '}
          <a>https://mail.google.com/mail/u/0/#inbox</a>. Similarly, typing
          "mail sent" will open <a>https://mail.google.com/mail/u/0/#sent</a>.
        </p>
        <CodeBlock
          title={'Example #2'}
          body={
            'Rule Command:: laxto {{airport}}\nRule URL:: https://www.skyscanner.com/transport/flights/lax/{{airport}}?oym=2307&selectedoday=01&iym=2307&selectediday=01'
          }
        />
        <h4>Limitations</h4>
        <ul>
          <li>Only one parameter is supported per rule.</li>
          <li>The parameter must be the last part of the command.</li>
          <li>The parameter can be placed anywhere in the URL.</li>
        </ul>
        <h3>Usage</h3>
        <p>
          Typing <kbd>g</kbd> in URL bar of the browser and hitting space will
          trigger the Geekmark omnibox. Then type in one of your rule commands
          and press <kbd>Enter</kbd>. Voila! It will take you to your geekmarked
          URL!!
        </p>
        <p>To define your rules follow these steps:</p>
        <ol>
          <li>Install the Geekmark extension in your browser.</li>
          <li>Open the extension settings by clicking on extension icon.</li>
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
