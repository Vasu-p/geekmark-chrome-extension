import { matches } from '../../public/utils/command-utils';

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
