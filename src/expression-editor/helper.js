export const trimInput = (input, caretPosition) => {
  let currentExp = inputText.slice(0,caretPosition)+"<<caret_position>>";
  // const leftIndex = Math.max(currentExp.lastIndexOf('AND'), currentExp.lastIndexOf('OR'), 0);
  // const rightIndex = [inputText.indexOf('AND', caretPosition-3), inputText.indexOf('OR', caretPosition-2)].reduce((a,b) => b > 0 ? (a < b ? a : b) : a, inputText.length-1);
  return currentExp.slice(leftIndex).replace(/AND|OR/,'');

}
