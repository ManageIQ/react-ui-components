import { translate, sprintf } from '../';

describe('Should provide correct translation functions', () => {
  afterEach(() => {
    window.__ = undefined;
    window.sprintf = undefined;
  });

  it('Translate should not translate string ', () => {
    const foo = 'Some string';
    expect(translate(foo)).toEqual(foo);
  });

  it('Translate should provide string transformation if __ fuction is on window', () => {
    const foo = 'foo';
    const expectedResult = 'foo and some transformation';
    window.__ = string => `${string} and some transformation`;
    expect(window.__(foo)).toEqual(expectedResult);
    window.__ = undefined;
  });

  it('Sprintf should not transform mask and string', () => {
    const mask = 'Some mask %d';
    const parameters = 10;
    expect(sprintf(mask, parameters)).toEqual(mask);
    expect(sprintf(translate(mask), 'foo', 'bar')).toEqual(mask);
  });

  it('Sprintf should transform string if sprintf function is on window', () => {
    const mask = 'Some mask %d';
    const parameter = 10;
    const expectedResult = 'Some mask 10';
    window.sprintf = (stringMaks, stringParameter) => stringMaks.replace('%d', stringParameter);
    expect(sprintf(mask, parameter)).toEqual(expectedResult);
    window.sprintf = undefined;
  });
});
