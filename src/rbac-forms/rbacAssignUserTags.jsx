import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { Spinner, Button, Icon, Row, Col, Grid, ButtonGroup } from 'patternfly-react';
import { intersectionWith } from '../helpers';
import { __ } from '../global-functions';
import { GenericPreviewTable } from '../table';

class RbacAssignCompanyTags extends Component {
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
    const { users, categories } = this.props;
    const commonTags = intersectionWith((firstTag, secondTag) => (firstTag.id === secondTag.id), ...users.map(user => user.tags));
    const tagsNames = {};
    const selectedEntries = {};
    commonTags.forEach((tag) => {
      const categoryName = tag.name.split('/')[2];
      tagsNames[categoryName] = { value: tag.id };
      selectedEntries[categories.find(category => category.name === categoryName).value] = { ...tagsNames[categoryName] };
    });
    if (Object.keys(selectedEntries).length > 0) this.loadInitialEntries(selectedEntries);
    else this.setState({ isLoaded: true }); // eslint-disable-line react/no-did-mount-set-state
  }

  loadInitialEntries = entries => this.props.loadMultipleEntries(Object.keys(entries))
    .then((categoryEntries) => {
      const selectedEntries = {};
      Object.keys(entries).forEach((entryId) => {
        selectedEntries[entryId] = { ...categoryEntries[entryId].find(item => item.value === parseInt(entries[entryId].value, 10)) };
      });
      this.setState({
        categoryEntries,
        isLoaded: true,
        selectedEntries,
        initialAssignments: { ...selectedEntries },
      });
    });

  loadCategoryEntries = (categoryId) => {
    if (!this.state.categoryEntries[categoryId]) {
      this.props.loadCategoryEntry(categoryId)
        .then(entries => this.setState(prevState => ({
          categoryEntries: { ...prevState.categoryEntries, [categoryId]: entries },
        })));
    }
  }

  handleCategorySelect = ({ value }) => {
    this.loadCategoryEntries(value);
    this.setState({ selectedCategory: value });
  }

  handleEntrySelect = value =>
    this.setState(prevState => ({ selectedEntries: { ...prevState.selectedEntries, [prevState.selectedCategory]: value } }));

  handleRemoveEntry = categoryId => this.setState(({ selectedEntries }) => {
    const entries = { ...selectedEntries };
    delete entries[categoryId];
    return { selectedEntries: { ...entries } };
  });

  canSave = () => JSON.stringify(this.state.initialAssignments) !== JSON.stringify(this.state.selectedEntries);
  handleReset = () => this.setState(prevState => ({ selectedCategory: null, selectedEntries: prevState.initialAssignments }))

  renderEmptyTableBody = () => (
    <tr>
      <td />
      <td>{__('No My Company Tags are assigned')}</td>
      <td />
    </tr>
  )

  renderTableBody = (entries, categories, categoryEntries) => Object.keys(entries)
    .map(category => (
      <tr key={category}>
        <td>
          <Button id={`remove-entry-${category}`} onClick={() => this.handleRemoveEntry(category)}>
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
    if (!isLoaded) return <Spinner loading />;
    return (
      <Grid fluid>
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
              this.renderTableBody(selectedEntries, categories, categoryEntries) : this.renderEmptyTableBody()}
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
              rows={[...users]}
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
                id="user-reset"
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

RbacAssignCompanyTags.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object),
  categories: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })),
  loadCategoryEntry: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.object),
  loadMultipleEntries: PropTypes.func.isRequired,
};

export default RbacAssignCompanyTags;
