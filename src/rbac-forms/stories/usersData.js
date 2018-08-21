export const users = [{
  href: 'http://localhost:3000/api/users/10000000000001',
  id: '10000000000001',
  name: 'Administrator',
  email: 'jmarc@redhat.com',
  icon: null,
  created_on: '2017-06-01T02:47:54Z',
  updated_on: '2018-08-14T07:25:42Z',
  userid: 'admin',
  lastlogon: '2018-08-14T07:25:42Z',
  lastlogoff: '2018-04-09T08:00:29Z',
  current_group_id: '10000000000002',
  first_name: null,
  last_name: null,
  role: {
    label: 'EvmGroup-super_administrator',
  },
  current_group: {
    id: '10000000000002',
    description: 'EvmGroup-super_administrator',
    group_type: 'system',
    sequence: 1,
    created_on: '2017-06-01T02:47:54Z',
    updated_on: '2017-06-01T02:47:54Z',
    settings: null,
    tenant_id: '10000000000001',
    miq_user_role: {
      id: '10000000000001',
      name: 'EvmRole-super_administrator',
      read_only: true,
      created_at: '2017-06-01T02:47:51Z',
      updated_at: '2017-06-01T02:47:51Z',
      settings: null,
    },
  },
  miq_groups: [{
    href: 'http://localhost:3000/api/groups/10000000000002', id: '10000000000002', description: 'EvmGroup-super_administrator', group_type: 'system', sequence: 1, created_on: '2017-06-01T02:47:54Z', updated_on: '2017-06-01T02:47:54Z', settings: null, tenant_id: '10000000000001',
  }, {
    href: 'http://localhost:3000/api/groups/10000000000003', id: '10000000000003', description: 'EvmGroup-operator', group_type: 'system', sequence: 2, created_on: '2017-06-01T02:47:54Z', updated_on: '2017-06-01T02:47:54Z', settings: null, tenant_id: '10000000000001',
  }, {
    href: 'http://localhost:3000/api/groups/10000000000008', id: '10000000000008', description: 'EvmGroup-support', group_type: 'system', sequence: 7, created_on: '2017-06-01T02:47:54Z', updated_on: '2017-06-01T02:47:54Z', settings: null, tenant_id: '10000000000001',
  }],
  tags: [{ href: 'http://localhost:3000/api/tags/10000000000092', id: '10000000000092', name: '/managed/prov_max_cpu/5' }, { href: 'http://localhost:3000/api/tags/10000000000190', id: '10000000000190', name: '/managed/application/acl_2_2_51' }],
  actions: [{ name: 'edit', method: 'post', href: 'http://localhost:3000/api/users/10000000000001' }, { name: 'edit', method: 'patch', href: 'http://localhost:3000/api/users/10000000000001' }, { name: 'edit', method: 'put', href: 'http://localhost:3000/api/users/10000000000001' }, { name: 'delete', method: 'post', href: 'http://localhost:3000/api/users/10000000000001' }, { name: 'set_current_group', method: 'post', href: 'http://localhost:3000/api/users/10000000000001' }, { name: 'delete', method: 'delete', href: 'http://localhost:3000/api/users/10000000000001' }],
}, {
  href: 'http://localhost:3000/api/users/10000000000003',
  id: '10000000000003',
  name: 'Ansible Tower ',
  email: 'jmarc@redhat.com',
  icon: null,
  created_on: '2017-06-05T11:32:30Z',
  updated_on: '2017-09-28T21:17:13Z',
  userid: 'ansible',
  settings: {},
  lastlogon: '2017-09-28T21:17:13Z',
  lastlogoff: null,
  current_group_id: '10000000000005',
  first_name: null,
  last_name: null,
  role: {
    label: 'EvmGroup-administrator',
  },
  current_group: {
    id: '10000000000005',
    description: 'EvmGroup-administrator',
    group_type: 'system',
    sequence: 4,
    created_on: '2017-06-01T02:47:54Z',
    updated_on: '2017-06-01T02:47:54Z',
    settings: null,
    tenant_id: '10000000000001',
    miq_user_role: {
      id: '10000000000002',
      name: 'EvmRole-administrator',
      read_only: true,
      created_at: '2017-06-01T02:47:51Z',
      updated_at: '2017-06-01T02:47:51Z',
      settings: null,
    },
  },
  miq_groups: [{
    href: 'http://localhost:3000/api/groups/10000000000002', id: '10000000000002', description: 'EvmGroup-super_administrator', group_type: 'system', sequence: 1, created_on: '2017-06-01T02:47:54Z', updated_on: '2017-06-01T02:47:54Z', settings: null, tenant_id: '10000000000001',
  }, {
    href: 'http://localhost:3000/api/groups/10000000000026', id: '10000000000026', description: 'Cloud-Users', group_type: 'user', sequence: 25, created_on: '2017-06-05T10:25:44Z', updated_on: '2017-06-05T10:25:44Z', settings: null, tenant_id: '10000000000001',
  }],
  tags: [{
    href: 'http://localhost:3000/api/tags/10000000000092', id: '10000000000092', name: '/managed/prov_max_cpu/5',
  }],
  actions: [{ name: 'edit', method: 'post', href: 'http://localhost:3000/api/users/10000000000003' }, { name: 'edit', method: 'patch', href: 'http://localhost:3000/api/users/10000000000003' }, { name: 'edit', method: 'put', href: 'http://localhost:3000/api/users/10000000000003' }, { name: 'delete', method: 'post', href: 'http://localhost:3000/api/users/10000000000003' }, { name: 'set_current_group', method: 'post', href: 'http://localhost:3000/api/users/10000000000003' }, { name: 'delete', method: 'delete', href: 'http://localhost:3000/api/users/10000000000003' }],
}];

export const categories = [{
  href: 'http://localhost:3000/api/categories/10000000000001', id: '10000000000001', description: 'Location', icon: null, read_only: false, syntax: 'string', single_value: true, example_text: 'The geographic location of the resource, such as New York, Chicago, or London.', tag_id: '10000000000003', parent_id: '0', show: true, default: true, perf_by_tag: null, name: 'location', actions: [{ name: 'edit', method: 'post', href: 'http://localhost:3000/api/categories/10000000000001' }, { name: 'delete', method: 'post', href: 'http://localhost:3000/api/categories/10000000000001' }, { name: 'delete', method: 'delete', href: 'http://localhost:3000/api/categories/10000000000001' }],
}, {
  href: 'http://localhost:3000/api/categories/10000000000006', id: '10000000000006', description: 'Workload', icon: null, read_only: false, syntax: 'string', single_value: false, example_text: 'The workloads a resource provides, such as Web Server, Database, or Firewall.', tag_id: '10000000000008', parent_id: '0', show: true, default: true, perf_by_tag: null, name: 'function', actions: [{ name: 'edit', method: 'post', href: 'http://localhost:3000/api/categories/10000000000006' }, { name: 'delete', method: 'post', href: 'http://localhost:3000/api/categories/10000000000006' }, { name: 'delete', method: 'delete', href: 'http://localhost:3000/api/categories/10000000000006' }],
}, {
  href: 'http://localhost:3000/api/categories/10000000000016', id: '10000000000016', description: 'Owner', icon: null, read_only: false, syntax: 'string', single_value: true, example_text: 'The individual or group that owns the resource.', tag_id: '10000000000018', parent_id: '0', show: true, default: true, perf_by_tag: null, name: 'owner', actions: [{ name: 'edit', method: 'post', href: 'http://localhost:3000/api/categories/10000000000016' }, { name: 'delete', method: 'post', href: 'http://localhost:3000/api/categories/10000000000016' }, { name: 'delete', method: 'delete', href: 'http://localhost:3000/api/categories/10000000000016' }],
}, {
  href: 'http://localhost:3000/api/categories/10000000000020', id: '10000000000020', description: 'Environment', icon: null, read_only: false, syntax: 'string', single_value: true, example_text: 'The resource environment, such as Development, QA, Test, or Production', tag_id: '10000000000022', parent_id: '0', show: true, default: true, perf_by_tag: null, name: 'environment', actions: [{ name: 'edit', method: 'post', href: 'http://localhost:3000/api/categories/10000000000020' }, { name: 'delete', method: 'post', href: 'http://localhost:3000/api/categories/10000000000020' }, { name: 'delete', method: 'delete', href: 'http://localhost:3000/api/categories/10000000000020' }],
}, {
  href: 'http://localhost:3000/api/categories/10000000000026', id: '10000000000026', description: 'User roles', icon: null, read_only: false, syntax: 'string', single_value: true, example_text: null, tag_id: '10000000000028', parent_id: '0', show: true, default: true, perf_by_tag: null, name: 'role', actions: [{ name: 'edit', method: 'post', href: 'http://localhost:3000/api/categories/10000000000026' }, { name: 'delete', method: 'post', href: 'http://localhost:3000/api/categories/10000000000026' }, { name: 'delete', method: 'delete', href: 'http://localhost:3000/api/categories/10000000000026' }],
}, {
  href: 'http://localhost:3000/api/categories/10000000000034', id: '10000000000034', description: 'Service Level', icon: null, read_only: false, syntax: 'string', single_value: true, example_text: 'The level of service associated with this resource.', tag_id: '10000000000036', parent_id: '0', show: true, default: true, perf_by_tag: null, name: 'service_level', actions: [{ name: 'edit', method: 'post', href: 'http://localhost:3000/api/categories/10000000000034' }, { name: 'delete', method: 'post', href: 'http://localhost:3000/api/categories/10000000000034' }, { name: 'delete', method: 'delete', href: 'http://localhost:3000/api/categories/10000000000034' }],
}, {
  href: 'http://localhost:3000/api/categories/10000000000038', id: '10000000000038', description: 'Customer', icon: null, read_only: false, syntax: 'string', single_value: true, example_text: 'The name of the customer associated with this resource.', tag_id: '10000000000040', parent_id: '0', show: true, default: true, perf_by_tag: null, name: 'customer', actions: [{ name: 'edit', method: 'post', href: 'http://localhost:3000/api/categories/10000000000038' }, { name: 'delete', method: 'post', href: 'http://localhost:3000/api/categories/10000000000038' }, { name: 'delete', method: 'delete', href: 'http://localhost:3000/api/categories/10000000000038' }],
}, {
  href: 'http://localhost:3000/api/categories/10000000000039', id: '10000000000039', description: 'Line of Business', icon: null, read_only: false, syntax: 'string', single_value: false, example_text: 'The Line of Business the resource is assigned to, such as Retail, Trading, or Manufacturing.', tag_id: '10000000000041', parent_id: '0', show: true, default: true, perf_by_tag: null, name: 'lob', actions: [{ name: 'edit', method: 'post', href: 'http://localhost:3000/api/categories/10000000000039' }, { name: 'delete', method: 'post', href: 'http://localhost:3000/api/categories/10000000000039' }, { name: 'delete', method: 'delete', href: 'http://localhost:3000/api/categories/10000000000039' }],
}, {
  href: 'http://localhost:3000/api/categories/10000000000040', id: '10000000000040', description: 'Department', icon: null, read_only: false, syntax: 'string', single_value: false, example_text: 'The department the resource is assigned to, such as HR, Accounting, or Sales.', tag_id: '10000000000042', parent_id: '0', show: true, default: true, perf_by_tag: null, name: 'department', actions: [{ name: 'edit', method: 'post', href: 'http://localhost:3000/api/categories/10000000000040' }, { name: 'delete', method: 'post', href: 'http://localhost:3000/api/categories/10000000000040' }, { name: 'delete', method: 'delete', href: 'http://localhost:3000/api/categories/10000000000040' }],
}, {
  href: 'http://localhost:3000/api/categories/10000000000057', id: '10000000000057', description: 'Cost Center', icon: null, read_only: false, syntax: 'string', single_value: true, example_text: 'Cost Center', tag_id: '10000000000059', parent_id: '0', show: true, default: true, perf_by_tag: null, name: 'cc', actions: [{ name: 'edit', method: 'post', href: 'http://localhost:3000/api/categories/10000000000057' }, { name: 'delete', method: 'post', href: 'http://localhost:3000/api/categories/10000000000057' }, { name: 'delete', method: 'delete', href: 'http://localhost:3000/api/categories/10000000000057' }],
}, {
  href: 'http://localhost:3000/api/categories/10000000000060', id: '10000000000060', description: 'Network Location', icon: null, read_only: false, syntax: 'string', single_value: true, example_text: 'The network location the resource is to be used, such as DMZ, Internal network or Cloud', tag_id: '10000000000062', parent_id: '0', show: true, default: true, perf_by_tag: null, name: 'network_location', actions: [{ name: 'edit', method: 'post', href: 'http://localhost:3000/api/categories/10000000000060' }, { name: 'delete', method: 'post', href: 'http://localhost:3000/api/categories/10000000000060' }, { name: 'delete', method: 'delete', href: 'http://localhost:3000/api/categories/10000000000060' }],
}, {
  href: 'http://localhost:3000/api/categories/10000000000064', id: '10000000000064', description: 'Exclusions', icon: null, read_only: false, syntax: 'string', single_value: false, example_text: 'Operations that the resource may be excluded from, such as Analysis or Cloning.', tag_id: '10000000000066', parent_id: '0', show: true, default: true, perf_by_tag: null, name: 'exclusions', actions: [{ name: 'edit', method: 'post', href: 'http://localhost:3000/api/categories/10000000000064' }, { name: 'delete', method: 'post', href: 'http://localhost:3000/api/categories/10000000000064' }, { name: 'delete', method: 'delete', href: 'http://localhost:3000/api/categories/10000000000064' }],
}, {
  href: 'http://localhost:3000/api/categories/10000000000067', id: '10000000000067', description: 'Provisioning Scope', icon: null, read_only: false, syntax: 'string', single_value: false, example_text: 'Provisioning Scope', tag_id: '10000000000069', parent_id: '0', show: true, default: true, perf_by_tag: null, name: 'prov_scope', actions: [{ name: 'edit', method: 'post', href: 'http://localhost:3000/api/categories/10000000000067' }, { name: 'delete', method: 'post', href: 'http://localhost:3000/api/categories/10000000000067' }, { name: 'delete', method: 'delete', href: 'http://localhost:3000/api/categories/10000000000067' }],
}, {
  href: 'http://localhost:3000/api/categories/10000000000070', id: '10000000000070', description: 'EVM Operations', icon: null, read_only: false, syntax: 'string', single_value: true, example_text: 'Operations', tag_id: '10000000000072', parent_id: '0', show: true, default: true, perf_by_tag: null, name: 'operations', actions: [{ name: 'edit', method: 'post', href: 'http://localhost:3000/api/categories/10000000000070' }, { name: 'delete', method: 'post', href: 'http://localhost:3000/api/categories/10000000000070' }, { name: 'delete', method: 'delete', href: 'http://localhost:3000/api/categories/10000000000070' }],
}, {
  href: 'http://localhost:3000/api/categories/10000000000074', id: '10000000000074', description: 'Quota - Max CPUs', icon: null, read_only: false, syntax: 'string', single_value: true, example_text: 'Maximum number of CPUs allowed by Quota', tag_id: '10000000000076', parent_id: '0', show: true, default: true, perf_by_tag: null, name: 'quota_max_cpu', actions: [{ name: 'edit', method: 'post', href: 'http://localhost:3000/api/categories/10000000000074' }, { name: 'delete', method: 'post', href: 'http://localhost:3000/api/categories/10000000000074' }, { name: 'delete', method: 'delete', href: 'http://localhost:3000/api/categories/10000000000074' }],
}, {
  href: 'http://localhost:3000/api/categories/10000000000085', id: '10000000000085', description: 'Auto Approve - Max CPU', icon: null, read_only: false, syntax: 'string', single_value: true, example_text: 'Maximum number of CPUs allowed by Auto Approval', tag_id: '10000000000087', parent_id: '0', show: true, default: true, perf_by_tag: null, name: 'prov_max_cpu', actions: [{ name: 'edit', method: 'post', href: 'http://localhost:3000/api/categories/10000000000085' }, { name: 'delete', method: 'post', href: 'http://localhost:3000/api/categories/10000000000085' }, { name: 'delete', method: 'delete', href: 'http://localhost:3000/api/categories/10000000000085' }],
}, {
  href: 'http://localhost:3000/api/categories/10000000000091', id: '10000000000091', description: 'Auto Approve - Max VM', icon: null, read_only: false, syntax: 'string', single_value: true, example_text: 'Maximum number of VMs allowed by Auto Approval', tag_id: '10000000000093', parent_id: '0', show: true, default: true, perf_by_tag: null, name: 'prov_max_vm', actions: [{ name: 'edit', method: 'post', href: 'http://localhost:3000/api/categories/10000000000091' }, { name: 'delete', method: 'post', href: 'http://localhost:3000/api/categories/10000000000091' }, { name: 'delete', method: 'delete', href: 'http://localhost:3000/api/categories/10000000000091' }],
}, {
  href: 'http://localhost:3000/api/categories/10000000000097', id: '10000000000097', description: 'Quota - Max  Memory', icon: null, read_only: false, syntax: 'string', single_value: true, example_text: 'Maximum Memory allowed by Quota (GB)', tag_id: '10000000000099', parent_id: '0', show: true, default: true, perf_by_tag: null, name: 'quota_max_memory', actions: [{ name: 'edit', method: 'post', href: 'http://localhost:3000/api/categories/10000000000097' }, { name: 'delete', method: 'post', href: 'http://localhost:3000/api/categories/10000000000097' }, { name: 'delete', method: 'delete', href: 'http://localhost:3000/api/categories/10000000000097' }],
}, {
  href: 'http://localhost:3000/api/categories/10000000000106', id: '10000000000106', description: 'Auto Approve - Max Memory', icon: null, read_only: false, syntax: 'string', single_value: true, example_text: 'Maximum Memory allowed by Auto Approval (GB)', tag_id: '10000000000108', parent_id: '0', show: true, default: true, perf_by_tag: null, name: 'prov_max_memory', actions: [{ name: 'edit', method: 'post', href: 'http://localhost:3000/api/categories/10000000000106' }, { name: 'delete', method: 'post', href: 'http://localhost:3000/api/categories/10000000000106' }, { name: 'delete', method: 'delete', href: 'http://localhost:3000/api/categories/10000000000106' }],
}, {
  href: 'http://localhost:3000/api/categories/10000000000111', id: '10000000000111', description: 'Quota - Max  Storage', icon: null, read_only: false, syntax: 'string', single_value: true, example_text: 'Maximum Storage allowed by Quota (GB)', tag_id: '10000000000113', parent_id: '0', show: true, default: true, perf_by_tag: null, name: 'quota_max_storage', actions: [{ name: 'edit', method: 'post', href: 'http://localhost:3000/api/categories/10000000000111' }, { name: 'delete', method: 'post', href: 'http://localhost:3000/api/categories/10000000000111' }, { name: 'delete', method: 'delete', href: 'http://localhost:3000/api/categories/10000000000111' }],
}, {
  href: 'http://localhost:3000/api/categories/10000000000119', id: '10000000000119', description: 'Auto Approve - Max Retirement Days', icon: null, read_only: false, syntax: 'string', single_value: true, example_text: 'Maximum Days for Retirement allowed by Auto Approval', tag_id: '10000000000121', parent_id: '0', show: true, default: true, perf_by_tag: null, name: 'prov_max_retirement_days', actions: [{ name: 'edit', method: 'post', href: 'http://localhost:3000/api/categories/10000000000119' }, { name: 'delete', method: 'post', href: 'http://localhost:3000/api/categories/10000000000119' }, { name: 'delete', method: 'delete', href: 'http://localhost:3000/api/categories/10000000000119' }],
}, {
  href: 'http://localhost:3000/api/categories/10000000000124', id: '10000000000124', description: 'LifeCycle', icon: null, read_only: false, syntax: 'string', single_value: true, example_text: 'LifeCycle Options', tag_id: '10000000000126', parent_id: '0', show: true, default: true, perf_by_tag: null, name: 'lifecycle', actions: [{ name: 'edit', method: 'post', href: 'http://localhost:3000/api/categories/10000000000124' }, { name: 'delete', method: 'post', href: 'http://localhost:3000/api/categories/10000000000124' }, { name: 'delete', method: 'delete', href: 'http://localhost:3000/api/categories/10000000000124' }],
}, {
  href: 'http://localhost:3000/api/categories/10000000000126', id: '10000000000126', description: 'Parent Folder Path (VMs & Templates)', icon: null, read_only: true, syntax: 'string', single_value: true, example_text: null, tag_id: '10000000000130', parent_id: '0', show: true, default: null, perf_by_tag: null, name: 'folder_path_blue', actions: [{ name: 'edit', method: 'post', href: 'http://localhost:3000/api/categories/10000000000126' }, { name: 'delete', method: 'post', href: 'http://localhost:3000/api/categories/10000000000126' }, { name: 'delete', method: 'delete', href: 'http://localhost:3000/api/categories/10000000000126' }],
}, {
  href: 'http://localhost:3000/api/categories/10000000000128', id: '10000000000128', description: 'Parent Folder Path (Hosts & Clusters)', icon: null, read_only: true, syntax: 'string', single_value: true, example_text: null, tag_id: '10000000000132', parent_id: '0', show: true, default: null, perf_by_tag: null, name: 'folder_path_yellow', actions: [{ name: 'edit', method: 'post', href: 'http://localhost:3000/api/categories/10000000000128' }, { name: 'delete', method: 'post', href: 'http://localhost:3000/api/categories/10000000000128' }, { name: 'delete', method: 'delete', href: 'http://localhost:3000/api/categories/10000000000128' }],
}, {
  href: 'http://localhost:3000/api/categories/10000000000129', id: '10000000000129', description: 'Parent Folder Path (Hosts & Clusters)', icon: null, read_only: true, syntax: 'string', single_value: true, example_text: null, tag_id: '10000000000133', parent_id: '0', show: true, default: null, perf_by_tag: null, name: 'folder_path_yellow', actions: [{ name: 'edit', method: 'post', href: 'http://localhost:3000/api/categories/10000000000129' }, { name: 'delete', method: 'post', href: 'http://localhost:3000/api/categories/10000000000129' }, { name: 'delete', method: 'delete', href: 'http://localhost:3000/api/categories/10000000000129' }],
}, {
  href: 'http://localhost:3000/api/categories/10000000000140', id: '10000000000140', description: 'Application', icon: null, read_only: false, syntax: 'string', single_value: true, example_text: 'Application', tag_id: '10000000000145', parent_id: '0', show: true, default: null, perf_by_tag: false, name: 'application', actions: [{ name: 'edit', method: 'post', href: 'http://localhost:3000/api/categories/10000000000140' }, { name: 'delete', method: 'post', href: 'http://localhost:3000/api/categories/10000000000140' }, { name: 'delete', method: 'delete', href: 'http://localhost:3000/api/categories/10000000000140' }],
}, {
  href: 'http://localhost:3000/api/categories/10000000000141', id: '10000000000141', description: 'AWS Reservation Status', icon: null, read_only: false, syntax: 'string', single_value: true, example_text: 'AWS Reservation Status', tag_id: '10000000000146', parent_id: '0', show: true, default: null, perf_by_tag: false, name: 'aws_reservation_statud', actions: [{ name: 'edit', method: 'post', href: 'http://localhost:3000/api/categories/10000000000141' }, { name: 'delete', method: 'post', href: 'http://localhost:3000/api/categories/10000000000141' }, { name: 'delete', method: 'delete', href: 'http://localhost:3000/api/categories/10000000000141' }],
}, {
  href: 'http://localhost:3000/api/categories/10000000000142', id: '10000000000142', description: 'csra', icon: null, read_only: false, syntax: 'string', single_value: true, example_text: 'csra', tag_id: '10000000000147', parent_id: '0', show: true, default: null, perf_by_tag: false, name: 'csra', actions: [{ name: 'edit', method: 'post', href: 'http://localhost:3000/api/categories/10000000000142' }, { name: 'delete', method: 'post', href: 'http://localhost:3000/api/categories/10000000000142' }, { name: 'delete', method: 'delete', href: 'http://localhost:3000/api/categories/10000000000142' }],
}, {
  href: 'http://localhost:3000/api/categories/10000000000143', id: '10000000000143', description: 'flavor', icon: null, read_only: false, syntax: 'string', single_value: true, example_text: 'flavor', tag_id: '10000000000148', parent_id: '0', show: true, default: null, perf_by_tag: false, name: 'flavor', actions: [{ name: 'edit', method: 'post', href: 'http://localhost:3000/api/categories/10000000000143' }, { name: 'delete', method: 'post', href: 'http://localhost:3000/api/categories/10000000000143' }, { name: 'delete', method: 'delete', href: 'http://localhost:3000/api/categories/10000000000143' }],
}, {
  href: 'http://localhost:3000/api/categories/10000000000144', id: '10000000000144', description: 'flex_maximum', icon: null, read_only: false, syntax: 'string', single_value: true, example_text: 'flex_maximum', tag_id: '10000000000149', parent_id: '0', show: true, default: null, perf_by_tag: false, name: 'flex_maximum', actions: [{ name: 'edit', method: 'post', href: 'http://localhost:3000/api/categories/10000000000144' }, { name: 'delete', method: 'post', href: 'http://localhost:3000/api/categories/10000000000144' }, { name: 'delete', method: 'delete', href: 'http://localhost:3000/api/categories/10000000000144' }],
}, {
  href: 'http://localhost:3000/api/categories/10000000000145', id: '10000000000145', description: 'flex_monitor', icon: null, read_only: false, syntax: 'string', single_value: true, example_text: 'flex_monitor', tag_id: '10000000000150', parent_id: '0', show: true, default: null, perf_by_tag: false, name: 'flex_monitor', actions: [{ name: 'edit', method: 'post', href: 'http://localhost:3000/api/categories/10000000000145' }, { name: 'delete', method: 'post', href: 'http://localhost:3000/api/categories/10000000000145' }, { name: 'delete', method: 'delete', href: 'http://localhost:3000/api/categories/10000000000145' }],
}, {
  href: 'http://localhost:3000/api/categories/10000000000146', id: '10000000000146', description: 'project', icon: null, read_only: false, syntax: 'string', single_value: true, example_text: 'project', tag_id: '10000000000151', parent_id: '0', show: true, default: null, perf_by_tag: false, name: 'project', actions: [{ name: 'edit', method: 'post', href: 'http://localhost:3000/api/categories/10000000000146' }, { name: 'delete', method: 'post', href: 'http://localhost:3000/api/categories/10000000000146' }, { name: 'delete', method: 'delete', href: 'http://localhost:3000/api/categories/10000000000146' }],
}, {
  href: 'http://localhost:3000/api/categories/10000000000147', id: '10000000000147', description: 'Turbonomic', icon: null, read_only: false, syntax: 'string', single_value: false, example_text: 'Turbonomic', tag_id: '10000000000152', parent_id: '0', show: true, default: null, perf_by_tag: false, name: 'turbonomic', actions: [{ name: 'edit', method: 'post', href: 'http://localhost:3000/api/categories/10000000000147' }, { name: 'delete', method: 'post', href: 'http://localhost:3000/api/categories/10000000000147' }, { name: 'delete', method: 'delete', href: 'http://localhost:3000/api/categories/10000000000147' }],
}, {
  href: 'http://localhost:3000/api/categories/10000000000148', id: '10000000000148', description: 'service_template_filter', icon: null, read_only: false, syntax: 'string', single_value: true, example_text: 'service_template_filter', tag_id: '10000000000153', parent_id: '0', show: true, default: null, perf_by_tag: false, name: 'service_template_filter', actions: [{ name: 'edit', method: 'post', href: 'http://localhost:3000/api/categories/10000000000148' }, { name: 'delete', method: 'post', href: 'http://localhost:3000/api/categories/10000000000148' }, { name: 'delete', method: 'delete', href: 'http://localhost:3000/api/categories/10000000000148' }],
}, {
  href: 'http://localhost:3000/api/categories/10000000000149', id: '10000000000149', description: 'Service Catalog', icon: null, read_only: false, syntax: 'string', single_value: false, example_text: 'Service Catalog', tag_id: '10000000000154', parent_id: '0', show: true, default: null, perf_by_tag: false, name: 'service_catalog', actions: [{ name: 'edit', method: 'post', href: 'http://localhost:3000/api/categories/10000000000149' }, { name: 'delete', method: 'post', href: 'http://localhost:3000/api/categories/10000000000149' }, { name: 'delete', method: 'delete', href: 'http://localhost:3000/api/categories/10000000000149' }],
}, {
  href: 'http://localhost:3000/api/categories/10000000000174', id: '10000000000174', description: 'Approval Required', icon: null, read_only: false, syntax: 'string', single_value: true, example_text: 'Approval Required', tag_id: '10000000000183', parent_id: '0', show: true, default: null, perf_by_tag: false, name: 'approval_required', actions: [{ name: 'edit', method: 'post', href: 'http://localhost:3000/api/categories/10000000000174' }, { name: 'delete', method: 'post', href: 'http://localhost:3000/api/categories/10000000000174' }, { name: 'delete', method: 'delete', href: 'http://localhost:3000/api/categories/10000000000174' }],
}, {
  href: 'http://localhost:3000/api/categories/10000000000182', id: '10000000000182', description: 'Migration Group', icon: null, read_only: false, syntax: 'string', single_value: true, example_text: 'Group of VMs prepared for migration.', tag_id: '10000000000207', parent_id: '0', show: true, default: true, perf_by_tag: null, name: 'migration_group', actions: [{ name: 'edit', method: 'post', href: 'http://localhost:3000/api/categories/10000000000182' }, { name: 'delete', method: 'post', href: 'http://localhost:3000/api/categories/10000000000182' }, { name: 'delete', method: 'delete', href: 'http://localhost:3000/api/categories/10000000000182' }],
}, {
  href: 'http://localhost:3000/api/categories/10000000000186', id: '10000000000186', description: 'Network Mapping', icon: null, read_only: false, syntax: 'string', single_value: true, example_text: 'Mapping between source network(s) and a destination network for migration.', tag_id: '10000000000211', parent_id: '0', show: true, default: true, perf_by_tag: null, name: 'network_mapping', actions: [{ name: 'edit', method: 'post', href: 'http://localhost:3000/api/categories/10000000000186' }, { name: 'delete', method: 'post', href: 'http://localhost:3000/api/categories/10000000000186' }, { name: 'delete', method: 'delete', href: 'http://localhost:3000/api/categories/10000000000186' }],
}, {
  href: 'http://localhost:3000/api/categories/10000000000188', id: '10000000000188', description: 'Storage Mapping', icon: null, read_only: false, syntax: 'string', single_value: true, example_text: 'Mapping between source storage(s) and a destination storage for migration.', tag_id: '10000000000213', parent_id: '0', show: true, default: true, perf_by_tag: null, name: 'storage_mapping', actions: [{ name: 'edit', method: 'post', href: 'http://localhost:3000/api/categories/10000000000188' }, { name: 'delete', method: 'post', href: 'http://localhost:3000/api/categories/10000000000188' }, { name: 'delete', method: 'delete', href: 'http://localhost:3000/api/categories/10000000000188' }],
}, {
  href: 'http://localhost:3000/api/categories/10000000000192', id: '10000000000192', description: 'V2V - Transformation Host', icon: null, read_only: false, syntax: 'string', single_value: true, example_text: 'Transformation Host role enabled for V2V.', tag_id: '10000000000217', parent_id: '0', show: true, default: true, perf_by_tag: null, name: 'v2v_transformation_host', actions: [{ name: 'edit', method: 'post', href: 'http://localhost:3000/api/categories/10000000000192' }, { name: 'delete', method: 'post', href: 'http://localhost:3000/api/categories/10000000000192' }, { name: 'delete', method: 'delete', href: 'http://localhost:3000/api/categories/10000000000192' }],
}, {
  href: 'http://localhost:3000/api/categories/10000000000195', id: '10000000000195', description: 'V2V - Transformation Method', icon: null, read_only: false, syntax: 'string', single_value: false, example_text: 'Transformation methods supported for V2V.', tag_id: '10000000000220', parent_id: '0', show: true, default: true, perf_by_tag: null, name: 'v2v_transformation_method', actions: [{ name: 'edit', method: 'post', href: 'http://localhost:3000/api/categories/10000000000195' }, { name: 'delete', method: 'post', href: 'http://localhost:3000/api/categories/10000000000195' }, { name: 'delete', method: 'delete', href: 'http://localhost:3000/api/categories/10000000000195' }],
}, {
  href: 'http://localhost:3000/api/categories/10000000000198', id: '10000000000198', description: 'Transformation Status', icon: null, read_only: false, syntax: 'string', single_value: true, example_text: 'VM has been migrated.', tag_id: '10000000000223', parent_id: '0', show: true, default: true, perf_by_tag: null, name: 'transformation_status', actions: [{ name: 'edit', method: 'post', href: 'http://localhost:3000/api/categories/10000000000198' }, { name: 'delete', method: 'post', href: 'http://localhost:3000/api/categories/10000000000198' }, { name: 'delete', method: 'delete', href: 'http://localhost:3000/api/categories/10000000000198' }],
}];
