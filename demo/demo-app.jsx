import * as ReactDOM from 'react-dom';
import * as React from 'react';
import EnhancedReactSelect from '../src/enhanced-react-select/enhanced-react-select';

const selectOptions = [{
  value: '1',
  label: 'option 1',
  selectedTitle: 'Selected Title 1',
  keyword: 'key 1',
}, {
  value: '2',
  label: 'option 2',
  selectedTitle: 'Selected Title 2',
  keyword: 'key 2',
}, {
  value: '3',
  label: 'option 3',
  selectedTitle: 'Selected Title 3',
  keyword: 'key 3',
}];

class SmartWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
    };
  }

  handleValueChange = selectedOption => this.setState({ selectedOption });

  renderSelect = () => {
    const { selectedOption } = this.state;
    const keyName = 'keyword';
    return (<EnhancedReactSelect
      value={selectedOption}
      options={selectOptions}
      onChange={this.handleValueChange}
      searchable
      filterOptions={(options, filter) => {
        const result = [];
        if (!filter || !filter.replace(/\s/g, '').length) return [...options];
        options.forEach((item) => {
          if (item[keyName].includes(filter) || item.label.includes(filter)) result.push(item);
        });
        return result;
      }}
    />);
  }

  render() {
    return (
      <div>
        {this.renderSelect()}
        <pre>
          {JSON.stringify(this.state.selectedOption, 0, 2)}
        </pre>
      </div>
    );
  }
}

export default function renderApp() {
  ReactDOM.render(
    <SmartWrapper />,
    document.getElementById('demo-app'),
  );
}
