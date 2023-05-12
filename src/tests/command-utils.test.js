import {
  generateUrlWithParameter,
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
  ])('Works', (text, rule, expected) => {
    expect(generateUrlWithParameter(text, rule)).toEqual(expected);
  });
});

describe.only('matches', () => {
  it.each([
    ['abc def', 'abc {{param}}', true],
    ['abcdef', 'abc{{param}}', true],
    ['defabc', 'abc{{param}}', false],
    ['abcdef', 'dac{{param}}', false],
    ['ab text', 'ab {{par}}', true],
    ['abcd text', 'ab {{par}}', false],
  ])('Works for %s', (text, ruleCommand, expected) => {
    expect(matches(text, ruleCommand)).toBe(expected);
  });
});
