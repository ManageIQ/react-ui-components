/* Columns Tab - Available Fields */
export const columnOptions = [{
  value: 'Cloud Manager: Subscription',
  label: 'Cloud Manager: Subscription',
}, {
  value: 'Cloud Manager: Total Cloud Memory',
  label: 'Cloud Manager: Total Cloud Memory',
  type: 'number',
}, {
  value: 'Vms: Date Created',
  label: 'Vms: Date Created',
  type: 'datetime',
}, {
  value: 'Cloud Manager: Last Inventory Date',
  label: 'Cloud Manager: Last Inventory Date',
  type: 'datetime',
}, {
  value: 'Cloud Manager: Last Refresh Date',
  label: 'Cloud Manager: Last Refresh Date',
  type: 'datetime',
}, {
  value: 'Management Events: Date Created',
  label: 'Management Events: Date Created',
  type: 'datetime',
}, {
  value: 'Vms: Last Sync Time',
  label: 'Vms: Last Sync Time',
  type: 'datetime',
}, {
  value: 'CPU Usage Rate Average Avg Over Time Period',
  label: 'CPU Usage Rate Average Avg Over Time Period',
  type: 'number',
}, {
  value: 'Memory Usage Rate Average Avg Over Time Period',
  label: 'Memory Usage Rate Average Avg Over Time Period',
  type: 'number',
}, {
  value: 'Cloud Manager: Total Number of Logical CPUs',
  label: 'Cloud Manager: Total Number of Logical CPUs',
  type: 'number',
}, {
  value: 'Cloud Manager: Total Number of Physical CPUs',
  label: 'Cloud Manager: Total Number of Physical CPUs',
  type: 'number',
}, {
  value: 'Management Events: Container Group Name',
  label: 'Management Events: Container Group Name',
}, {
  value: 'Region Description',
  label: 'Region Description',
}, {
  value: 'Cloud Manager: Hostname',
  label: 'Cloud Manager: Hostname',
}, {
  value: 'Management Events: Destination VM Location',
  label: 'Management Events: Destination VM Location',
}];

/* Columns Tab - Configure Report Columns */
export const baseTheReportOptions = [
  {
    value: 'Availability Zones',
    label: 'Availability Zones',
  },
  {
    value: 'Bottleneck Events',
    label: 'Bottleneck Events',
  },
  {
    value: 'Chargeback for Images',
    label: 'Chargeback for Images',
  },
  {
    value: 'Chargeback for Projects',
    label: 'Chargeback for Projects',
  },
  {
    value: 'Chargeback for Vms',
    label: 'Chargeback for Vms',
  },
  {
    value: 'Cloud Networks',
    label: 'Cloud Networks',
  },
  {
    value: 'Cloud Providers',
    label: 'Cloud Providers',
  },
  {
    value: 'Cloud Resource Quotas',
    label: 'Cloud Resource Quotas',
  },
  {
    value: 'Chargeback for Vms',
    label: 'Chargeback for Vms',
  },
  {
    value: 'Cloud Tenants',
    label: 'Cloud Tenants',
  },
  {
    value: 'Cloud Volumes',
    label: 'Cloud Volumes',
  },
  {
    value: 'Cluster / Deployment Roles',
    label: 'Cluster / Deployment Roles',
  },
  {
    value: 'Compliance Histories',
    label: 'Compliance Histories',
  },
  {
    value: 'Configuration Managers',
    label: 'Configuration Managers',
  },
  {
    value: 'Configured Systems (Foreman)',
    label: 'Configured Systems (Foreman)',
  },
];

/* Columns Tab - Report Creation Timeout */
export const creationTimeoutOptions = [
  {
    value: '1 Hour',
    label: '1 Hour',
  },
  {
    value: '2 Hours',
    label: '2 Hours',
  },
  {
    value: '3 Hours',
    label: '3 Hours',
  },
  {
    value: '4 Hours',
    label: '4 Hours',
  },
  {
    value: '5 Hours',
    label: '5 Hours',
  },
  {
    value: '6 Hours',
    label: '6 Hours',
  },
];

/* Formatting Tab - PDF Output */
export const pdfOptions = [
  {
    value: 'A0 - 841mm x 1189mm',
    label: 'A0 - 841mm x 1189mm',
  },
  {
    value: 'A1 - 594mm x 841mm',
    label: 'A1 - 594mm x 841mm',
  },
  {
    value: 'A2 - 420mm x 594mm',
    label: 'A2 - 420mm x 594mm',
  },
  {
    value: 'A3 - 297mm x 420mm',
    label: 'A3 - 297mm x 420mm',
  },
  {
    value: 'A4 - 210mm x 297mm',
    label: 'A4 - 210mm x 297mm',
  },
  {
    value: 'US Executive - 7.25in x 10.5in',
    label: 'US Executive - 7.25in x 10.5in',
  },
  {
    value: 'US Folio - 8.5in x 13.0in',
    label: 'US Folio - 8.5in x 13.0in',
  },
  {
    value: 'US Government - 8.0in x 11.0in',
    label: 'US Government - 8.0in x 11.0in',
  },
  {
    value: 'US Executive - 17.0in x 11.0in',
    label: 'US Executive - 17.0in x 11.0in',
  },
  {
    value: 'US Legal - 8.5in x 14.0in',
    label: 'US Legal - 8.5in x 14.0in',
  },
];

/* Summary Tab - Sort Order */
export const sortOrderOptions = [
  {
    value: 'Asc',
    label: 'Ascending',
  },
  {
    value: 'Desc',
    label: 'Descending',
  },
];

/* Summary Tab - Sort Breaks */
export const sortBreaksOptions = [
  {
    value: 'No',
    label: 'No',
  },
  {
    value: 'Yes',
    label: 'Yes',
  },
  {
    value: 'Counts',
    label: 'Counts',
  },
];

/* Summary Tab - Number of rows to show */
export const rowNumberOptions = [
  {
    value: 'All',
    label: 'All',
  },
];

/* Summary Tab - Format on Summary Row */
export const rowOptions = [
  {
    value: 'Reset to default',
    label: 'Reset to default',
  },
  {
    value: 'Convert Numbers Larger than 1.0e+15 to Exponential Form',
    label: 'Convert Numbers Larger than 1.0e+15 to Exponential Form',
  },
  {
    value: 'Currency, 2 Decimals ($1,234.00)',
    label: 'Currency, 2 Decimals ($1,234.00)',
  },
  {
    value: 'Number (1,234)',
    label: 'Number (1,234)',
  },
  {
    value: 'Number (1,234.0)',
    label: 'Number (1,234.0)',
  },
];

/* Summary - Time Format on Summary Row */
export const formatSummaryTimeOptions = [
  {
    value: 'Date/Time (M/D/Y H:M:S Z)',
    label: 'Date/Time (M/D/Y H:M:S Z)',
  }, {
    value: 'Date (M/D)',
    label: 'Date (M/D)',
  }, {
    value: 'Date (M/D/YY)',
    label: 'Date (M/D/YY)',
  }, {
    value: 'Date (M/D/YYY)',
    label: 'Date (M/D/YYY)',
  }, {
    value: 'Day Full (Monday)',
    label: 'Day Full (Monday)',
  }, {
    value: 'Day Short (Mon)',
    label: 'Day Short (Mon)',
  }, {
    value: 'Day of Month (27)',
    label: 'Day of Month (27)',
  }, {
    value: 'Day of Month (27th)',
    label: 'Day of Month (27th)',
  }, {
    value: 'Day of Week (1)',
    label: 'Day of Week (1)',
  }, {
    value: 'Hour of Day (24)',
    label: 'Hour of Day (24)',
  }, {
    value: 'Month Full',
    label: 'Month Full',
  }, {
    value: 'Year (YYYY)',
    label: 'Year (YYYY)',
  },
];

/* Summary Tab - Original value to time fields */
export const timeValues = [
  {
    value: 'Original Value',
    label: 'Original Value',
  },
  {
    value: 'Hour',
    label: 'Hour',
  },
  {
    value: 'Day',
    label: 'Day',
  },
  {
    value: 'Week',
    label: 'Week',
  },
  {
    value: 'Month',
    label: 'Month',
  },
  {
    value: 'Quarter',
    label: 'Quarter',
  },
  {
    value: 'Year',
    label: 'Year',
  },
  {
    value: 'Hour of the Day',
    label: 'Hour of the Day',
  },
  {
    value: 'Day of the Week',
    label: 'Day of the Week',
  },
  {
    value: 'Day of the Month',
    label: 'Day of the Month',
  },
  {
    value: 'Week of the Year',
    label: 'Week of the Year',
  },
  {
    value: 'Month of the Year',
    label: 'Month of the Year',
  },
];

/* Summary Tab - Original value to time fields */
export const stringValues = [
  {
    value: 'Human Readable Model Name',
    label: 'Human Readable Model Name',
  }, {
    value: 'String Truncated to 50 Characters with Elipses (...)',
    label: 'String Truncated to 50 Characters with Elipses (...)',
  },
];

/* Consolidation - calculation */
export const calculationValues = [
  {
    value: 'Min',
    label: 'Min',
  }, {
    value: 'Max',
    label: 'Max',
  }, {
    value: 'Avg',
    label: 'Avg',
  }, {
    value: 'Total',
    label: 'Total',
  },
];

/* Formatting table - formats */
export const tableSelectOptions = {
  string: {
    defaultValue: 'Human Readable Model Name',
    options: [{
      value: 'Human Readable Model Name',
      label: 'Human Readable Model Name',
    }, {
      value: 'String Truncated to 50 Characters with Elipses (...)',
      label: 'String Truncated to 50 Characters with Elipses (...)',
    }],
  },
  datetime: {
    defaultValue: 'Date/Time (M/D/Y H:M:S Z)',
    options: [{
      value: 'Date/Time (M/D/Y H:M:S Z)',
      label: 'Date/Time (M/D/Y H:M:S Z)',
    }, {
      value: 'Date (M/D)',
      label: 'Date (M/D)',
    }, {
      value: 'Date (M/D/YY)',
      label: 'Date (M/D/YY)',
    }, {
      value: 'Date (M/D/YYY)',
      label: 'Date (M/D/YYY)',
    }, {
      value: 'Day Full (Monday)',
      label: 'Day Full (Monday)',
    }, {
      value: 'Day Short (Mon)',
      label: 'Day Short (Mon)',
    }, {
      value: 'Day of Month (27)',
      label: 'Day of Month (27)',
    }, {
      value: 'Day of Month (27th)',
      label: 'Day of Month (27th)',
    }, {
      value: 'Day of Week (1)',
      label: 'Day of Week (1)',
    }, {
      value: 'Hour of Day (24)',
      label: 'Hour of Day (24)',
    }, {
      value: 'Month Full',
      label: 'Month Full',
    }, {
      value: 'Year (YYYY)',
      label: 'Year (YYYY)',
    }],
  },
  number: {
    defaultValue: 'Number (1,234)',
    options: [{
      value: 'Number (1,234)',
      label: 'Number (1,234)',
    }, {
      value: 'Number (1,234.0)',
      label: 'Number (1,234.0)',
    }, {
      value: 'Number, 2 Decimals (1,234.00)',
      label: 'Number, 2 Decimals (1,234.00)',
    }, {
      value: 'Convert Numbers Larger than 1.0e+15 to Exponential Form',
      label: 'Convert Numbers Larger than 1.0e+15 to Exponential Form',
    }, {
      value: 'Currency, 2 Decimals ($1,234.00)',
      label: 'Currency, 2 Decimals ($1,234.00)',
    }],
  },
};
