import React from 'react';
import PropTypes from 'prop-types';
import { Typeahead } from 'react-bootstrap-typeahead';

class TypeaheadWrapper extends React.Component {

  render() {
    console.log('Typeahead Wrapper', this.props);

    return (
      <Typeahead
        onChange={(selected) => {
          this.props.onChange(selected);
        }}
        options={this.props.options}
        selected={this.props.selected}
        multiple={this.props.multiple}
      />
    )
  }
}

TypeaheadWrapper.propTypes = {
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  selected: PropTypes.array.isRequired,
  multiple: PropTypes.bool,

};

TypeaheadWrapper.defaultProps = {
  multiple: true,
};

export default TypeaheadWrapper;
