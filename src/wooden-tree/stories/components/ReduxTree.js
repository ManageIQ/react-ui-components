import { connect } from 'react-redux';
import Tree from '../../';

const mapStateToProps = ({ treeData }) => ({ data: { ...treeData } });

export const ReduxTree = connect(mapStateToProps)(Tree);
