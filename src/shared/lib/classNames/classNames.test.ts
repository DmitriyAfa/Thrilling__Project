import { classNames } from './classNames';

describe('classNames', () => {
  test('with only first param', () => {
    expect(classNames('someClass')).toBe('someClass');
  });
  test('with additional class', () => {
    const expected = 'someClass cls1 cls2';
    expect(classNames('someClass', ['cls1', 'cls2'])).toBe(expected);
  });
  test('with mods', () => {
    const expected = 'someClass cls1 cls2 hovered scrollable';
    expect(classNames(
      'someClass',
      ['cls1', 'cls2'],
      { hovered: true, scrollable: true },
    ))
      .toBe(expected);
  });
  test('with mods false', () => {
    const expected = 'someClass cls1 cls2 hovered';
    expect(classNames(
      'someClass',
      ['cls1', 'cls2'],
      { hovered: true, scrollable: false },
    ))
      .toBe(expected);
  });
  test('with mods undefined', () => {
    const expected = 'someClass cls1 cls2 hovered';
    expect(classNames(
      'someClass',
      ['cls1', 'cls2'],
      { hovered: true, scrollable: false },
    ))
      .toBe(expected);
  });
});
