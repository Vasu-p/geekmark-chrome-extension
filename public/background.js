/*global chrome*/
// remember: import using file.js and not just file. otherwise it will thorw error.
import { matches, generateURL } from './utils/command-utils.js';

chrome.omnibox.onInputEntered.addListener(async (typedCommand) => {
  let newURL = null;

  let { rules } = await chrome.storage.local.get(['rules']);
  let { datasets } = await chrome.storage.local.get(['datasets']);
  rules = rules || [];
  datasets = datasets || [];

  rules.every((rule) => {
    if (rule.command === typedCommand) {
      newURL = rule.url;
      return false;
    }
    if (matches(typedCommand, rule.command)) {
      newURL = generateURL(typedCommand, rule, datasets);
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
