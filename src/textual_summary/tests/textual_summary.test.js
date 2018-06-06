import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { TextualSummary } from '../index.jsx';
import { summary1 } from '../data/textual_summary';

describe('TextualSummary', () => {
  it('renders just fine', () => {
    const component = renderer.create(<TextualSummary summary={summary1} onClick={e => null} />);
    const group = component.toJSON();
    expect(group).toMatchSnapshot();
  });
});
