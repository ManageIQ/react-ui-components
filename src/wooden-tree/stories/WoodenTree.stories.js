import * as React from 'react';
import PropTypes from 'prop-types';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';
import { storiesOf } from '@storybook/react';
import Tree, { callBack, ActionTypes } from '../';
import { generator, flatLazyChildren } from './Generator';
import { ReduxTree } from './components/ReduxTree';
import { ConnectedNode } from './components/ReduxNode';
import combinedReducers from './reducers';

/** Create the tree from hierarchical data */
const tree = Tree.convertHierarchicalTree(Tree.initHierarchicalTree(generator()));
/** The store */
const store = createStore(combinedReducers);

class App extends React.Component {
  /**
   * Initialize the tree after the component mounted.
   */
  componentDidMount() {
    this.props.callBack(null, ActionTypes.ADD_NODES, tree);
  }

  /**
   * On data change this function is called. In this example it is just
   * dispatches redux event (and for demo app purposes logs the dispatched event).
   *
   * @param command The commands which is requested by the tree.
   */
  onDataChange = (command) => {
    for (let i = 0; i < command.length; i += 1) {
      // eslint-disable-next-line react/prop-types
      this.props.callBack(command[i].nodeId, command[i].type, command[i].value);
    }
  };

  /**
   * The lazy load callback returns a new promise. In this example
   * we return few children if it was requested for a specific node id.
   * Otherwise we return reject.
   *
   * @param node The node which is getting lazy loaded
   */
  lazyLoad = node => new Promise((resolve, reject) => {
    setTimeout(() => {
      if (node.nodeId === '0.3') {
        resolve(flatLazyChildren(node.nodeId));
      } else {
        reject(new Error('Something happened.'));
      }
    }, 2000);
  });

  render() {
    return (
      <ReduxTree
        hierarchicalCheck
        showCheckbox
        multiSelect={false}
        preventDeselect
        allowReselect
        checkboxFirst
        connectedNode={ConnectedNode}
        nodeIcon="fa fa-file-o"
        callbacks={
          {
            onDataChange: this.onDataChange,
            lazyLoad: this.lazyLoad,
          }
        }
      />
    );
  }
}

App.propTypes = {
  callBack: PropTypes.func.isRequired,
};

const WoodenTreeExample = connect(null, { callBack })(App);

storiesOf('WoodenTree', module)
  .add('WoodenTreeExample', () => <Provider store={store}><WoodenTreeExample /></Provider>);
