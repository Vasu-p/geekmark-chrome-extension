import {
  generateUrlForSimpleRule,
  matches,
  generateUrlForAdvancedRuleWithNestedParam,
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
    ['command ab cd ef', 'command {{p1}} {{par2}} {{param3}}', true],
    ['command ab cd ef', 'comman {{p1}} {{par2}} {{param3}}', false],
    ['command ab cd ef', 'command {{p1}} {{par2.x}} {{param3.y}}', true],
    ['command ab cd ef', 'comman {{p1}} {{par2}} {{param3}}', false],
  ])('Works for %s', (typedCommand, ruleCommand, expected) => {
    expect(matches(typedCommand, ruleCommand)).toBe(expected);
  });
});

describe('generateUrlForAdvancedRuleWithNestedParam', () => {
  it.each([
    [
      'comm ab',
      {
        command: 'comm {{dataset.x}}',
        url: 'https://site/{{dataset.x}}/{{dataset.y}}',
      },
      {
        shortName: 'dataset',
        values: [
          { x: 'abc', y: 'def1' },
          { x: 'def', y: 'def2' },
        ],
      },
      'https://site/abc/def1',
    ],
  ])(`Works for %s`, (typedCommand, rule, dataset, expected) => {
    expect(
      generateUrlForAdvancedRuleWithNestedParam(typedCommand, rule, dataset)
    ).toEqual(expected);
  });
});
