/*global chrome*/
import { useState, useEffect, useCallback } from 'react';
import './App.css';
// components
import {
  Button,
  Stack,
  Navbar,
  Container,
  Toast,
  ToastContainer,
  Tabs,
  Tab,
} from 'react-bootstrap';

// custom compos
import { URLInput } from './URLInput';
import { useShowToast } from './utils/hooks/useShowToast';

function App() {
  const [baseUrls, setBaseUrls] = useState({
    devPortalBaseUrl: '',
    argoBaseUrl: '',
    jiraBaseUrl: '',
    jiraMyBoardUrl: '',
    jiraBoardUrl: '',
    jiraBacklogUrl: '',
    jenkinsBaseUrl: '',
  });

  // {command:'', url: ''}
  const [rules, setRules] = useState([]);
  const [newRule, setNewRule] = useState({ command: '', url: '' });
  const {
    show: isSuccesfulSaveToastVisible,
    showToast: showSuccesfulSaveToast,
  } = useShowToast(false, 3000);

  useEffect(async () => {
    const baseUrls =
      (await chrome.storage.local.get(['baseUrls'])).baseUrls || {};
    setBaseUrls(baseUrls);

    const rules = (await chrome.storage.local.get(['rules'])).rules || [];
    setRules(rules);
  }, []);

  const handleChange = useCallback((name, value) => {
    setBaseUrls((baseUrls) => ({ ...baseUrls, [name]: value }));
  }, []);

  const handleRuleUrlChange = useCallback((command, newUrl) => {
    setRules((rules) =>
      rules.map((rule) =>
        rule.command === command ? { ...rule, url: newUrl } : rule
      )
    );
  }, []);

  return (
    <div className="App">
      <Navbar bg={'light'}>
        <Container>
          <Navbar.Brand href="#home">
            <img src="/icon.png" className="App-icon" />
            Geekmark
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Tabs className="mt-1">
        <Tab title={'Predefined Rules'} eventKey={'predefined'}>
          <Stack gap={2} className={'mt-5'}>
            <Stack gap={1}>
              <URLInput
                label={'Dev Portal Base URL'}
                value={baseUrls['devPortalBaseUrl']}
                onChange={(e) =>
                  handleChange('devPortalBaseUrl', e.target.value)
                }
              />
              <URLInput
                label={'Jira Base URL'}
                value={baseUrls['jiraBaseUrl']}
                onChange={(e) => handleChange('jiraBaseUrl', e.target.value)}
              />
              <URLInput
                label={'Argo Base URL'}
                value={baseUrls['argoBaseUrl']}
                onChange={(e) => handleChange('argoBaseUrl', e.target.value)}
              />
              <URLInput
                label={'Jira Myboard URL'}
                value={baseUrls['jiraMyBoardUrl']}
                onChange={(e) => handleChange('jiraMyBoardUrl', e.target.value)}
              />
              <URLInput
                label={'Jira Board URL'}
                value={baseUrls['jiraBoardUrl']}
                onChange={(e) => handleChange('jiraBoardUrl', e.target.value)}
              />
              <URLInput
                label={'Jira Backlog URL'}
                value={baseUrls['jiraBacklogUrl']}
                onChange={(e) => handleChange('jiraBacklogUrl', e.target.value)}
              />
              <URLInput
                label={'Jenkins Base URL'}
                value={baseUrls['jenkinsBaseUrl']}
                onChange={(e) => handleChange('jenkinsBaseUrl', e.target.value)}
              />
              <Button
                onClick={() => {
                  chrome.storage.local.set({ baseUrls: baseUrls });
                  showSuccesfulSaveToast();
                }}
                className={'mt-3'}
              >
                Save
              </Button>
            </Stack>
          </Stack>
        </Tab>
        <Tab title={'Custom Rules'} eventKey={'custom'}>
          <div className="mt-5">
            <div>
              {rules.map((rule) => (
                <div>
                  <label>{rule.command}</label>
                  <input
                    className="App-input"
                    value={rule.url}
                    onChange={(e) =>
                      handleRuleUrlChange(rule.command, e.target.value)
                    }
                  />
                  <button
                    onClick={() => {
                      setRules((origRules) =>
                        origRules.filter(
                          (origRule) => origRule.command != rule.command
                        )
                      );
                    }}
                    className={'App-button'}
                  >
                    Delete Rule
                  </button>
                </div>
              ))}
            </div>
            <div>
              <label>Rule Command::</label>
              <input
                className="App-input"
                value={newRule.command}
                onChange={(e) =>
                  setNewRule({ ...newRule, command: e.target.value })
                }
              />
              <label>Rule URL::</label>
              <input
                className="App-input"
                value={newRule.url}
                onChange={(e) =>
                  setNewRule({ ...newRule, url: e.target.value })
                }
              />
              <button
                onClick={() => {
                  setRules((rules) => [...rules, newRule]);
                  setNewRule({ command: '', url: '' });
                }}
                className={'App-button'}
              >
                Add Rule
              </button>
            </div>
            <button
              onClick={() => {
                chrome.storage.local.set({ rules: rules });
              }}
              className={'App-button'}
            >
              Save Rules
            </button>
          </div>
        </Tab>
      </Tabs>
      <ToastContainer position="bottom-center">
        <Toast show={isSuccesfulSaveToastVisible}>
          <Toast.Body>Rules Saved Succesfully</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default App;
