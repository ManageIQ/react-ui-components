import { connect } from 'react-redux';
import { Node } from '../../';

const mapStateToProps = ({ treeData }, ownProps) => ({ ...treeData[ownProps.nodeId] });

export const ConnectedNode = connect(mapStateToProps)(Node);
