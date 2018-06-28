export const data = {
  rows: [
    {
      id: 100,
      name: 'Adam the first',
      userid: 'Admin',
      email: 'email@neco.com',
      current_group: {
        label: 'Some group',
        onClick: () => console.log('Current group clicked'),
      },
      role: {
        label: 'Admin role',
        onClick: () => console.log('Current role click'),
      },
      groups: [{
        label: 'Cloud-Operators',
        icon: 'group',
        groupId: 1,
        onClick: () => console.log('Group click'),
      }, {
        label: 'Cloud-Users',
        icon: 'group',
        groupId: 2,
        onClick: () => console.log('Group click'),
      }],
      lastlogon: '06/25/18 06:58:14 UTC',
      lastlogoff: '06/30/18 06:58:14 UTC',
    },
    {
      id: 101,
      name: 'Marge the middle',
      userid: 'La transparenza della qualita',
      email: 'email@jandak.com',
      current_group: {
        label: 'Mediocre group',
        onClick: () => console.log('Current group clicked'),
      },
      role: {
        label: 'Shot role',
        onClick: () => console.log('Current role click'),
      },
      groups: [{
        label: 'Cloud-Operators',
        icon: 'group',
        groupId: 1,
        onClick: () => console.log('Group click'),
      }, {
        label: 'Cloud-Users',
        icon: 'group',
        groupId: 2,
        onClick: () => console.log('Group click'),
      }],
      lastlogon: '01/25/18 06:58:14 UTC',
      lastlogoff: '06/30/18 06:58:14 UTC',
    },
    {
      id: 102,
      name: 'Zlatko the last',
      userid: 'Peligro',
      email: 'email@jandak.com',
      current_group: {
        label: 'Admin group',
        onClick: () => console.log('Current group clicked'),
      },
      role: {
        label: 'Cloud-Users',
        onClick: () => console.log('Current role click'),
      },
      groups: [{
        label: 'Cloud-Operators',
        icon: 'group',
        groupId: 1,
        onClick: () => console.log('Group click'),
      }, {
        label: 'Cloud-Users',
        icon: 'group',
        groupId: 2,
        onClick: () => console.log('Group click'),
      }],
      lastlogon: '08/25/18 06:58:14 UTC',
      lastlogoff: '010/30/18 06:58:14 UTC',
    },
  ],
  columns: [{
    property: 'name',
    label: 'Full Name',
  }, {
    property: 'userid',
    label: 'Username',
  }, {
    property: 'email',
    label: 'E-mail',
  }, {
    property: 'current_group',
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
  }],
  selectedUsers: null,
  groups: [
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
  ],
};
