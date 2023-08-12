/*global chrome*/
// remember: import using file.js and not just file. otherwise it will thorw error.
import { RuleType } from './constants.js';
import {
  matches,
  parseSimpleParams,
  substituteParamsInSimpleRule,
  parseAdvancedParams,
  substituteParamsInAdvancedRule,
} from './utils/command-utils.js';

chrome.omnibox.onInputEntered.addListener(async (typedCommand) => {
  let newURL = null;

  const { rules } = await chrome.storage.local.get(['rules']);
  const { datasets } = await chrome.storage.local.get(['datasets']);

  rules.every((rule) => {
    if (rule.command === typedCommand) {
      newURL = rule.url;
      return false;
    }
    if (matches(typedCommand, rule.command)) {
      if (rule.type === RuleType.SIMPLE) {
        const parsedParamsMap = parseSimpleParams(typedCommand, rule.command);
        newURL = substituteParamsInSimpleRule(rule.url, parsedParamsMap);
      }
      if (rule.type === RuleType.ADVANCED) {
        const parsedParamsMap = parseAdvancedParams(
          typedCommand,
          rule.command,
          datasets
        );
        newURL = substituteParamsInAdvancedRule(rule.url, parsedParamsMap);
      }
      return false;
    }
    return true;
  });

  chrome.tabs.update({ url: newURL });
});

chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({
    url: chrome.runtime.getURL('index.html'),
  });
});
