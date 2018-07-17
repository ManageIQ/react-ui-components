import React from 'react';
import PropTypes from 'prop-types';
import TypeaheadWrapper from './TypeaheadWrapper'
import ExpressionEditorPropTypes from './ExpressionEditorPropTypes'


class ExpressionEditor extends React.Component {
  onChange = (selected) => {
    this.props.onChange({ selected });
  };

  render() {
    console.log('EXpresion Editor REACT props:', this.props);
    return (
      <TypeaheadWrapper
        onChange={(selected) => {
          this.onChange(selected);
        }}
        options={this.props.options}
        selected={this.props.selected}
      />
    )
  }
}

ExpressionEditor.propTypes = {
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(ExpressionEditorPropTypes.term),
  selected: PropTypes.array.isRequired,
};


export default ExpressionEditor;
