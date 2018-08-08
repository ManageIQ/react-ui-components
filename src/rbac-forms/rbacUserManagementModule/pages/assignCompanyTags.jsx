import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Spinner, Button, Icon, Row, Col, Grid, ButtonGroup } from 'patternfly-react';
import { __ } from '../../../global-functions';
import { GenericPreviewTable } from '../../../table';

class AssignCompanyTags extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: null,
      categoryEntries: {},
      selectedEntries: {},
      isLoaded: false,
      initialAssignments: {},
    };
  }

  componentDidMount() {
    if (this.props.users) {
      const commonTags = this.intersectionWith((a, b) => (a.id === b.id), ...this.props.users.map(user => user.tags));
      const selectedEntries = {};
      commonTags.forEach((tag) => {
        selectedEntries[tag.name.split('/')[2]] = { value: tag.id };
      });
      const finalEntries = {};
      Object.keys(selectedEntries).forEach((categoryName) => {
        finalEntries[this.props.categories.find(category => category.name === categoryName).value] = { ...selectedEntries[categoryName] };
      });
      if (Object.keys(finalEntries).length > 0) {
        this.props.loadMultipleEntries(Object.keys(finalEntries))
          .then((categoryEntries) => {
            Object.keys(finalEntries).forEach((entryId) => {
              finalEntries[entryId] = { ...categoryEntries[entryId].find(item => item.value === parseInt(finalEntries[entryId].value, 10)) };
            });
            this.setState({
              categoryEntries,
              isLoaded: true,
              selectedEntries: finalEntries,
              initialAssignments: finalEntries,
            });
          });
      } else {
        this.setState({ isLoaded: true }); // eslint-disable-line
      }
    } else {
      this.setState({ isLoaded: true }); // eslint-disable-line
    }
  }

  intersectionWith = (comp, first, ...others) => first.filter(a => others.every(arr => arr.some(b => comp(a, b))));

  handleCategorySelect = ({ value }) => {
    this.loadCategoryEntries(value);
    this.setState({ selectedCategory: value });
  };

  handleEntrySelect = value =>
    this.setState(prevState => ({ selectedEntries: { ...prevState.selectedEntries, [prevState.selectedCategory]: value } }));

  handleRemoveEntry = categoryId => this.setState(({ selectedEntries }) => {
    const entries = { ...selectedEntries };
    delete entries[categoryId];
    return { selectedEntries: { ...entries } };
  });

  loadCategoryEntries = (categoryId) => {
    if (!this.state.categoryEntries[categoryId]) {
      this.props.loadCategoryEntry(categoryId)
        .then(entries => this.setState(prevState => ({
          categoryEntries: { ...prevState.categoryEntries, [categoryId]: entries },
        })));
    }
  }

  canSave = () => JSON.stringify(this.state.initialAssignments) !== JSON.stringify(this.state.selectedEntries);
  handleReset = () => this.setState(prevState => ({ selectedCategory: null, selectedEntries: prevState.initialAssignments }))

  renderTableEmptyBody = () => (
    <tr>
      <td />
      <td>{__('No My Company Tags are assigned')}</td>
      <td />
    </tr>
  );

  renderTableBody = (entries, categories, categoryEntries) => Object.keys(entries)
    .map(category => (
      <tr key={category}>
        <td>
          <Button onClick={() => this.handleRemoveEntry(category)}>
            <Icon type="pf" name="close" />
          </Button>
        </td>
        <td>{categories.find(item => item.value === category).label}</td>
        <td>{categoryEntries[category].find(item => item.value === entries[category].value).label}</td>
      </tr>
    ));

  render() {
    const {
      columns,
      categories,
      handleCancel,
      handleSave,
      users,
    } = this.props;
    const {
      selectedCategory,
      categoryEntries,
      selectedEntries,
      isLoaded,
      initialAssignments,
    } = this.state;
    if (!users) return <Redirect to="/" />;
    if (!isLoaded) return <Spinner loading />;
    return (
      <Grid>
        <Row>
          <Col xs={12}>

            <h3>{__('Tag Assignment')}</h3>
            <table className="table table-bordered" style={{ marginBottom: 0 }}>
              <thead>
                <tr>
                  <th>
                    {__('Select a customer tag to assign')}
                  </th>
                  <th>
                    <Select
                      className="final-form-select"
                      optionClassName="final-form-select-option"
                      options={categories}
                      onChange={this.handleCategorySelect}
                      searchable={false}
                      clearable={false}
                      value={selectedCategory}
                    />
                  </th>
                  <th>
                    <Select
                      className="final-form-select"
                      optionClassName="final-form-select-option"
                      options={categoryEntries[selectedCategory]}
                      onChange={this.handleEntrySelect}
                      searchable={false}
                      clearable={false}
                      value={selectedEntries[selectedCategory]}
                      disabled={!selectedCategory}
                    />
                  </th>
                </tr>
              </thead>
            </table>
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th className="table-view-pf-select" />
                  <th>{__('Category')}</th>
                  <th>{__('Assigned Value')}</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(selectedEntries).length > 0 ?
              this.renderTableBody(selectedEntries, categories, categoryEntries) : this.renderTableEmptyBody()}
              </tbody>
            </table>
            <p>
          * Only a single value can be assigned from these categories
            </p>
            <hr />
            <h3>{__('EVM User Being Tagged')}</h3>
            <GenericPreviewTable
              showIcon
              icon={{
            type: 'pf',
            name: 'user',
          }}
              rows={[...users.map(({ role, current_group, ...rest }) => ({ // eslint-disable-line camelcase
            role: role.label,
            current_group: current_group.label,
            ...rest,
          }))]}
              columns={columns}
              rowKey="id"
              rowClick={() => {}}
              rowSelect={() => {}}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} style={{ marginTop: 10 }}>
            <ButtonGroup className="pull-right">
              <Button
                id="user-submit"
                bsStyle="primary"
                disabled={!this.canSave()}
                type="button"
                onClick={() => handleSave(selectedEntries, initialAssignments, users)}
              >
                {__('Save')}
              </Button>
              <Button
                disabled={!this.canSave()}
                type="button"
                onClick={this.handleReset}
              >
                {__('Reset')}
              </Button>
              <Button onClick={handleCancel}>{__('Cancel')}</Button>
            </ButtonGroup>
          </Col>
        </Row>
      </Grid>
    );
  }
}

AssignCompanyTags.propTypes = {
  columns: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  loadCategoryEntry: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  users: PropTypes.array,
  loadMultipleEntries: PropTypes.func.isRequired,
};

const mapStateToProps = ({ usersReducer: { selectedUsers, columns } }) => ({
  users: selectedUsers,
  columns,
});

export default connect(mapStateToProps)(AssignCompanyTags);
