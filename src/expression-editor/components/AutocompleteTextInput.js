import React from 'react';
import PropTypes from 'prop-types';
import ExpressionEditorPropTypes from './ExpressionEditorPropTypes';
import Menu from './Menu';

export default class AutocompleteTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuItemRefs: props.options.map(() => React.createRef()),
      toDelete: {},
      index: 0,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.options.length !== this.props.options.length) {
      this.setState({ menuItemRefs: this.props.options.map(() => React.createRef()) });
    }
  }

  onMenuClick = (selected) => {
    // console.log('onMenuClick', selected);
    this.props.onSubmit(selected);
  }

  onBlur = () => {
    if (this.props.isLastElement === false) {
      const selected = this.props.options.find(this.props.matchingFunction(this.props.value)) || {
        id: this.props.value, label: this.props.value, type: 'userinput', next: this.props.next,
      };
      console.log('XXXXXXXXXXXXXX', selected);
      this.props.onSubmit(selected);
    }
  }

  handleKeyDown = (e) => {
    const { target: { value } } = e;
    if (e.keyCode === this.props.submitKeyCode) {
      let selected = {};
      if (this.state.index === 0) {
        selected = this.props.options.find(this.props.matchingFunction(value)) || {
          id: value, label: value, type: 'userinput', next: this.props.next,
        };
      } else {
        selected = this.props.options[this.state.index];
      }
      this.props.onSubmit(selected);
      this.setState({ index: 0, menuItemRefs: [] });
    } else if (e.keyCode === 38) {
      const index = this.state.index <= 0 ? this.state.index : this.state.index - 1;
      this.focusMenuItem(index);
      this.setState(prevState => ({ index }));
    } else if (e.keyCode === 40) {
      const index = this.state.index >= this.state.menuItemRefs.length - 1 ? this.state.menuItemRefs.length - 1 : this.state.index + 1;
      this.focusMenuItem(index);
      this.setState(prevState => ({ index }));
    } else if (e.keyCode === 37) {
      if (value === '') {
        this.props.onKeyDown(e);
      }
    } else {
      this.setState({ index: 0 });
    }
  }

  registerMenuItem = (ref) => {
    // console.log('register:', ref);
    this.setState(prevState => ({ menuItemRefs: [...prevState.menuItemRefs, ref] }));
  }

  unregisterMenuItem = (index) => {
    this.setState(prevState => ({ toDelete: { ...prevState.toDelete, [index]: true } }));
  }

  focusMenuItem = (index) => {
    // console.log('focus', index);
    this.state.menuItemRefs[index].current.focus();
  }

  onMouseEnter = (index) => {
    this.setState({ index });
  }

  onMouseLeave = (a) => {
    console.log('MOUSE LEAVE', a);
  }

  handleChange = ({ target: { value } }) => {
    // console.log('handle change:', value);
    // this.setState({ value: value });
    this.props.onChange(value);
  }


  render() {
    // console.log('AutocompleteTextInput', this.props, this.state);
    return (
      <span>
        <div>
          <input ref={this.props.inputRef}
            autoFocus
            value={this.props.value}
            onKeyDown={this.handleKeyDown}
            onBlur={this.onBlur}
            onChange={this.handleChange}
            fullWidth />
          <Menu
            options={this.props.options.filter(o => o.type !== "userinput")}
            registerMenuItem={this.registerMenuItem}
            unregisterMenuItem={this.unregisterMenuItem}
            focusedIndex={this.state.index}
            menuItemRefs={this.state.menuItemRefs}
            onClick={this.onMenuClick}
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
          />
        </div>
      </span>

    );
  }
}

AutocompleteTextInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  submitKeyCode: PropTypes.number,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  inputRef: PropTypes.object.isRequired,
  options: PropTypes.arrayOf(ExpressionEditorPropTypes.option).isRequired,
  next: PropTypes.arrayOf(ExpressionEditorPropTypes.term),
  matchingFunction: PropTypes.func,
};

AutocompleteTextInput.defaultProps = {
  submitKeyCode: 13,
  value: '',
  matchingFunction: value => option => option.label.toLowerCase().includes(value.toLowerCase()),
};
