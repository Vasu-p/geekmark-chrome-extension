import { matches, generateURL } from '../../public/utils/command-utils';
import { RuleType } from '../../public/constants';

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

describe('generates correct url for simple rule type', () => {
  const datasets = [
    {
      name: 'dataset1',
      shortName: 'dataset',
      values: ['abc', 'def', 'xyz'],
    },
    {
      name: 'dataset2',
      shortName: 'dataset1',
      values: ['ghi', 'jkl', 'mno'],
    },
    {
      name: 'old',
      shortName: 'old',
      values: [{ name: 'abc' }, { name: 'def' }, { name: 'xyz' }],
    },
    {
      name: 'new1',
      shortName: 'new1',
      values: [
        { x: 'alpha', y: 'bravo' },
        { x: 'charlie', y: 'delta' },
        { x: 'echo', y: 'foxtrot' },
      ],
    },
    {
      name: 'new2',
      shortName: 'new2',
      values: [
        { x: 'golf', y: 'hotel' },
        { x: 'india', y: 'juliet' },
        { x: 'kilo', y: 'lima' },
      ],
    },
  ];

  it.each([
    [
      '1 param',
      'site def',
      {
        command: 'site {{param}}',
        url: 'https://www.{{param}}.com',
        type: RuleType.SIMPLE,
      },
      'https://www.def.com',
    ],
    [
      'multiple params',
      'site def xyz',
      {
        command: 'site {{param1}} {{param2}}',
        url: 'https://www.{{param2}}.com/{{param1}}',
        type: RuleType.SIMPLE,
      },
      'https://www.xyz.com/def',
    ],
    [
      'multiple params multi substitution',
      'site def xyz',
      {
        command: 'site {{param1}} {{param2}}',
        url: 'https://www.{{param2}}.com/{{param1}}-{{param2}}',
        type: RuleType.SIMPLE,
      },
      'https://www.xyz.com/def-xyz',
    ],
    [
      'disregards dataset',
      'site ab',
      {
        command: 'site {{dataset1}}',
        url: 'https://www.{{dataset1}}.com',
        type: RuleType.SIMPLE,
      },
      'https://www.ab.com',
    ],
    [
      'returns as is if param absent in url',
      'site ab',
      {
        command: 'site {{param}}',
        url: 'https://www.static.com',
        type: RuleType.SIMPLE,
      },
      'https://www.static.com',
    ],
  ])('Works for %s', (_, typedCommand, rule, expected) => {
    expect(generateURL(typedCommand, rule, datasets)).toBe(expected);
  });
});

describe('generates correct url for advanced rule type', () => {
  const datasets = [
    {
      name: 'dataset1',
      shortName: 'dataset1',
      values: ['abc', 'def', 'xyz'],
    },
    {
      name: 'dataset2',
      shortName: 'dataset2',
      values: ['ghi', 'jkl', 'mno'],
    },
    {
      name: 'old',
      shortName: 'old',
      values: [{ name: 'abc' }, { name: 'def' }, { name: 'xyz' }],
    },
    {
      name: 'new1',
      shortName: 'new1',
      values: [
        { x: 'alpha', y: 'bravo' },
        { x: 'charlie', y: 'delta' },
        { x: 'echo', y: 'foxtrot' },
      ],
    },
    {
      name: 'new2',
      shortName: 'new2',
      values: [
        { x: 'golf', y: 'hotel' },
        { x: 'india', y: 'juliet' },
        { x: 'kilo', y: 'lima' },
      ],
    },
  ];

  it.each([
    [
      '1 non-nested param',
      'site ac',
      {
        command: 'site {{dataset1}}',
        url: 'https://www.{{dataset1}}.com',
        type: RuleType.ADVANCED,
      },
      'https://www.abc.com',
    ],
    [
      'multiple non-nested params',
      'site ac gi',
      {
        command: 'site {{dataset1}} {{dataset2}}',
        url: 'https://www.{{dataset1}}.com/{{dataset2}}',
        type: RuleType.ADVANCED,
      },
      'https://www.abc.com/ghi',
    ],
    [
      'multiple non-nested params multi substitution',
      'site ac gi',
      {
        command: 'site {{dataset1}} {{dataset2}}',
        url: 'https://www.{{dataset1}}.com/{{dataset2}}-{{dataset1}}',
        type: RuleType.ADVANCED,
      },
      'https://www.abc.com/ghi-abc',
    ],
    [
      'backward compatibility',
      'site ac',
      {
        command: 'site {{old}}',
        url: 'https://www.{{old}}.com/',
        type: RuleType.ADVANCED,
      },
      'https://www.abc.com/',
    ],
    [
      '1 nested param',
      'site aph',
      {
        command: 'site {{new1.x}}',
        url: 'https://www.{{new1.x}}.com',
        type: RuleType.ADVANCED,
      },
      'https://www.alpha.com',
    ],
    [
      '1 nested param different substitution',
      'site aph',
      {
        command: 'site {{new1.x}}',
        url: 'https://www.{{new1.y}}.com',
        type: RuleType.ADVANCED,
      },
      'https://www.bravo.com',
    ],
    [
      'multiple nested params',
      'site cr id',
      {
        command: 'site {{new1.x}} {{new2.x}}',
        url: 'https://www.{{new1.x}}.com/{{new2.y}}',
        type: RuleType.ADVANCED,
      },
      'https://www.charlie.com/juliet',
    ],
    [
      'multiple nested params multi substitution',
      'site cr id',
      {
        command: 'site {{new1.x}} {{new2.x}}',
        url: 'https://www.{{new1.x}}.com/{{new1.x}}-{{new1.y}}-{{new2.x}}-{{new2.y}}',
        type: RuleType.ADVANCED,
      },
      'https://www.charlie.com/charlie-delta-india-juliet',
    ],
    [
      'multiple nested params use different attributes substitution',
      'site eh ia',
      {
        command: 'site {{new1.x}} {{new2.y}}',
        url: 'https://www.{{new1.x}}.com/{{new1.x}}-{{new1.y}}-{{new2.x}}-{{new2.y}}',
        type: RuleType.ADVANCED,
      },
      'https://www.echo.com/echo-foxtrot-kilo-lima',
    ],
    [
      'mix of simple and advanced params works',
      'site eh xz',
      {
        command: 'site {{new1.x}} {{dataset1}}',
        url: 'https://www.{{dataset1}}.com/{{new1.x}}-{{new1.y}}',
        type: RuleType.ADVANCED,
      },
      'https://www.xyz.com/echo-foxtrot',
    ],
    [
      'returns as is if param absent in url',
      'site ab',
      {
        command: 'site {{dataset}}',
        url: 'https://www.static.com',
        type: RuleType.ADVANCED,
      },
      'https://www.static.com',
    ],
  ])('Works for %s', (_, typedCommand, rule, expected) => {
    expect(generateURL(typedCommand, rule, datasets)).toBe(expected);
  });
});
