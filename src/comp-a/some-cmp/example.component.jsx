import React from 'react';
import { Alert, FormControl } from 'patternfly-react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import Select from 'react-select';

/**
 * Some component Example doc.
 * ![Alt text](/doc/doc-files/stock-owl.jpg?raw=true "Title")
 */
export class ExampleCmp extends React.Component {
  bla = () => 'some text';

  selectValue = (data) => {
    this.props.onChangeType(data.value);
  };

  @autobind
  handleChange(event) {
    this.props.onChangeText(event.target.value);
  }

  render() {
    return (
      <div className="some-class">
        <Select
          options={[
            { value: 'error', label: 'Error' },
            { value: 'warning', label: 'Warning' },
            { value: 'success', label: 'Success' },
            { value: 'info', label: 'Info' },
          ]}
          value={this.props.someAction && this.props.someAction.someValue}
          onChange={this.selectValue}
        />
        <FormControl onChange={this.handleChange} value={(this.props.otherAction && this.props.otherAction.otherValue) || ''} />
        <Alert type={(this.props.someAction && this.props.someAction.someValue) || 'error'}>
          {(this.props.otherAction && this.props.otherAction.otherValue) || 'Placeholder'}
        </Alert>
      </div>
    );
  }
}

ExampleCmp.propTypes = {
  onChangeText: PropTypes.func,
  onChangeType: PropTypes.func,
  someAction: PropTypes.object,
  otherAction: PropTypes.object,
};

ExampleCmp.defaultProps = {
  onChangeText: () => {},
  onChangeType: () => {},
  someAction: { someValue: 'error' },
  otherAction: { otherValue: 'something' },
};
