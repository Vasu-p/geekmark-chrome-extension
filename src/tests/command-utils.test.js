import {
  generateUrlForSimpleRule,
  matches,
} from '../../public/utils/command-utils';

describe('generateUrlWithParameter', () => {
  it.each([
    [
      'abc def',
      { command: 'abc {{param}}', url: 'https://{{param}}' },
      'https://def',
    ],
    [
      'abcdef',
      { command: 'abc{{param}}', url: 'https://{{param}}' },
      'https://def',
    ],
    // ['abcdefxyz', { command: 'abc{{param}}xyz', url: 'https://{{param}}' }, 'https://def'], // doesnt work as of now
  ])('Works', (typedCommand, rule, expected) => {
    expect(generateUrlForSimpleRule(typedCommand, rule)).toEqual(expected);
  });
});

describe('matches', () => {
  it.each([
    ['abc def', 'abc {{param}}', true],
    ['abcdef', 'abc{{param}}', true],
    ['defabc', 'abc{{param}}', false],
    ['abcdef', 'dac{{param}}', false],
    ['ab typedCommand', 'ab {{par}}', true],
    ['abcd typedCommand', 'ab {{par}}', false],
  ])('Works for %s', (typedCommand, ruleCommand, expected) => {
    expect(matches(typedCommand, ruleCommand)).toBe(expected);
  });
});
