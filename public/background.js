/*global chrome*/
// remember: import using file.js and not just file. otherwise it will thorw error.
import { matches, generateUrlWithParameter } from './utils/command-utils.js';

chrome.omnibox.onInputEntered.addListener(async (text) => {
  const newURL = null;

  const { rules } = await chrome.storage.local.get(['rules']);
  rules.every((rule) => {
    if (rule.command === text) {
      newURL = rule.url;
      return false;
    }
    if (matches(text, rule.command)) {
      newURL = generateUrlWithParameter(text, rule);
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
