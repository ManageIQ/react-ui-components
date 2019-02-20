import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import GenericPreviewTable from '../genericPreviewTable';

describe('RbacUsersTable component', () => {
  let columns = [];
  let rows = [];
  let rowClick;
  let rowSelect;
  let initialProps = {};
  beforeEach(() => {
    rowClick = jest.fn();
    rowSelect = jest.fn();
    columns = [{
      property: 'fullname',
      label: 'Full Name',
    }, {
      property: 'username',
      label: 'Username',
    }, {
      property: 'email',
      label: 'E-mail',
    }, {
      property: 'currentgroup',
      label: 'Current Group',
    }, {
      property: 'role',
      label: 'Role',
    }, {
      property: 'lastlogon',
      label: 'Last Logon',
    }, {
      property: 'lastlogoff',
      label: 'Last Logoff',
    }];

    rows = [
      {
        id: 100,
        fullname: 'Adam the first',
        username: 'Admin',
        email: 'email@neco.com',
        currentgroup: 'Some group',
        role: 'Admin role',
        lastlogon: '06/25/18 06:58:14 UTC',
        lastlogoff: '06/30/18 06:58:14 UTC',
      },
      {
        id: 101,
        fullname: 'Marge the middle',
        username: 'La transparenza della qualita',
        email: 'email@jandak.com',
        currentgroup: 'Mediocre group',
        role: 'Shot role',
        lastlogon: '01/25/18 06:58:14 UTC',
        lastlogoff: '06/30/18 06:58:14 UTC',
      },
      {
        id: 102,
        fullname: 'Zlatko the last',
        username: 'Peligro',
        email: 'email@jandak.com',
        currentgroup: 'Super group',
        role: 'Shot role',
        lastlogon: '08/25/18 06:58:14 UTC',
        lastlogoff: '010/30/18 06:58:14 UTC',
      },
    ];
    initialProps = {
      rows,
      columns,
      rowClick,
      rowSelect,
      showIcon: true,
      showSelect: true,
      icon: {
        type: 'pf',
        name: 'user',
      },
    };
  });

  it('Should render correctly', () => {
    const tree = shallow(<GenericPreviewTable {...initialProps} />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('Should return clicked row data', () => {
    const cellClick = jest.fn();
    const wrapper = shallow(<GenericPreviewTable {...initialProps} rowClick={cellClick} />);
    const row = wrapper.find('tr').at(1);
    const expectedPayload = {
      currentgroup: 'Some group',
      email: 'email@neco.com',
      fullname: 'Adam the first',
      id: 100,
      lastlogoff: '06/30/18 06:58:14 UTC',
      lastlogon: '06/25/18 06:58:14 UTC',
      role: 'Admin role',
      username: 'Admin',
      selected: true,
    };

    let cell = row.find('td').at(0);
    cell.simulate('click');
    expect(cellClick).not.toHaveBeenCalled();
    expect(wrapper.instance().state.rows[0].selected).toBeTruthy();

    cell = row.find('td').at(1);
    cell.simulate('click');
    expect(cellClick).toHaveBeenCalledWith(expectedPayload);

    cell = row.find('td').at(0);
    cell.simulate('click');
    expect(wrapper.instance().state.rows[0].selected).toBeFalsy();
    expect(cellClick).toHaveBeenCalledTimes(1);
  });

  it('Should sort data correctly', () => {
    const wrapper = shallow(<GenericPreviewTable {...initialProps} />);
    const header = wrapper.find('tr').first();
    const originalData = [...rows];
    let cell = header.find('TableHeading').at(0);

    // check not sortable headers
    cell.simulate('click');
    expect(wrapper.instance().state.rows[0]).toBe(originalData[0]);
    cell = header.find('TableHeading').at(1);
    cell.simulate('click');
    expect(wrapper.instance().state.rows[0]).toBe(originalData[0]);

    // check sortable headers
    cell = header.find('TableHeading').at(2);
    cell.simulate('click');
    cell.simulate('click');
    expect(wrapper.instance().state.rows[0]).toBe(originalData[2]);
  });
});
