import { get_closest_match } from './string-utils.js';

export const paramRegex = /{{(.*?)}}/g;

export function matches(text, ruleCommand) {
  const ruleRegex = generateRuleRegex(ruleCommand);
  if (!ruleRegex) {
    return false;
  }
  console.log(ruleRegex, text, ruleRegex.test(text));
  return ruleRegex.test(text);
}

export function generateUrlForSimpleRule(text, rule) {
  // text "abcxyz def"
  const command = rule.command; // "abcxyz {param}"
  const url = rule.url; // "replacement {param}""
  const param = rule.command.match(paramRegex)[0];

  // find position of param in command
  const commandParamPosition = command.indexOf(param);
  // find string at above position in text
  const paramValue = text.substr(commandParamPosition);
  console.log(command, url, param, paramValue);
  // replace url param with found string
  return url.replace(param, paramValue);
}

export function generateUrlForAdvancedRule(text, rule, dataset) {
  // rule { command: '', url: '', type: 'advanced', dataset: 'repositories'(e.g.) }
  // in every rule there is only 1 param allowed
  // in advance rule that parameter is associated with a dataset object
  // advance rule doesnt substitute the user typed param directly in rule url (as simple rule does)
  // in advance rule, we find the closest string in dataset which matches the user typed param and substitute that

  // text "abcxyz def"
  const command = rule.command; // "abcxyz {param}"
  const url = rule.url; // "replacement {param}""
  const param = rule.command.match(paramRegex)[0];

  // find position of param in command
  const commandParamPosition = command.indexOf(param);
  // find string at above position in text
  const paramValue = text.substr(commandParamPosition, param.length);
  // replace url param with found string
  return url.replace(
    paramRegex,
    get_closest_match(paramValue, dataset.values, (record) => record.name).name // hardcode to look for name (todo take input form user)
  );
}

export function getMatchingDataset(datasets, rule) {
  const param = rule.command.match(paramRegex)[0];
  const paramWithoutBraces = param.replaceAll('{', '').replaceAll('}', '');

  console.log(
    'param',
    param,
    'param without braces',
    paramWithoutBraces,
    'rule',
    rule
  );

  return datasets.filter(
    (dataset) => dataset.shortName === paramWithoutBraces
  )[0];
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

function generateRuleRegex(str) {
  const found = str.match(paramRegex);

  return found
    ? new RegExp(str.replace(found[0], '[a-zA-Z-0-9]+'), 'g')
    : undefined;
}
