import { findIcons } from '../icon-picker-helper';

describe('FindIcons test', () => {
  let styleTag;

  beforeAll(() => {
    styleTag = document.createElement('style');
    styleTag.innerHTML = `
      .test-family-crosshairs::before {
        content: "+";
      }
      .test-family-foo::before {
        content: "+";
      }
      .test-family-foo {}
      .should-not-be-picked {}`;
    document.head.appendChild(styleTag);
  });

  afterAll(() => {
    document.removeChild(styleTag);
  });

  it('finds icons', () => {
    const icons = findIcons('test-family');
    expect(icons).toEqual([['test-family-crosshairs', 'test-family-foo']]);
  });
});
