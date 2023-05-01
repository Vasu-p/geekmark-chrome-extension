import { RuleType } from '../constants.js';

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
