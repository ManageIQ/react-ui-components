import React, { Component } from 'react';
import { Form, Field, FormSpy } from 'react-final-form';
import { Form as PfForm, Grid, Button, Col, Row, Spinner } from 'patternfly-react';
import PropTypes from 'prop-types';
import { required } from 'redux-form-validators';

import { FinalFormField, FinalFormTextArea, FinalFormSelect } from '../forms/';
import SecurityGroup from './security-group';

class AmazonSecurityFormGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vpcIds: null,
      groups: 1,
    };
  }

  componentDidMount() {
    this.props.loadData().then(vpcIds => this.setState({ vpcIds }));
  }

  parseValues = (values, groupsCount) => {
    const {
      vpc_id, // eslint-disable-line camelcase
      security_group_name, // eslint-disable-line camelcase
      security_group_description, // eslint-disable-line camelcase
      ...rest
    } = values;
    const groups = [];
    for (let i = 0; i < groupsCount; i += 1) {
      const groupKeys = Object.keys(rest)
        .filter(key => key.match(new RegExp(`.*-${i}$`)));
      const group = {};
      groupKeys.forEach((key) => {
        group[key.replace(/-[0-9]+$/, '')] = rest[key];
      });
      groups.push(group);
    }
    return {
      vpc_id,
      security_group_description,
      security_group_name,
      security_group_rules: groups,
    };
  }

  addGroupRule = () => this.setState(prevState => ({ groups: prevState.groups + 1 }));
  removeGroupRule = () => this.setState(prevState => ({ groups: prevState.groups > 1 ? prevState.groups - 1 : 1 }));

  renderGroupRules = (groupsCount) => {
    const groups = [];
    for (let i = 0; i < groupsCount; i += 1) {
      groups.push(<SecurityGroup key={`group-${i}`} groupNumber={i} label={`Group ${i}`} />);
    }
    return groups;
  }

  render() {
    const {
      onSave,
      onCancel,
      updateFormState,
      hideControls,
    } = this.props;
    const { groups, vpcIds } = this.state;
    if (!vpcIds) return <Spinner loading size="lg" />;
    return (
      <Form
        onSubmit={values => onSave(this.parseValues(values, groups))}
        render={({ handleSubmit }) => (
          <PfForm horizontal>
            <FormSpy onChange={state => updateFormState({ ...state, values: this.parseValues(state.values, groups) })} />
            <Grid fluid>
              <Row>
                <Col xs={12}>
                  <Field
                    name="vpc_id"
                    component={FinalFormSelect}
                    label={__('Vpc ID')}
                    validate={required({ msg: __('Id required') })}
                    options={vpcIds}
                    placeholder={__('VPC Id')}
                  />
                </Col>
                <Col xs={12}>
                  <Field
                    name="security_group_name"
                    component={FinalFormField}
                    label={__('Security group name')}
                    validate={required({ msg: __('Group name required') })}
                  />
                </Col>
                <Col xs={12}>
                  <Field
                    name="security_group_description"
                    component={FinalFormTextArea}
                    label={__('Security group description')}
                    validate={required({ msg: __('Description required') })}
                  />
                </Col>
                <hr />
              </Row>
              <Row>
                <h2>{__('Security group rules')}</h2>
                {this.renderGroupRules(groups)}
                <Col xs={12}>
                  <Button onClick={this.addGroupRule}>{__('Add group')}</Button>
                  <Button onClick={this.removeGroupRule}>{__('Remove Group')}</Button>
                </Col>
              </Row>
              {
                !hideControls &&
                <Row>
                  <Col className="pull-right">
                    <Button bsStyle="primary" onClick={handleSubmit}>{__('Submit')}</Button>
                    <Button onClick={onCancel}>{__('Cancel')}</Button>
                  </Col>
                </Row>
              }
            </Grid>
          </PfForm>
        )}
      />
    );
  }
}

AmazonSecurityFormGroup.propTypes = {
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  loadData: PropTypes.func.isRequired,
  updateFormState: PropTypes.func.isRequired,
  hideControls: PropTypes.bool,
};

AmazonSecurityFormGroup.defaultProps = {
  hideControls: false,
};

export default AmazonSecurityFormGroup;
