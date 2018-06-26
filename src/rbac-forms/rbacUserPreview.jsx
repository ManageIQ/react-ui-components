import React from 'react';
import { Grid, Row, Col, FormGroup, Icon } from 'patternfly-react';
import PropTypes from 'prop-types';
import { __ } from '../global-functions';
import './styles.scss';

const previewLink = (value, icon, onClick, key) => (
  <p className="form-control-static" key={key}>
    <Icon type="fa" name={icon} />
    <a style={{ marginLeft: 5 }} className="pointer" onClick={onClick} href="#">{value}</a>
  </p>
);

const renderGroups = groups => groups.map(group => previewLink(group.label, group.icon, group.onClick, group.groupId));

const RbacUserPreview = ({ user }) => (
  <div className="form-horizontal rbac-user-preview">
    <Grid>
      <Row>
        <FormGroup>
          <Col md={2} componentClass="label" className="control-label">
            {__('Full Name')}
          </Col>
          <Col md={8}>
            <p className="form-control-static">{user.name}</p>
          </Col>
        </FormGroup>
      </Row>
      <Row>
        <FormGroup>
          <Col md={2} componentClass="label" className="control-label">
            {__('Username')}
          </Col>
          <Col md={8}>
            <p className="form-control-static">{user.userid}</p>
          </Col>
        </FormGroup>
      </Row>
      <Row>
        <FormGroup>
          <Col md={2} componentClass="label" className="control-label">
            {__('E-mail Address')}
          </Col>
          <Col md={8}>
            <p className="form-control-static">{user.email}</p>
          </Col>
        </FormGroup>
      </Row>
      <Row>
        <FormGroup>
          <Col md={2} componentClass="label" className="control-label">
            {__('Current Group')}
          </Col>
          <Col md={8}>
            {previewLink(user.current_group, 'group', () => console.log('Test'))}
          </Col>
        </FormGroup>
      </Row>
      <Row>
        <FormGroup>
          <Col md={2} componentClass="label" className="control-label">
            {__('Groups')}
          </Col>
          <Col md={8}>
            {renderGroups(user.groups, 'group', () => console.log('Test'))}
          </Col>
        </FormGroup>
      </Row>
      <Row>
        <FormGroup>
          <Col md={2} componentClass="label" className="control-label">
            {__('Role')}
          </Col>
          <Col md={8}>
            {previewLink(user.role, 'user', () => console.log('Test'))}
          </Col>
        </FormGroup>
      </Row>
    </Grid>
  </div>
);

// eslint-disable-next-line
const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


RbacUserPreview.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    userid: PropTypes.string.isRequired,
    email: (props, propName, componentName) => (
      emailPattern.test(props[propName])
        ? undefined
        : new Error(`Invalid prop  ${propName} supplied to ${componentName} Validation failed. Expect email address.`)
    ),
    current_group: PropTypes.string,
    grousp: PropTypes.array,
  }).isRequired,
};

export default RbacUserPreview;
