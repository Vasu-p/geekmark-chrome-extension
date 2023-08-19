import { get_closest_match } from './string-utils.js';
import { RuleType } from '../constants.js';

export const paramRegex = /{{(.*?)}}/g;
export const bracesRegex = /{{|}}/g;

export function matches(typedCommand, ruleCommand) {
  const ruleRegex = generateRuleRegex(ruleCommand);
  if (!ruleRegex) {
    return false;
  }
  return ruleRegex.test(typedCommand);
}

export function generateURL(typedCommand, rule, datasets) {
  if (rule.type === RuleType.SIMPLE) {
    const parsedParamsMap = parseSimpleParams(typedCommand, rule.command);
    return substituteParamsInSimpleRule(rule.url, parsedParamsMap);
  }
  if (rule.type === RuleType.ADVANCED) {
    const parsedParamsMap = parseAdvancedParams(
      typedCommand,
      rule.command,
      datasets
    );
    return substituteParamsInAdvancedRule(rule.url, parsedParamsMap);
  }
  return `https://www.google.com`;
}

function parseSimpleParams(typedCommand, ruleCommand) {
  const parsedParams = {};
  const params = ruleCommand.match(paramRegex);
  if (!params) return parsedParams;

  // split by space and ignore first element
  const typedParamValues = typedCommand.split(' ').slice(1);

  params.forEach((param, index) => {
    const typedParamValue = typedParamValues[index];
    parsedParams[param] = {
      param: param,
      type: 'simple',
      substituteValue: typedParamValue,
    };
  });

  return parsedParams;
}

function parseAdvancedParams(typedCommand, ruleCommand, datasets) {
  const parsedParams = {};
  const params = ruleCommand.match(paramRegex);
  if (!params) return parsedParams;

  const typedParamValues = typedCommand.split(' ').slice(1);

  params.forEach((param, index) => {
    const typedParamValue = typedParamValues[index];
    const enrichedParam = enrichParam(param);
    parsedParams[enrichedParam.paramWithoutBraces] = {
      param: enrichedParam,
      type: 'advanced',
      substituteValue: getEffectiveParamValue(
        typedParamValue,
        enrichedParam,
        datasets
      ),
    };
  });

  return parsedParams;
}

function substituteParamsInSimpleRule(ruleUrl, parsedParamsMap) {
  const params = ruleUrl.match(paramRegex);
  if (!params) return ruleUrl;
  return params.reduce((acc, param) => {
    const parsedParam = parsedParamsMap[param];
    return acc.replace(param, parsedParam.substituteValue);
  }, ruleUrl);
}

function substituteParamsInAdvancedRule(ruleUrl, parsedParamsMap) {
  const params = ruleUrl.match(paramRegex);
  if (!params) return ruleUrl;
  return params.reduce((acc, param) => {
    const enrichedURLParam = enrichParam(param);
    const parsedCommandParam =
      parsedParamsMap[enrichedURLParam.paramWithoutBraces];
    return acc.replace(
      param,
      getEffectiveParamSubstituteValue(parsedCommandParam, enrichedURLParam)
    );
  }, ruleUrl);
}

function getEffectiveParamValue(typedParamValue, enrichedParam, datasets) {
  const foundDataset = datasets.find(
    (dataset) => dataset.shortName === enrichedParam.paramWithoutBraces
  );
  // simple param
  if (!foundDataset) return typedParamValue;
  // dataset param for list of string dataset
  if (typeof foundDataset.values[0] === 'string') {
    return get_closest_match(
      typedParamValue,
      foundDataset.values,
      (record) => record
    );
  }
  // backward compatibility for dataset param with .name objects

  if (!enrichedParam.isNestedParam && foundDataset.values[0].name) {
    return get_closest_match(
      typedParamValue,
      foundDataset.values,
      (record) => record.name
    ).name;
  }
  // dataset param with nested param
  return get_closest_match(
    typedParamValue,
    foundDataset.values,
    (record) => record[enrichedParam.accessor]
  );
}

function getEffectiveParamSubstituteValue(
  parsedCommandParam,
  enrichedURLParam
) {
  if (parsedCommandParam.type === 'simple')
    return parsedCommandParam.substituteValue;
  if (typeof parsedCommandParam.substituteValue === 'string')
    return parsedCommandParam.substituteValue;

  return parsedCommandParam.substituteValue[enrichedURLParam.accessor];
}

function enrichParam(param) {
  const paramWithoutBraces = param.replace(bracesRegex, '');
  const isNestedParam = paramWithoutBraces.includes('.');
  const accessor = isNestedParam ? paramWithoutBraces.split('.')[1] : undefined;

  return {
    param,
    paramWithoutBraces: isNestedParam
      ? paramWithoutBraces.split('.')[0]
      : paramWithoutBraces,
    accessor: accessor,
    isNestedParam: isNestedParam,
  };
}

function generateRuleRegex(str) {
  const found = str.match(paramRegex);
  if (!found) return undefined;
  const regexString = found.reduce((acc, foundParam) => {
    return acc.replace(foundParam, `[a-zA-Z-0-9]+`);
  }, `^${str}$`);

  return new RegExp(regexString, 'g');
}
