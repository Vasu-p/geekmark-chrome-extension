import { RuleType } from '../constants.js';
import { get_closest_match } from './string-utils.js';

// todo remove eventually
import { datasets } from '../datasets';

export const paramRegex = /{{(.*?)}}/g;

export function matches(text, ruleCommand) {
  const strippedRule = stripParameter(ruleCommand);
  return strippedRule && text.startsWith(strippedRule);
}

/**
 *
 * @param {*} text "abcxyz def"
 * @param {*} rule "replacement {param}"
 * @returns "replacement def"
 */
export function generateUrlWithParameter(text, rule) {
  if (rule.type === RuleType.SIMPLE) {
    return generateUrlForSimpleRule(text, rule);
  }
  return 'https://google.com'; // just dummy
}

function generateUrlForSimpleRule(text, rule) {
  // text "abcxyz def"
  const command = rule.command; // "abcxyz {param}"
  const url = rule.url; // "replacement {param}""
  const param = rule.command.match(paramRegex)[0];

  // find position of param in command
  const commandParamPosition = command.indexOf(param);
  // find string at above position in text
  const paramValue = text.substr(commandParamPosition, param.length);
  // replace url param with found string
  return url.replace(paramRegex, paramValue);
}

function generateUrlForAdvancedRule(text, rule) {
  // rule { command: '', url: '', type: 'advanced', dataset: 'repositories'(e.g.) }
  // in every rule there is only 1 param allowed
  // in advance rule that parameter is associated with a dataset object
  // advance rule doesnt substitute the user typed param directly in rule url (as simple rule does)
  // in advance rule, we find the closest string in dataset which matches the user typed param and substitute that

  // text "abcxyz def"
  const command = rule.command; // "abcxyz {param}"
  const url = rule.url; // "replacement {param}""
  const dataset = rule.dataset; // repositories
  const param = rule.command.match(paramRegex)[0];

  // find position of param in command
  const commandParamPosition = command.indexOf(param);
  // find string at above position in text
  const paramValue = text.substr(commandParamPosition, param.length);
  // replace url param with found string
  return url.replace(
    paramRegex,
    get_closest_match(paramValue, datasets[dataset], (recored) => recored.name) // hardcode to look for name (todo take input form user)
      .name
  );
}

/**
 * strips parameter i.e. {{abc}} from end of string
 *
 * @param {*} str
 * @returns str with parameters stripped
 */
function stripParameter(str) {
  const found = str.match(paramRegex);
  return found ? str.replace(found[0], '').trim() : undefined;
}
