import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { TextualSummary } from '../index';
import { summary1 } from '../data/textual_summary';

describe('TextualSummary', () => {
  it('renders just fine', () => {
    const group = shallow(<TextualSummary summary={summary1} onClick={() => null} />);
    expect(toJson(group)).toMatchSnapshot();
  });
});
