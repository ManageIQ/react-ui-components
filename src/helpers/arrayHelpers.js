/**
 * @description Method that retuns array of common elements for each array
 * @param comp comparating function
 * @param first first array
 * @param others rest of the arrays
 * @return array of intersecting elements
 */
export const intersectionWith = (comp, first, ...others) => first.filter(a => others.every(arr => arr.some(b => comp(a, b))));
