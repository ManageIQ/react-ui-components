import React, { PureComponent } from 'react';
import { Provider, connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter, goBack } from 'connected-react-router';
import { Button, Grid, Row, Col, ListGroup, ListGroupItem } from 'patternfly-react';
import PropTypes from 'prop-types';
import { history, store } from './redux/reducers/';
import { navigate, requestUsers, deleteUser } from './redux/actions/actions';
import UsersList from './pages/usersList';
import UserAdd from './pages/userAdd';
import UserEdit from './pages/userEdit';
import UserPreview from './pages/userPreview';
import { data } from './redux/data';

const Toolbar = ({
  handleAdd,
  handleEdit,
  canEdit,
  editUserId,
  handleDelete,
}) => (
  <div style={{ marginBottom: 10 }}>
    <Button onClick={handleAdd}>Add</Button>
    <Button disabled={!canEdit} onClick={() => handleEdit(editUserId)}>Edit selected</Button>
    <Button disabled={!canEdit} onClick={() => handleDelete(editUserId)}>Delete selected</Button>
  </div>
);

Toolbar.propTypes = {
  handleAdd: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  canEdit: PropTypes.bool.isRequired,
  editUserId: PropTypes.number,
  handleDelete: PropTypes.func.isRequired,
};

const mapToolbarProps = ({ usersReducer: { selectedUsers } }) => ({
  canEdit: !!(selectedUsers && selectedUsers.length === 1),
  editUserId: selectedUsers ? selectedUsers[0].id : undefined,
});

const mapToolbarDispatch = (dispatch, { deleteCallback }) => ({
  handleAdd: () => dispatch(navigate('/add')),
  handleEdit: userId => dispatch(navigate(`/edit/${userId}`)),
  handleDelete: userId => dispatch(deleteUser(userId, deleteCallback)),
});

const ConnectedToolbar = connect(mapToolbarProps, mapToolbarDispatch)(Toolbar);


const Tree = ({ users, onUserClick, back }) => (
  <ListGroup>
    {users.map(user => <ListGroupItem key={`user-${user.id}`} onClick={() => onUserClick(user.id)}>{user.name}</ListGroupItem>)}
    <ListGroupItem onClick={back}>Back in history</ListGroupItem>
  </ListGroup>
);

Tree.propTypes = {
  users: PropTypes.array,
  onUserClick: PropTypes.func,
  back: PropTypes.func,
};

const mapTreeProps = ({ usersReducer: { rows } }) => ({
  users: rows,
});

const mapTreeDispatch = dispatch => ({
  onUserClick: userId => dispatch(navigate(`/preview/${userId}`)),
  back: () => dispatch(goBack()),
});

const ConnectedTree = connect(mapTreeProps, mapTreeDispatch)(Tree);


class App extends PureComponent {
  componentDidMount() {
    this.props.loadUsersData(this.mockUsersRequest);
  }

  mockUsersRequest = () => new Promise(resolve => setTimeout(() => resolve(data), 1500))
  mockUserSave = () => this.mockUsersRequest();
  mockUserDelete = () => this.mockUsersRequest()

  renderUserAdd = props => <UserAdd onSave={this.mockUserSave} {...props} />;
  renderuserEdit = props => <UserEdit onSave={this.mockUserSave} {...props} />;

  render() {
    if (!this.props.isLoaded) {
      return <div>Loading</div>;
    }
    return (
      <Grid fluid>
        <Row>
          <Col xs={2}>
            <ConnectedTree />
          </Col>
          <Col xs={10}>
            <ConnectedToolbar deleteCallback={this.mockUserDelete} />
            <ConnectedRouter history={history}>
              <div>
                <Switch>
                  <Route exact path="/" component={UsersList} />
                  <Route path="/add" render={props => this.renderUserAdd(props)} />
                  <Route path="/preview/:userId" component={UserPreview} />
                  <Route path="/edit/:userId" render={props => this.renderuserEdit(props)} />
                </Switch>
              </div>
            </ConnectedRouter>
          </Col>
        </Row>
      </Grid>
    );
  }
}

App.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
  loadUsersData: PropTypes.func.isRequired,
};

const mapAppToProps = ({ usersReducer: { isLoaded } }) => ({ isLoaded });
const mapAppToDispatch = dispatch => ({
  loadUsersData: callBack => dispatch(requestUsers(callBack)),
});

const WrappedApp = connect(mapAppToProps, mapAppToDispatch)(App);


const wrapper = () => (
  <Provider store={store}>
    <WrappedApp />
  </Provider>
);

export default wrapper;
