/*global chrome*/
import { useState, useEffect, useCallback } from 'react';
import './App.css';
// components
import {
  Button,
  Navbar,
  Container,
  Toast,
  ToastContainer,
  Tabs,
  Tab,
  Stack,
} from 'react-bootstrap';

// custom compos
import { useShowToast } from './utils/hooks/useShowToast';
import { URLInput } from './URLInput';

function App() {
  // {command:'', url: ''}
  const [rules, setRules] = useState([]);
  const [newRule, setNewRule] = useState({ command: '', url: '' });
  const {
    show: isSuccesfulSaveToastVisible,
    showToast: showSuccesfulSaveToast,
  } = useShowToast(false, 3000);

  useEffect(async () => {
    const rules = (await chrome.storage.local.get(['rules'])).rules || [];
    setRules(rules);
  }, []);

  const handleRuleUrlChange = useCallback((command, newUrl) => {
    console.log('chaning rule', command);
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
        <Tab title={'Rules'} eventKey={'custom'}>
          <div className="mt-5">
            <Stack gap={1}>
              {rules.map((rule) => (
                <Stack gap={1} direction={'horizontal'}>
                  <URLInput
                    label={rule.command}
                    value={rule.url}
                    onChange={(e) =>
                      handleRuleUrlChange(rule.command, e.target.value)
                    }
                    className={'flex-grow-1'}
                  />
                  <Button
                    onClick={() => {
                      setRules((origRules) =>
                        origRules.filter(
                          (origRule) => origRule.command != rule.command
                        )
                      );
                    }}
                    className={'App-button'}
                    variant={'danger'}
                  >
                    Delete Rule
                  </Button>
                </Stack>
              ))}
            </Stack>
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
              <Button
                onClick={() => {
                  setRules((rules) => [...rules, newRule]);
                  setNewRule({ command: '', url: '' });
                }}
                className={'App-button'}
                variant={'light'}
              >
                Add Rule
              </Button>
            </div>
            <Button
              onClick={() => {
                chrome.storage.local.set({ rules: rules });
              }}
              className={'App-button'}
            >
              Save Rules
            </Button>
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
