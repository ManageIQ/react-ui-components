export function generator() {
  return [
    {
      text: 'Parent 1 - Expanded',
      state: { expanded: true, checked: true },
      attr: { 'data-random': 'notThatRandom' },
      nodes: [
        { text: 'Child 1 - Custom Icon', icon: 'fa fa-stop fa-fw', state: { checked: true } },
        {
          text: 'Child 2 - Non checkable and disabled - no icon',
          icon: 'fa fa-fw',
          checkable: false,
          state: { disabled: true },
        },
        { text: 'Child 3 - No checkbox', hideCheckbox: true },
        { text: 'Child 4 - LazyLoadable', lazyLoad: true, attr: { 'data-random': 'random' } },
        { text: 'Child 5 - LazyLoadable - Fails', lazyLoad: true, attr: { 'data-random': 'random' } },
      ],
    },
    {
      text: 'Parent 2 - Not expanded',
      state: { expanded: false, checked: false },
      nodes: [
        { text: 'Child 1 - Custom Icon', icon: 'fa fa-stop' },
        { text: 'Child 2 - No icon specified', classes: 'custom-class' },
        { text: 'Child 3 - Image icon', image: 'https://www.wpsuperstars.net/wp-content/uploads/2015/01/59.png' },
      ],
    },
    {
      text: 'Parent 3 - Children checkboxes',
      hideCheckbox: true,
      state: { expanded: true },
      attr: { 'data-random': 'random' },
      nodes: [
        { text: 'Child 1 - Has checkbox - checked', state: { checked: true } },
        { text: 'Child 2 - Has checkbox - unchecked', attr: { 'data-random': 'random' } },
      ],
    },
    {
      text: 'Parent 4 - Changed icon colors',
      nodes: [
        {
          text: 'Child 1 - Changed icon color',
          icon: 'fa fa-circle ',
          iconColor: 'rgba(255,100,0,1)',
        },
        {
          text: 'Child 2 - Changed background color',
          icon: 'fa fa-circle',
          iconBackground: '#9800ff',
        },
        {
          text: 'Child 3 - Changed both colors',
          icon: 'fa fa-circle',
          iconColor: 'red',
          iconBackground: '#0d21ba',
        },
        {
          text: 'Child 4 - Changed background color - with transparency',
          icon: 'fa fa-circle',
          iconBackground: 'rgba(0,0,0,0.5',
        },
      ],
    },
  ];
}

export function flatLazyChildren(parentId) {
  return {
    [`${parentId}.0`]: {
      nodeId: `${parentId}.0`,
      text: 'Lazy-loaded 0',
      state: {
        expanded: false, disabled: false, checked: false, selected: false,
      },
    },
    [`${parentId}.1`]: {
      nodeId: `${parentId}.1`,
      text: 'Lazy-loaded 1',
      state: {
        expanded: false, disabled: false, checked: false, selected: false,
      },
    },
  };
}
