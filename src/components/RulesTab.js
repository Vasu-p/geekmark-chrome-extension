/*global chrome*/
import React, { useEffect, useState, useCallback } from 'react';

// components
import { Button, Badge, Stack, FloatingLabel, Form } from 'react-bootstrap';

import { URLInput } from './URLInput';

import { RuleType } from '../constants';

export function RulesTab({ onRulesSave }) {
  // {command:'', url: ''}
  const [rules, setRules] = useState([]);
  const [newRule, setNewRule] = useState({
    command: '',
    url: '',
    type: RuleType.SIMPLE,
  });

  useEffect(() => {
    async function setRulesFromStorage() {
      const rules = (await chrome.storage.local.get(['rules'])).rules || [];
      setRules(rules);
    }
    setRulesFromStorage();
  }, []);

  const handleRuleUrlChange = useCallback((command, newUrl) => {
    setRules((rules) =>
      rules.map((rule) =>
        rule.command === command ? { ...rule, url: newUrl } : rule
      )
    );
  }, []);

  return (
    <Stack className="mt-5" gap={3}>
      <Stack gap={2}>
        {rules.map((rule) => (
          <Stack gap={1} direction={'horizontal'}>
            <Badge>{rule.type === RuleType.SIMPLE ? 'S' : 'A'}</Badge>
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
      <Stack direction="horizontal" gap={1}>
        <FloatingLabel label="Rule Command" className={'flex-grow-1'}>
          <Form.Control
            type="input"
            placeholder="Rule Command"
            value={newRule.command}
            onChange={(e) =>
              setNewRule({ ...newRule, command: e.target.value })
            }
          />
        </FloatingLabel>
        <FloatingLabel label="Rule URL" className={'flex-grow-1'}>
          <Form.Control
            type="input"
            placeholder="Rule URL"
            value={newRule.url}
            onChange={(e) => setNewRule({ ...newRule, url: e.target.value })}
          />
        </FloatingLabel>
        <Form.Check
          type={'switch'}
          id={'rule-type'}
          label={'Advanced?'}
          checked={newRule.type === RuleType.ADVANCED}
          inline
          onChange={(e) => {
            setNewRule({
              ...newRule,
              type: e.target.checked ? RuleType.ADVANCED : RuleType.SIMPLE,
            });
          }}
        />
        <Button
          onClick={() => {
            setRules((rules) => [...rules, newRule]);
            setNewRule({ command: '', url: '', type: RuleType.SIMPLE });
          }}
          className={'App-button align-self-stretch'}
          variant={'light'}
        >
          Add Rule
        </Button>
      </Stack>
      <Button
        onClick={() => {
          chrome.storage.local.set({ rules: rules });
          onRulesSave();
        }}
        className={'App-button'}
      >
        Save Rules
      </Button>
    </Stack>
  );
}
