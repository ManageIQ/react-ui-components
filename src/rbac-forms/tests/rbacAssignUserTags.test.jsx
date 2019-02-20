import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';
import { RbacAssignCompanyTags } from '../';
import { usersTableColumns } from '../stories/data';
import { users, categories } from '../stories/usersData';

describe('Rbac assign user tags component', () => {
  const initialProps = {};
  let mockInitialLoad;
  let mockLoadCategoryEntries;
  const mockLoadCategoryEntry = () => new Promise(resolve => resolve([{
    value: 1,
    label: 'Label 1',
  }, {
    value: 2,
    label: 'Label 2',
  }, {
    value: 3,
    label: 'Label 3',
  }, {
    value: 10000000000092,
    label: 'lazy loaded',
  }, {
    value: 10000000000190,
    label: 'lazy loaded 2',
  }]));
  const mockLoadMultipleEntries = () => new Promise(resolve => resolve({
    10000000000085: [{
      value: 10000000000092,
      label: 'lazy loaded',
    }],
    10000000000140: [{
      value: 10000000000190,
      label: 'lazy loaded 2',
    }],
  }));
  beforeEach(() => {
    initialProps.users = users.map(user => ({ ...user, current_group: 'foo', role: 'bar' }));
    initialProps.columns = usersTableColumns;
    initialProps.categories = categories.map(category => ({ ...category, label: category.description, value: category.id }));
    initialProps.loadCategoryEntry = mockLoadCategoryEntry;
    initialProps.loadMultipleEntries = mockLoadMultipleEntries;
    initialProps.handleCancel = jest.fn();
    initialProps.handleSave = jest.fn();
    mockInitialLoad = jest.spyOn(initialProps, 'loadMultipleEntries').mockResolvedValue({
      10000000000085: [{
        value: 10000000000092,
        label: 'lazy loaded',
      }],
      10000000000140: [{
        value: 10000000000190,
        label: 'lazy loaded 2',
      }],
    });
    mockLoadCategoryEntries = jest.spyOn(initialProps, 'loadCategoryEntry').mockResolvedValue([{
      value: 1,
      label: 'Label 1',
    }, {
      value: 2,
      label: 'Label 2',
    }, {
      value: 3,
      label: 'Label 3',
    }, {
      value: 10000000000092,
      label: 'lazy loaded',
    }, {
      value: 10000000000190,
      label: 'lazy loaded 2',
    }]);
  });

  it('should not call save function', () => {
    const handleSave = jest.fn();
    const wrapper = shallow(<RbacAssignCompanyTags {...initialProps} handleSave={handleSave} />);
    expect.assertions(1);
    return mockInitialLoad()
      .then(() => {
        wrapper.setState({ isLoaded: true });
        wrapper.update();
        wrapper.find('button#user-submit').simulate('click');
        expect(handleSave).not.toHaveBeenCalled();
      });
  });

  it('should call save function', () => {
    const handleSave = jest.fn();
    const wrapper = shallow(<RbacAssignCompanyTags
      {...initialProps}
      users={[{
        ...users[0],
        currentgroup: 'foo',
        role: 'bar',
        tags: [],
      }]}
      handleSave={handleSave}
    />);
    expect.assertions(1);
    return mockInitialLoad()
      .then(() => {
        wrapper.setState({
          isLoaded: true,
          categoryEntries: {
            10000000000085: [{
              value: 1,
              label: 'Label 1',
            }, {
              value: 2,
              label: 'Label 2',
            }, {
              value: 3,
              label: 'Label 3',
            }, {
              value: 10000000000092,
              label: 'lazy loaded',
            }],
          },
          selectedEntries: { 10000000000085: { value: 1, label: 'Label 1' } },
        });
        wrapper.update();
        wrapper.find('button#user-submit').simulate('click');
        expect(handleSave).toHaveBeenCalled();
      });
  });

  it('should call remove entry', () => {
    const wrapper = shallow(<RbacAssignCompanyTags
      {...initialProps}
      users={[{
        ...users[0],
        currentgroup: 'foo',
        role: 'bar',
        tags: [],
      }]}
    />);
    expect.assertions(1);
    return mockInitialLoad()
      .then(() => {
        wrapper.setState({
          isLoaded: true,
          categoryEntries: {
            10000000000085: [{
              value: 1,
              label: 'Label 1',
            }, {
              value: 2,
              label: 'Label 2',
            }, {
              value: 3,
              label: 'Label 3',
            }, {
              value: 10000000000092,
              label: 'lazy loaded',
            }],
          },
          selectedEntries: { 10000000000085: { value: 1, label: 'Label 1' } },
        });
        wrapper.update();
        wrapper.find(`button#remove-entry-${10000000000085}`).simulate('click');
        wrapper.update();
        expect(wrapper.state().selectedEntries).toEqual({});
      });
  });

  it('should call reset function', () => {
    const wrapper = shallow(<RbacAssignCompanyTags
      {...initialProps}
      users={[{
        ...users[0],
        currentgroup: 'foo',
        role: 'bar',
        tags: [],
      }]}
    />);
    expect.assertions(1);
    return mockInitialLoad()
      .then(() => {
        wrapper.setState({
          isLoaded: true,
          categoryEntries: {
            10000000000085: [{
              value: 1,
              label: 'Label 1',
            }, {
              value: 2,
              label: 'Label 2',
            }, {
              value: 3,
              label: 'Label 3',
            }, {
              value: 10000000000092,
              label: 'lazy loaded',
            }],
          },
          selectedEntries: { 10000000000085: { value: 1, label: 'Label 1' } },
        });
        wrapper.update();
        wrapper.find('button#user-reset').simulate('click');
        expect(wrapper.state().selectedEntries).toEqual({});
      });
  });

  it('should select new entry state', () => {
    const wrapper = shallow(<RbacAssignCompanyTags
      {...initialProps}
      users={[{
        ...users[0],
        currentgroup: 'foo',
        role: 'bar',
        tags: [],
      }]}
    />);
    wrapper.setState({
      categoryEntries: {
        10000000000085: [{
          value: 1,
          label: 'Label 1',
        }, {
          value: 2,
          label: 'Label 2',
        }, {
          value: 3,
          label: 'Label 3',
        }, {
          value: 10000000000092,
          label: 'lazy loaded',
        }],
      },
      selectedCategory: 10000000000085,
      categories: [{ value: 10000000000092, label: 'foo' }],
    });
    wrapper.instance().handleEntrySelect({ value: 10000000000092, label: 'foo' });
    expect(wrapper.state().selectedEntries).toEqual({
      10000000000085: { value: 10000000000092, label: 'foo' },
    });
  });

  it('should select new entry state', () => {
    const wrapper = shallow(<RbacAssignCompanyTags
      {...initialProps}
      users={[{
        ...users[0],
        currentgroup: 'foo',
        role: 'bar',
        tags: [],
      }]}
    />);
    wrapper.instance().handleCategorySelect({ value: 'foo', label: 'bar' });
    expect(wrapper.state().selectedCategory).toEqual('foo');
  });
});
