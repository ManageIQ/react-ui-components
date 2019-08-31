const isFontIcon = (value = {}, family) => value.selectorText && value.selectorText.indexOf(family) === 1 && value.cssText.indexOf('content:') !== -1;

export const findIcons = family =>
  Object.values(document.styleSheets)
    .map(({ cssRules }) => cssRules)
    .filter(item => !!item)
    .map(rule => (typeof rule !== 'object'
      ? rule.reduce((acc, curr, index) => ({
        ...acc,
        [index]: curr,
      }), {})
      : Object.values(rule)))
    .flat()
    .filter(value => isFontIcon(value, family))
    .map(({ selectorText }) => selectorText.split(','))
    .flat()
    .map(selectorText => selectorText.replace('.', '').replace('::before', ''))
    .reduce((acc, curr, index) => {
      const row = Math.floor(index / 12);
      if (acc[row]) {
        acc[row] = [...acc[row], curr];
      } else {
        acc[row] = [curr];
      }
      return acc;
    }, []);

