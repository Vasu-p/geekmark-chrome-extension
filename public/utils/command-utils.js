import { get_closest_match } from './string-utils.js';

export const paramRegex = /{{(.*?)}}/g;

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
    return generateUrlForAdvancedRuleWithNestedParam();
  } else {
    return generateUrlForAdvancedRuleWithSimpleParam(
      typedCommand,
      rule,
      dataset
    );
  }
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

function generateRuleRegex(str) {
  const found = str.match(paramRegex);

  return found
    ? new RegExp(str.replace(found[0], '[a-zA-Z-0-9]+'), 'g')
    : undefined;
}

function getCommandParam(command) {
  const found = command.match(paramRegex);
  return found ? found[0] : undefined;
}

function generateUrlForAdvancedRuleWithNestedParam(
  typedCommand,
  rule,
  dataset
) {
  const param = getCommandParam(rule.command);
  // find position of param in command
  const commandParamPosition = rule.command.indexOf(param);
  // find string at above position in typedCommand
  const paramValue = typedCommand.substr(commandParamPosition).trim();
  // replace url param with found string
  return rule.url.replace(
    paramRegex,
    get_closest_match(
      paramValue,
      dataset.values,
      (record) => record[rule.command.split('.')[1]]
    )
  );
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
  return rule.url.replace(
    paramRegex,
    get_closest_match(paramValue, dataset.values, (record) => record)
  );
}
