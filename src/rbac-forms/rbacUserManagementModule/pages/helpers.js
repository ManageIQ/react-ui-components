export const parseUserValues = ({
  name,
  userid,
  groups, // eslint-disable-line
  password,
  email,
}) => ({
  name,
  userid,
  miq_groups: groups.map(item => ({ id: item })),
  password,
  email,
});
