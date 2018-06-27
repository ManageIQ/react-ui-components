import { action } from '@storybook/addon-actions';

export const groups = [
  {
    value: 1,
    label: 'Hope',
  },
  {
    value: 2,
    label: 'Christa',
  },
  {
    value: 3,
    label: 'Tania',
  },
  {
    value: 4,
    label: 'Mcintyre',
  },
  {
    value: 5,
    label: 'Tonya',
  },
  {
    value: 6,
    label: 'Marcie',
  },
  {
    value: 7,
    label: 'Cara',
  },
  {
    value: 8,
    label: 'Becker',
  },
  {
    value: 9,
    label: 'Foley',
  },
  {
    value: 10,
    label: 'Perkins',
  },
];

export const editedUser = {
  name: 'Users full name',
  userid: 'admin jiny',
  chosen_group: [5, 7],
};

export const usersTableColumns = [{
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

export const usersTableRows = [
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

export const user = {
  name: 'Administrator',
  userid: 'Admin',
  email: 'mail@mail.com',
  current_group: {
    label: 'EvmGroup-super_administrator',
    onClick: () => action('Current group clicked'),
  },
  groups: [{
    label: 'Cloud-Operators',
    icon: 'group',
    groupId: 1,
    onClick: () => action('Group click'),
  }, {
    label: 'Cloud-Users',
    icon: 'group',
    groupId: 2,
    onClick: () => action('Group click'),
  }],
  role: {
    label: 'Cloud-Users',
    onClick: () => action('Current role click'),
  },
};
