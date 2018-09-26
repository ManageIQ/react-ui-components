import React from 'react';
import PropTypes from 'prop-types';
import ExpressionEditorPropTypes from './ExpressionEditorPropTypes'
import Menu from './Menu'

export default class AutocompleteTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      menuItemRefs: [React.createRef()],
      index: 0
    }
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
    } else if (e.keyCode == 38) {
      this.setState(prevState => ({index: prevState.index-1}));
      this.focusMenuItem(this.state.index);
    } else if (e.keyCode == 40) {
      this.setState(prevState => ({index: prevState.index+1}));
      this.focusMenuItem(this.state.index);
    }

  }

  registerMenuItem = (ref) => {
    console.log('register:', ref);
    this.setState(prevState => ({menuItemRefs: [...prevState.menuItemRefs, ref]}));
  }

  unregisterMenuItem = (index) => {

  }

  focusMenuItem = (index) => {
    console.log('focus', index);
    this.state.menuItemRefs[index].current.focus();
  }

  onMenuClick = (selected) => {
    console.log('onMenuClick', selected);
    this.props.onSubmit(selected);
  }

  render () {
    console.log('AutocompleteTextInput', this.props, this.state);
    return(
       <div>
         <input ref={this.state.menuItemRefs[0]} value={this.props.value} onKeyDown={this.handleKeyDown} onChange={this.handleChange} fullWidth={true} />
         <Menu options={this.props.options}
           registerMenuItem={this.registerMenuItem}
           unregisterMenuItem={this.unregisterMenuItem}
           onClick={this.onMenuClick}/>
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
  matchingFunction: PropTypes.func,
  menuNavigationKeyDown: PropTypes.func,
}

AutocompleteTextInput.defaultProps = {
  submitKeyCode: 13,
  value: '',
  matchingFunction: (value) => (option) => option.label.toLowerCase().includes(value.toLowerCase())
}
