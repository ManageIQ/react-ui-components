import _ from 'lodash';

/**
 * @description returns copy of an array of objects. Can modify items with modifier function
 * @param {Array} array array of objects that should be duplicated
 * @param {Function} itemModifier function that mutates each item in array. Must return object.
 * @return {Array} copy of input array.
 */
export const duplicateArray = (array, itemModifier = () => ({})) =>
  array.map(item => ({
    ...item,
    ...itemModifier(item),
  }));

/**
 * @param {string} imagePath source path to the image
 * @returns {Image}
 */
export const loadImage = (imagePath) => {
  const image = new Image(60, 60);
  image.src = imagePath;
  return image;
};

/**
 * @description Creates an icon unicode character from css rule. This is required for
 * older browsers like IE11 to correctly render fonticons into the html canvas.
 * @param {string} fontIcon css selector of font-icon
 * @param {Object} cssRules set of css rules containing the css definition of icon
 * @returns {(string|undefined)} unicode for given font-icon
 */
export const findIconUnicode = (fontIcon, cssRules) => {
  let rule;
  const className = fontIcon.substring(fontIcon.indexOf(' ') + 1);
  if (cssRules) {
    rule = _.find(cssRules, r => r.selectorText && r.selectorText.indexOf(`${className}::before`) !== -1);
  }
  return rule ? rule.style.content : undefined;
};

/**
 * @description creates font-icon actual content character that is later rendered into html canvas.
 * @param {string} fontIcon css class of the icon
 * @returns {string} icon content character
 */
export const createIconChar = (fontIcon) => {
  const tmp = document.createElement('i');
  document.body.appendChild(tmp);
  tmp.className = `hidden ${fontIcon}`;
  const char = window.getComputedStyle(tmp, ':before').content;
  document.body.removeChild(tmp);
  return char.replace(/'|"/g, '');
};
