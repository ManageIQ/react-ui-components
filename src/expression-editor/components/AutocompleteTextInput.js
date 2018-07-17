import React from 'react';
import PropTypes from 'prop-types';
import ExpressionEditorPropTypes from './ExpressionEditorPropTypes'
import Menu from './Menu'

export default class AutocompleteTextInput extends React.Component {
  constructor(props) {
    super(props);
  }

  handleChange = ({target: {value}}) => {
    // console.log('handle change:', value);
    // this.setState({ value: value });
    this.props.onChange(value);
  }

  handleKeyDown = (e) => {
    // console.log('key: ', e.keyCode);

    if (e.keyCode == this.props.submitKeyCode) {
      const value = e.target.value;
      const selected = this.props.options.find(this.props.matchingFunction(value)) || {id: value, label: value, type: "userinput", next: []};
      this.props.onSubmit(selected);
    }
  }

  onMenuClick = (selected) => {
    console.log('onMenuClick', selected);
    this.props.onSubmit(selected);
  }

  render () {
    console.log('AutocompleteTextInput', this.props);
    return(
       <div>
         <input value={this.props.value} onKeyDown={this.handleKeyDown} onChange={this.handleChange} fullWidth={true} />
         <Menu options={this.props.options} onClick={this.onMenuClick}/>
       </div>

    )
  }
}

AutocompleteTextInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  submitKeyCode: PropTypes.number,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(ExpressionEditorPropTypes.option).isRequired,
  matchingFunction: PropTypes.func
}

AutocompleteTextInput.defaultProps = {
  submitKeyCode: 13,
  value: '',
  matchingFunction: (value) => (option) => option.label.toLowerCase().includes(value.toLowerCase())
}
