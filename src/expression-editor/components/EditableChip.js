import React from 'react';
import PropTypes from 'prop-types';
import Chip from './Chip';

import AutocompleteTextInput from './AutocompleteTextInput';
import ExpressionEditorPropTypes from './ExpressionEditorPropTypes';

class EditableChip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredOptions: props.options,
      filterString: this.props.label,
    };
    // console.log('editable chip constructor', props);
  }

  static getDerivedStateFromProps(props, state) {
    // console.log('editable chipget derived state', props);
    return { filteredOptions: props.options.filter(props.filterOption(state.filterString)) };
  }

  onClick = () => {
    this.props.onClick(this.props.index);
  };

  onDoubleClick = () => {
    this.props.onDoubleClick(this.props.selected);
  };

  onSubmit = (selected) => {
    // console.log('EditableChip submit', selected, this.props.item);
    const newSelected = selected;
    if (selected.type === 'userinput') {
      // console.log('SUMBIT:',selected);
      newSelected.parent = this.props.item.parent;
    }
    // let{ label, id, item } = this.props;
    this.setState({ filterString: '' });
    this.props.onSubmit(newSelected, this.props.item);
  }

  onDelete = () => {
    // console.log('on DELETEE');
    this.props.onDelete(this.props.item);
  }

  onFocus = () => {
    // console.log('on FOCUSSSSSSSS');
    this.props.onFocus(this.props.item);
  }

  onBlur = () => {
    // console.log('on bluuuuuuuuuuuuuuuuuur');
    this.props.onBlur(this.props.item);
  }

  onUserInput = (input) => {
    this.setState({ filterString: input });
  }

  onKeyDown = (key) => {
    this.props.onKeyDown(key, this.props.index, this.props.selected);
  }

  render() {
    // console.log('EditableChip props:', this.props);
    return (
      (this.props.isEditing &&
        <AutocompleteTextInput
          onSubmit={this.onSubmit}
          onChange={this.onUserInput}
          onKeyDown={this.onKeyDown}
          options={this.state.filteredOptions}
          value={this.state.filterString}
          // registerInput={this.props.registerInput}
          // unregisterInput={this.props.unregisterInput}
          inputRef={this.props.inputRef}
          index={this.props.index}
          next={this.props.item.next}
        />) ||
        <Chip
          onDelete={this.onDelete}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onKeyDown={this.onKeyDown}
          registerChip={this.props.registerChip}
          unregisterChip={this.props.unregisterChip}
          index={this.props.index}
          onClick={this.onClick}
          onDoubleClick={this.onDoubleClick}
          label={this.props.selected.label}
        />
    );
  }
}

EditableChip.propTypes = {
  onClick: PropTypes.func.isRequired,
  onDoubleClick: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  onKeyDown: PropTypes.func,
  onDelete: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  registerChip: PropTypes.func,
  unregisterChip: PropTypes.func,
  label: PropTypes.string.isRequired,
  item: PropTypes.object,
  index: PropTypes.number.isRequired,
  isEditing: PropTypes.bool,
  options: PropTypes.arrayOf(ExpressionEditorPropTypes.term).isRequired,
  selected: ExpressionEditorPropTypes.option,
  filterOption: PropTypes.func,
};

EditableChip.defaultProps = {
  item: {},
  selected: {},
  isEditing: true,
  filterOption: value => option => option.label.toLowerCase().includes(value.toLowerCase()),
};


export default EditableChip;
