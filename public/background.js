/*global chrome*/
// remember: import using file.js and not just file. otherwise it will thorw error.
import { RuleType } from './constants.js';
import {
  matches,
  generateUrlForSimpleRule,
  generateUrlForAdvancedRule,
  getMatchingDataset,
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
        newURL = generateUrlForSimpleRule(typedCommand, rule);
      }
      if (rule.type === RuleType.ADVANCED) {
        const dataset = getMatchingDataset(datasets, rule);
        newURL = generateUrlForAdvancedRule(typedCommand, rule, dataset);
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
