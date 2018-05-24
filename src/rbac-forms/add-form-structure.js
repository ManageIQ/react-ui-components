const fields = {
  name: {
    required: true,
    label: 'Full name',
    error: 'Required',
  },
  userid: {
    required: true,
    label: 'Username',
  },
  password: {
    required: true,
    error: 'Password/Verify Password do not match',
    label: 'Password',
  },
  verify: {
    validation: 'must match password',
    required: true,
    label: 'Confirm password',
    error: 'Password/Verify Password do not match',
  },
  email: {
    required: false,
    validation: 'email',
  },
  chosen_hroup: {
    required: true,
    value: ['groupId', 'groupId'],
  },
  availableGroups: {
    type: 'multi-select',
  },
};
