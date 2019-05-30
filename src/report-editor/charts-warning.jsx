import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Col, Icon } from 'patternfly-react';
import { Field } from 'react-final-form';
import { FinalFormSelect } from '../forms';
import { __ } from '../global-functions';
import { resetInput } from './helpers';


const ChartsTabWarning = ({ columns, change, chosenSort1 }) => (!chosenSort1 ? (
  <Fragment>
    <Col xs={12} >
      <h3>
        <Icon type="pf" name="trend-up" className="report-editor-icon" />
        {__('Charts tab is not available unless a')} <strong>{__('sort field from Summary tab ')}</strong> {__('has been selected.')}
      </h3>
    </Col>
    <Col xs={12}>
      <Field
        name="chosenSort1"
        label={__('Sort the Report By')}
        placeholder={__('Please, select a sort field.')}
        component={FinalFormSelect}
        render={({ input, ...rest }) => (<FinalFormSelect
          input={resetInput(input, change, 'columns', [])}
          {...rest}
        />)}
        options={columns}
      />
    </Col>
  </Fragment>
) : __('Charts component has been loaded.'));

ChartsTabWarning.propTypes = {
  columns: PropTypes.array,
  change: PropTypes.func.isRequired,
  chosenSort1: PropTypes.bool,
};

export default ChartsTabWarning;
