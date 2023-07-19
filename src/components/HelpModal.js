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
          <li>Add a new bookmark rule by specifying the command and URL.</li>
          <li>Save the bookmark rule.</li>
        </ol>
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
          In this example, when the user types <kbd>g</kbd> in the address bar
          and presses Enter, the extension will open{' '}
          <a href="#" className="link-primary">
            https://www.google.com
          </a>
          .
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
          In this example, the user can type <kbd>mail inbox</kbd> in the
          address bar, and the extension will open{' '}
          <a href="#" className="link-primary">
            https://mail.google.com/mail/u/0/#inbox
          </a>
          . Similarly, typing <kbd>mail sent</kbd> will open{' '}
          <a href="#" className="link-primary">
            https://mail.google.com/mail/u/0/#sent
          </a>
          .
        </p>
        <CodeBlock
          title={'Example #2'}
          body={
            'Rule Command:: laxto {{airport}}\nRule URL:: https://www.skyscanner.com/transport/flights/lax/{{airport}}?oym=2307&selectedoday=01&iym=2307&selectediday=01'
          }
        />
        <h4>Rules with Smart Parameters</h4>
        <p>
          Smart parameters are similar to normal parameters. But instead of
          getting replaced as is, they support fuzzy search in a list of values
          called a <var>dataset</var>. Datasets can be defined using the
          Datasets Tab.
        </p>
        <h5>Defining Datasets</h5>
        <p>
          You can define datasets by using the Datasets tab. Note the following:
        </p>
        <ol>
          <li>
            Short Name is the one you will use to refer to the dataset during
            rule definition.
          </li>
          <li>
            Data should be JSON list of strings or JSON list of objects. It will
            look something like{' '}
            <a href="https://jsoneditoronline.org/#left=cloud.fbdfd7ff1b0a49559750fb901870b7a2">
              this
            </a>{' '}
            or{' '}
            <a href="https://jsoneditoronline.org/#left=cloud.25bc7b7c4f5a412a9bb2b62152b48d06">
              this
            </a>
            . You can use something like{' '}
            <a href="https://jsoneditoronline.org/">JSON Editor Online</a> to
            properly format your dataset and make sure its valid JSON.
          </li>
        </ol>
        <CodeBlock
          title={'Rule Format 1'}
          body={
            'Rule Command:: [command] {{datasetshortname}}\nRule URL::[URL with {{datasetshortname}} placeholder]'
          }
        />
        <CodeBlock
          title={'Rule Format 2'}
          body={
            'Rule Command:: [command] {{datasetshortname.propertyX}}\nRule URL::[URL with {{datasetshortname.property1}}..{{datasetshortname.propertyN}} placeholder]'
          }
        />
        <CodeBlock
          title={'Mailbox dataset'}
          body={
            'Name:: mailboxes\nShort Name:: mailbox\nDataset:: ["inbox","sent","starred","imp","drafts"]'
          }
        />
        <CodeBlock
          title={'Example #1'}
          body={
            'Rule Command:: mail {{mailbox}}\nRule URL:: https://mail.google.com/mail/u/0/#{{mailbox}}'
          }
        />
        <p>
          Without smart parameters, you'd have to type <kbd>mail inbox</kbd> to
          go to your inbox. With smart parameters, you can type{' '}
          <kbd>mail ib</kbd> or <kbd>mail in</kbd> or <kbd>mail bo</kbd> in the
          address bar, and the extension will open{' '}
          <a href="#" className="link-primary">
            https://mail.google.com/mail/u/0/#inbox
          </a>
          . Similarly, typing <kbd>mail se</kbd> or <kbd>mail sn</kbd> or{' '}
          <kbd>mail st</kbd> or <kbd>mail nt</kbd> will open{' '}
          <a href="#" className="link-primary">
            https://mail.google.com/mail/u/0/#sent
          </a>
          .
        </p>
        <CodeBlock
          title={'Github Repositories dataset'}
          body={
            <>
              <p>
                Name:: repositories
                <br />
                Short Name:: repo
              </p>
              <pre>
                Dataset::
                {JSON.stringify([
                  {
                    org: 'facebook',
                    repo: 'react',
                  },
                  {
                    org: 'facebook',
                    repo: 'react-native',
                  },
                  {
                    org: 'google',
                    repo: 'guava',
                  },
                  {
                    org: 'SAP',
                    repo: 'ui5-webcomponents',
                  },
                  {
                    org: 'SAP',
                    repo: 'luigi',
                  },
                ])}
              </pre>
            </>
          }
        />
        <CodeBlock
          title={'Example #2'}
          body={
            'Rule Command:: repo {{repo.repo}}\nRule URL:: https://github.com/{{repo.org}}/{{repo.repo}}'
          }
        />
        <p>
          In above example we define rule's command to fuzzy search over one of
          the attributes of the dataset(
          <code style={{ display: 'inline' }}>repo</code> in above case). The
          rule's URL can use any of the attributes of the dataset one or more
          times.
        </p>
        <p>
          If you type <kbd>repo rena</kbd> the extension will open{' '}
          <a href="#" className="link-primary">
            https://github.com/facebook/react-native
          </a>
          .
        </p>
        <p>
          Similarly, typing <kbd>repo ui</kbd> will open(' ')
          <a href="#" className="link-primary">
            https://github.com/SAP/ui5-webcomponents
          </a>
          .
        </p>
        <p>
          <b>
            Note: The word fuzzy matching algorithm matches user typed word left
            to right in the original word.
          </b>
        </p>
        <CodeBlock
          title={'Word Matching Example'}
          body={
            'Original Word:: someword\nTyped Shorthand:: sw (Match)\nTyped Shorthand:: smo (Match)\nTyped Shorthand:: ws (No Match)\nTyped Shorthand:: swm (No Match)'
          }
        />
        <h4>Limitations</h4>
        <ul>
          <li>Only one dataset can be used per rule</li>
          <li>Only one parameter can be used in rule's command</li>
          <li>The parameter must be the last part of the command</li>
          <li>The parameter can be placed anywhere in the URL</li>
        </ul>
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
