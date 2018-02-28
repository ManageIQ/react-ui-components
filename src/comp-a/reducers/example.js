import { connect } from 'react-redux';
import { otherAction, someAction } from '../actions';
import { ExampleCmp } from '../some-cmp/example.component';

const mapStateToProps = state => ({
  otherAction: state.otherAction,
  someAction: state.someAction,
});

const mapDispatchToProps = dispatch => ({
  onChangeType: data => dispatch(someAction(data)),
  onChangeText: data => dispatch(otherAction(data)),
});

const ExampleConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExampleCmp);

export default ExampleConnected;
