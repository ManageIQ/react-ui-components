import React from 'react';
import PropTypes from 'prop-types';
import ExpressionEditorPropTypes from './ExpressionEditorPropTypes'
import Menu from './Menu'

export default class AutocompleteTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      menuItemRefs: props.options.map(() => React.createRef()),
      toDelete: {},
      index: 0,
    }
    this.inputRef = React.createRef();

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
      let selected = {};
      if (this.state.index == 0) {
        selected = this.props.options.find(this.props.matchingFunction(value)) || {id: value, label: value, type: "userinput", next: []};
      } else {
        selected = this.props.options[this.state.index];
      }
      this.props.onSubmit(selected);
      this.setState({index: 0, menuItemRefs: []});
    } else if (e.keyCode == 38) {
      this.focusMenuItem(this.state.index-1);
      this.setState(prevState => ({index: prevState.index-1}));
    } else if (e.keyCode == 40) {
      this.focusMenuItem(this.state.index+1);
      this.setState(prevState => ({index: prevState.index+1}));
    } else {
      this.setState({index: 0});
    }

  }

  registerMenuItem = (ref) => {
    console.log('register:', ref);
    this.setState(prevState => ({menuItemRefs: [...prevState.menuItemRefs, ref]}));
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('cdu');
    if(prevProps.options.length !== this.props.options.length) {
      this.setState({menuItemRefs: this.props.options.map(() => React.createRef())});
    }
    /*if(JSON.stringify(prevState.toDelete) !== JSON.stringify(this.state.toDelete)) {
      this.setState(prevState => {
        const indexes = Object.keys(prevState.toDelete).map(index => parseInt(index, 10));
        const refs = prevState.menuItemRefs.map((item, i) => {
          if(indexes.includes(i)) {
            return undefined
          }
          return item
        }).filter(item => !!item);
        return {toDelete: {}, menuItemRefs: refs};
      })
    }*/
  }

  unregisterMenuItem = (index) => {
    // let refs = [...this.state.menuItemRefs];
    // refs.splice(index, 1)
    // this.setState({menuItemRefs: [...refs]});
    console.log('unregister', index);
    console.log('refs: ', [...this.state.menuItemRefs.slice(0, index), ...this.state.menuItemRefs.slice(index + 1)]);
    //this.setState(prevState => ({menuItemRefs: [...prevState.menuItemRefs.slice(0, index), ...prevState.menuItemRefs.slice(index + 1)]}));
    this.setState(prevState => ({ toDelete: { ...prevState.toDelete, [index]: true } }))
  }

  updateMenuItem= (ref, index) => {
      this.setState(prevState => ([...prevState.menuItemRefs]));
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
         <input ref={this.inputRef} value={this.props.value} onKeyDown={this.handleKeyDown} onChange={this.handleChange} fullWidth={true} />
         <Menu options={this.props.options}
           registerMenuItem={this.registerMenuItem}
           unregisterMenuItem={this.unregisterMenuItem}
           focusedIndex={this.state.index}
           menuItemRefs={this.state.menuItemRefs}
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
