import React from 'react';
import EditableChip from '../EditableChip';

export default class MockEditableChip extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      isEditing: true,
      label: '',
      options: [
        { label: 'Host IP', id: 1, type: 'category'},
        { label: 'Host Name', id: 2, type: 'category'},
        { label: 'VM location', id: 3, type: 'category'},
        { label: 'VM parent', id: 4, type: 'category'},
      ],
      selected: { label:"default", id: 0, type: 'default'}

    }
  }

  onClick = (selected) => {
    this.setState({isEditing: !this.state.isEditing});
    console.log(selected);
  }

  onSubmit = (selected) => {
    this.setState({label: selected.label, isEditing: false});
    this.setState({selected: selected})
  }

  render () {

    return <EditableChip
      id={1}
      label={this.state.label}
      isEditing={this.state.isEditing}
      onClick={this.onClick}
      onDoubleClick={this.onClick}
      onSubmit={this.onSubmit}
      options={this.state.options}
      selected={this.state.selected}
    />
  }
}
