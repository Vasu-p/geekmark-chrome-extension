/*global chrome*/
// remember: import using file.js and not just file. otherwise it will thorw error.
import {
  parse_github_command,
  get_closest_repository,
  get_repo_githuburl,
  get_jenkins_url,
  parse_devportal_command,
  get_closest_environment,
} from './utils/domain-utils.js';
import { matches, generateUrlWithParameter } from './utils/command-utils.js';

chrome.omnibox.onInputEntered.addListener(async (text) => {
  // get base urls from storage
  const { baseUrls } = await chrome.storage.local.get(['baseUrls']);
  const jiraBaseUrl = baseUrls.jiraBaseUrl;
  const jiraBoardUrl = baseUrls.jiraBoardUrl;
  const jiraMyBoardUrl = baseUrls.jiraMyBoardUrl;
  const jiraBacklogUrl = baseUrls.jiraBacklogUrl;

  var newURL = null;

  // jira <num>
  // jira board
  // jira search term
  if (text.startsWith('jira')) {
    var rest = text.substr(4).trim();

    switch (true) {
      case /^[0-9]+$/.test(rest):
        newURL = `${jiraBaseUrl}/browse/ITCM-${rest}`;
        break;

      case /^board/.test(rest):
        newURL = jiraBoardUrl;
        break;

      case /^myboard/.test(rest):
        newURL = jiraMyBoardUrl;
        break;

      case /^backlog/.test(rest):
        newURL = jiraBacklogUrl;
        break;

      default:
        newURL = `${jiraBaseUrl}/issues/?jql=text%20~%20%22${encodeURIComponent(
          rest
        )}%22`;
        break;
    }
  }

  if (text.startsWith('gh')) {
    var [command, search_str] = parse_github_command(text);

    switch (command) {
      case 'prs':
        var repo = get_closest_repository(search_str);
        var repo_base_url = get_repo_githuburl(repo);
        newURL = `${repo_base_url}/pulls`;
        break;

      case 'my_prs':
        var repo = get_closest_repository(search_str);
        var repo_base_url = get_repo_githuburl(repo);
        newURL = `${repo_base_url}/pulls/@me`;
        break;

      case 'develop_commits':
        var repo = get_closest_repository(search_str);
        var repo_base_url = get_repo_githuburl(repo);
        newURL = `${repo_base_url}/commits/develop`;
        break;

      case 'wdf':
        newURL = 'https://github.wdf.sap.corp/Eureka';
        break;
      case 'tools':
        newURL = 'https://github.tools.sap/CIC';
        break;

      case 'home':
        var repo = get_closest_repository(search_str);
        var repo_base_url = get_repo_githuburl(repo);
        newURL = repo_base_url;
        break;

      default:
        newURL = 'https://google.com';
        break;
    }
  }

  if (text.startsWith('jk')) {
    var rest = text.substr(2).trim();
    var repo = get_closest_repository(rest);
    newURL = get_jenkins_url(baseUrls.jenkinsBaseUrl, repo);
  }

  if (text.startsWith('dp')) {
    const devPortalBaseUrl = baseUrls.devPortalBaseUrl;
    var [command, search_str] = parse_devportal_command(text);
    switch (command) {
      case 'ff':
        var environment = get_closest_environment(search_str);
        newURL = `${devPortalBaseUrl}/eureka/kubernetes/${environment.cluster}/${environment.namespace}/feature`;
        break;
      case 'deploy':
        var environment = get_closest_environment(search_str);
        newURL = `${devPortalBaseUrl}/eureka/kubernetes/${environment.cluster}/${environment.namespace}/isLocked/ZmFsc2U=`;
        break;
      case 'argo':
        var environment = get_closest_environment(search_str);
        newURL = `${baseUrls.argoBaseUrl}/applications?cluster=${environment.cluster}&namespace=${environment.namespace}`;
        break;
      default:
        newURL = devPortalBaseUrl;
        break;
    }
  }

  // handle custom rules only if we have not encountered any specific rule
  if (newURL === null) {
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
  }

  chrome.tabs.update({ url: newURL });
});

chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({
    url: chrome.runtime.getURL('index.html'),
  });
});
