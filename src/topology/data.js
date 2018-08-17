export const nodes = [
  {
    id: 0,
    title: 'Levy',
    size: 24,
    fonticon: 'fa fa-cog',
    depth: 1,
    status: 'valid',
  },
  {
    id: 1,
    title: 'Celina',
    size: 24,
    fonticon: 'fa fa-cloud',
    depth: 2,
    status: 'warning',
  },
  {
    id: 2,
    title: 'Nancy',
    size: 24,
    fonticon: 'fa fa-cloud',
    depth: 2,
    status: 'critical',
  },
  {
    id: 3,
    title: 'Yang',
    size: 24,
    fonticon: 'fa fa-cloud',
    depth: 3,
    status: 'valid',
  },
  {
    id: 4,
    title: 'Gray',
    size: 24,
    fonticon: 'fa fa-cloud',
    depth: 3,
    status: 'valid',
  },
  {
    id: 5,
    title: 'Maddox',
    size: 24,
    fileicon: 'https://www.svgrepo.com/show/5386/speedometer.svg',
    depth: 3,
    status: 'warning',
  },
];
export const edges = [
  {
    source: 0,
    target: 1,
  },
  {
    source: 0,
    target: 2,
  },
  {
    source: 1,
    target: 3,
  },
  {
    source: 1,
    target: 4,
  },
  {
    source: 2,
    target: 5,
  },
];
