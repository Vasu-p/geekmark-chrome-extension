import React from 'react';
import { Modal } from 'react-bootstrap';
import { CodeBlock } from '../../common/CodeBlock';
import { RuleFormatWithExamples } from './RuleFormatWithExamples';

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
        <RuleFormatWithExamples
          exampleRules={[
            { command: 'g', url: 'https://www.google.com' },
            { command: 'b', url: 'https://www.bing.com' },
          ]}
          exampleInteractions={[
            { command: 'g', url: 'https://www.google.com' },
            { command: 'b', url: 'https://www.bing.com' },
          ]}
        />
        <h4>Rules with Parameters</h4>
        <p>
          Rules with parameters allow users to specify dynamic parts in the URL.
          The parameter acts as a placeholder that can be replaced with specific
          values when using the command.
        </p>
        <RuleFormatWithExamples
          exampleRules={[
            {
              command: 'mail {{param}}',
              url: 'https://mail.google.com/mail/u/0/#{{param}}',
            },
            {
              command: 'laxto {{airport}}',
              url: 'https://www.skyscanner.com/transport/flights/lax/{{airport}}?oym=2307&selectedoday=01&iym=2307&selectediday=01',
            },
          ]}
          exampleInteractions={[
            {
              command: 'mail inbox',
              url: 'https://mail.google.com/mail/u/0/#inbox',
            },
            {
              command: 'mail sent',
              url: 'https://mail.google.com/mail/u/0/#sent',
            },
            {
              command: 'laxto bna',
              url: 'https://www.skyscanner.com/transport/flights/lax/bna?oym=2307&selectedoday=01&iym=2307&selectediday=01',
            },
          ]}
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
          title={'Mailbox dataset'}
          body={
            'Name:: mailboxes\nShort Name:: mailbox\nDataset:: ["inbox","sent","starred","imp","drafts"]'
          }
        />
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
        <RuleFormatWithExamples
          exampleRules={[
            {
              command: 'mail {{mailbox}}',
              url: 'https://mail.google.com/mail/u/0/#{{mailbox}}',
            },
            {
              command: 'repo {{repo.repo}}',
              url: 'https://github.com/{{repo.org}}/{{repo.repo}}',
            },
          ]}
          exampleInteractions={[
            {
              command: 'mail ib',
              url: 'https://mail.google.com/mail/u/0/#inbox',
            },
            {
              command: 'mail in',
              url: 'https://mail.google.com/mail/u/0/#inbox',
            },
            {
              command: 'mail st',
              url: 'https://mail.google.com/mail/u/0/#sent',
            },
            {
              command: 'repo rena',
              url: 'https://github.com/facebooi/react-native',
            },
            {
              command: 'repo ui',
              url: 'https://github.com/SAP/ui5-webcomponents',
            },
          ]}
        />
        <p>
          Without smart parameters, you'd have to type <kbd>mail inbox</kbd> to
          go to your inbox. With smart parameters, you can type{' '}
          <kbd>mail ib</kbd> or <kbd>mail in</kbd> or <kbd>mail bo</kbd> in the
          address bar, and the extension will open{' '}
          <a href="#" className="link-primary">
            https://mail.google.com/mail/u/0/#inbox
          </a>
          .
        </p>
        <p>
          As we did for the second rule, we can also define rule's command to
          fuzzy search over one of the attributes of the dataset(
          <code style={{ display: 'inline' }}>repo</code> in above case). The
          rule's URL can use any of the attributes of the dataset one or more
          times.
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
        <h4>Complex Rule Examples</h4>
        <RuleFormatWithExamples
          exampleRules={[
            {
              command: 'site {{new1.x}} {{new2.x}}',
              url: 'https://www.{{new1.x}}.com/{{new1.x}}-{{new1.y}}-{{new2.x}}-{{new2.y}}',
            },
            {
              command: 'flight {{air1}} {{air2}} {{from}} {{to}}',
              url: 'https://www.google.com/travel/flights?q=Flights%20to%20{{air2}}%20from%20{{air1}}%20on%20{{from}}%20through%20{{to}}',
            },
            {
              command: 'repo {{repo.repo}} {{section}}',
              url: 'https://github.com/{{repo.org}}/{{repo.repo}}/{{section}}',
            },
            {},
          ]}
          exampleInteractions={[
            {
              command: 'site ab cd',
              url: 'https://www.ab.com/ab-cd-ab-cd',
            },
            {
              command: 'flight lax yyz 2023-01-01 2023-02-02',
              url: 'https://www.google.com/travel/flights?q=Flights%20to%20yyz%20from%20lax%20on%202023-01-01%20through%202023-02-02',
            },
            {
              command: 'repo rena issues',
              url: 'https://github.com/facebook/react-native/issues',
            },
          ]}
        />
        Depending on how you structure your rules, you can create some pretty
        powerful commands. Please share your cool commands with us on Github or
        by putting a review on Chrome Web Store.
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
