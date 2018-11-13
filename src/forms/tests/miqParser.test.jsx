import miqParse from '../schema-parser/miqParser';
import inputJSON from './miq-parser-files/input';
import outputJSON, { defaultValues } from './miq-parser-files/output';
import { neededAttributes, componentMap } from '../schema-parser/constants';

describe('miqParser', () => {
  it('Should parse correctly schema', () => {
    const output = miqParse(inputJSON, neededAttributes, componentMap);
    expect(output.schema).toEqual(outputJSON);
  });

  it('Should parse correctly defaultValues', () => {
    const output = miqParse(inputJSON, neededAttributes, componentMap);
    expect(output.defaultValues).toEqual(defaultValues);
  });
});
