import { get_closest_match } from './string-utils.js';

export const paramRegex = /{{(.*?)}}/g;
export const bracesRegex = /{{|}}/g;

export function matches(typedCommand, ruleCommand) {
  const ruleRegex = generateRuleRegex(ruleCommand);
  if (!ruleRegex) {
    return false;
  }
  return ruleRegex.test(typedCommand);
}

export function generateUrlForSimpleRule(typedCommand, rule) {
  // typedCommand "abcxyz def"
  const command = rule.command; // "abcxyz {param}"
  const url = rule.url; // "replacement {param}""
  const param = rule.command.match(paramRegex)[0];

  // find position of param in command
  const commandParamPosition = command.indexOf(param);
  // find string at above position in typedCommand
  const paramValue = typedCommand.substr(commandParamPosition);
  console.log(command, url, param, paramValue);
  // replace url param with found string
  return url.replace(param, paramValue);
}

export function generateUrlForAdvancedRule(typedCommand, rule, dataset) {
  // rule { command: '', url: '', type: 'advanced', dataset: 'repositories'(e.g.) }
  // in every rule there is only 1 param allowed
  // in advance rule that parameter is associated with a dataset object
  // advance rule doesnt substitute the user typed param directly in rule url (as simple rule does)
  // in advance rule, we find the closest string in dataset which matches the user typed param and substitute that

  const command = rule.command;
  const commandParam = getCommandParam(command); // "{{param}}"

  if (commandParam.includes('.')) {
    return generateUrlForAdvancedRuleWithNestedParam(
      typedCommand,
      rule,
      dataset
    );
  } else {
    return generateUrlForAdvancedRuleWithSimpleParam(
      typedCommand,
      rule,
      dataset
    );
  }
}

export function getMatchingDataset(datasets, rule) {
  const commandParam = rule.command.match(paramRegex)[0];
  const commandParamWithoutBraces = commandParam.replace(bracesRegex, '');

  const datasetFromRule = isRuleWithNestedParam(rule)
    ? commandParamWithoutBraces.split('.')[0]
    : commandParamWithoutBraces;

  return datasets.filter((dataset) => dataset.shortName === datasetFromRule)[0];
}

function generateRuleRegex(str) {
  const found = str.match(paramRegex);
  if (!found) return undefined;
  const regexString = found.reduce((acc, foundParam) => {
    return acc.replace(foundParam, `[a-zA-Z-0-9]+`);
  }, str);

  return new RegExp(regexString, 'g');
}

function getCommandParam(command) {
  const found = command.match(paramRegex);
  return found ? found[0] : undefined;
}

function isRuleWithNestedParam(rule) {
  const commandParam = getCommandParam(rule.command);
  return commandParam.includes('.');
}

export function generateUrlForAdvancedRuleWithNestedParam(
  typedCommand,
  rule,
  dataset
) {
  const commandParam = getCommandParam(rule.command); // {{repo.name}}
  const commandParamWithoutBraces = commandParam.replace(bracesRegex, ''); // repo.name
  const commandParamAccessor = commandParamWithoutBraces.split('.')[1]; // 'name'
  // find position of param in command
  const commandParamPosition = rule.command.indexOf(commandParam); // index of {{repo.name}} in command
  // find string at above position in typedCommand
  const commandParamValue = typedCommand.substr(commandParamPosition).trim(); // "name" value to fuzzy search for in dataset
  // e.g. rule url with more than 1 params = "https://github.com/repos/{{repo.owner}}/{{repo.name}}/issues"

  const foundDatasetRecord = get_closest_match(
    commandParamValue,
    dataset.values,
    (record) => record[commandParamAccessor]
  ); // { name: 'abc', owner: 'def' }

  // find all params in rule url
  const urlParams = rule.url.match(paramRegex); // ['{{repo.owner}}', '{{repo.name}}']
  // replace all params in rule url with fuzzy searched values
  const url = urlParams.reduce((acc, param) => {
    const paramWithoutBraces = param.replace(bracesRegex, ''); // 'repo.owner'
    const paramAccessor = paramWithoutBraces.split('.')[1]; // 'owner'
    const paramValue = foundDatasetRecord[paramAccessor]; // 'def'
    return acc.replace(param, paramValue);
  }, rule.url);

  return url;
}

function generateUrlForAdvancedRuleWithSimpleParam(
  typedCommand, // typedCommand "abcxyz def"
  rule,
  dataset // { values: ['abc', 'def', 'ghi'], shortName: 'repo', name: 'repositories' }
) {
  const param = getCommandParam(rule.command);
  // find position of param in command
  const commandParamPosition = rule.command.indexOf(param);
  // find string at above position in typedCommand
  const paramValue = typedCommand.substr(commandParamPosition).trim();
  // replace url param with found string
  const toReplaceValueFromDataset =
    typeof dataset.values[0] === 'string'
      ? get_closest_match(paramValue, dataset.values, (record) => record)
      : get_closest_match(paramValue, dataset.values, (record) => record.name)
          .name;

  return rule.url.replace(paramRegex, toReplaceValueFromDataset);
}
