import React from 'react';
import PropTypes from 'prop-types';
import { Label } from 'patternfly-react'
import Chip from './Chip'

import AutocompleteTextInput from './AutocompleteTextInput'
import ExpressionEditorPropTypes from './ExpressionEditorPropTypes'

class EditableChip extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      filteredOptions: props.options,
      filterString: this.props.label,
    }
    console.log('editable chip constructor', props);
  }

  static getDerivedStateFromProps (props, state) {
    console.log('editable chipget derived state', props);
    const f = props.options.filter(props.filterOption(state.filterString));

    return {filteredOptions: props.options.filter(props.filterOption(state.filterString))};
  }

  onClick = () => {
    // let{ label, id, item } = this.props;
    // console.log('EditableChip onclick');
    // console.log('ON CLIIIIIIK');
    this.props.onClick(this.props.index);
    // this.props.
  };

  onDoubleClick = () => {
    // let{ label, id, item } = this.props;
    this.props.onDoubleClick(this.props.selected);
  };

  onSubmit = (selected) => {
    console.log('EditableChip submit', selected, this.props.item);
    if (selected.type === 'userinput') {
      selected.parent = this.props.item.parent;
    }
    // let{ label, id, item } = this.props;
    this.setState({filterString: ''});
    this.props.onSubmit(selected, this.props.item);
  }

  onDelete = () => {
    this.props.onDelete(this.props.item)
  }

  onUserInput = (input) => {
    // const f = this.props.options.filter(option => (option.label.includes(input)));
    // const f = this.props.options.filter(this.props.filterOption(input));
    this.setState({filterString: input});
  }

  onKeyDown = (key) => {
    this.props.onKeyDown(key, this.props.index);
  }

  menuNavigationKeyDown = (key) => {
    console.log('on key down', key);

  }



  // filterOptions = (value) => this.props.options.filter(this.props.filterOption(value))

  render() {
    console.log('EditableChip props:', this.props, this.state.filteredOptions);
    return (
      this.props.isEditing &&
        <AutocompleteTextInput
          onSubmit={this.onSubmit}
          onChange={this.onUserInput}
          menuNavigationKeyDown={this.menuNavigationKeyDown}
          options={this.state.filteredOptions}
          value={this.state.filterString}></AutocompleteTextInput>  ||
        <Chip onDelete={this.onDelete}
          onFocus={this.props.onFocus}
          onKeyDown={this.onKeyDown}
          registerChip={this.props.registerChip}
          unregisterChip={this.props.unregisterChip}
          index={this.props.index}
          onClick={this.onClick}
          onDoubleClick={this.onDoubleClick}
          label={this.props.selected.label} />
    )
  }
}

EditableChip.propTypes = {
  onClick: PropTypes.func.isRequired,
  onDoubleClick: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func,
  onDelete: PropTypes.func,
  onFocus: PropTypes.func,
  label: PropTypes.string.isRequired,
  id: PropTypes.any.isRequired,
  item: PropTypes.object,
  isEditing: PropTypes.bool,
  options: PropTypes.arrayOf(ExpressionEditorPropTypes.term).isRequired,
  selected: ExpressionEditorPropTypes.option,
  filterOption: PropTypes.func,
};

EditableChip.defaultProps = {
  item: {},
  selected: {},
  isEditing: true,
  filterOption: (value) => (option) => option.label.toLowerCase().includes(value.toLowerCase()),
}


export default EditableChip;
