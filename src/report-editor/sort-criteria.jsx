import React, { Fragment } from 'react';
import { Col } from 'patternfly-react';
import { Field } from 'react-final-form';
import PropTypes from 'prop-types';
import { required } from 'redux-form-validators';
import { FinalFormSelect, FinalFormCheckBox, FieldGroup } from '../forms';
import { __ } from '../global-functions';
import { resetInput } from './helpers';
import { ReportEditorContext } from './report-editor';

const RowDetail = ({ sortType }) => (
  <ReportEditorContext.Consumer>
    {({ rowOptions, stringValues, formatSummaryTimeOptions }) => {
        const rowDetails = (type = 'string') => ({
          number: rowOptions,
          datetime: formatSummaryTimeOptions,
          string: stringValues,
        })[type];

        return (
          <Fragment>
            <Col xs={12}>
              <FieldGroup label="Hide Detail Rows" name="checkboxGroup">
                <Field
                  validate={required({ msg: 'Check input' })}
                  name="hide_details"
                  id="hide_details"
                  type="checkbox"
                  render={({ input, meta }) => (
                    <FinalFormCheckBox validateOnMount input={input} meta={meta} />
                      )}
                />
              </FieldGroup>
            </Col>
            <Col xs={12}>
              <Field
                name="break_format"
                label={__('Format on Summary Row')}
                placeholder={__('Select Format')}
                component={FinalFormSelect}
                options={rowDetails(sortType)}
                clearable
              />
            </Col>
          </Fragment>
        );
    }}
  </ReportEditorContext.Consumer>
);

RowDetail.propTypes = {
  sortType: PropTypes.string,
};

const NumberOfRowsToShow = () => (
  <ReportEditorContext.Consumer>
    {({ rowNumberOptions }) => (
      <Fragment>
        <Col xs={12}>
          <Field
            name="row_limit"
            label={__('Number of Rows to Show')}
            component={FinalFormSelect}
            options={rowNumberOptions}
          />
        </Col>
      </Fragment>
)}
  </ReportEditorContext.Consumer>
);

const OriginalValueOfTimeType = () => (
  <ReportEditorContext.Consumer>
    {({ timeValues }) => (
      <Fragment>
        <Col xs={12}>
          <Field
            name="original_value"
            label={__('Time Format')}
            component={FinalFormSelect}
            options={timeValues}
          />
        </Col>
      </Fragment>
)}
  </ReportEditorContext.Consumer>
);

const SortBy = ({ columns }) => (
  <Fragment>
    <Col xs={12}>
      <Field name="chosenSort1">
        { ({ input: { value } }) => (
          <Field
            name="chosen_sort2"
            label={__('Within Above Field, Sort By')}
            placeholder={__('Nothing selected')}
            component={FinalFormSelect}
            options={columns.filter(option => value.value !== option.value)}
            clearable
          />
        )}
      </Field>
    </Col>
  </Fragment>
);

SortBy.propTypes = {
  columns: PropTypes.array,
};

const SortOrder = ({ ...props }) => (
  <ReportEditorContext.Consumer>
    {({ sortOrderOptions, sortBreaksOptions }) => (
      <Fragment>
        <Col xs={12}>
          <Field
            name="sort_order"
            label={__('Sort Order')}
            component={FinalFormSelect}
            options={sortOrderOptions}
          />
        </Col>
        <Col xs={12}>
          <Field
            name="sort_breaks"
            label={__('Show Sort Breaks')}
            component={FinalFormSelect}
            options={sortBreaksOptions}
          />
        </Col>
        <Field name="sort_breaks" >
          {({ input: { value } }) =>
          (value &&
            <React.Fragment>
              {
                props.options.find(col => col.value === value).value === 'Yes' &&
                <RowDetail {...props} />
              }
              {
                props.options.find(col => col.value === value).value === 'Counts' &&
                <RowDetail {...props} />
              }
            </React.Fragment>
          )}
        </Field>
      </Fragment>
)}
  </ReportEditorContext.Consumer>
);

SortOrder.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
  })).isRequired,
};

const shouldShowTime = (value = {}, columnOptions) => columnOptions.find(column =>
  (column.value === value.value) && column.type === 'datetime');

const SortCriteria = ({ columns, columnOptions, change }) => (
  <ReportEditorContext.Consumer>
    {({ sortBreaksOptions }) => (
      <Fragment>
        <Col xs={12}>
          <h3>{__('Sort Criteria')}</h3>
        </Col>
        <Col xs={12}>
          <Field
            name="chosenSort1"
            label={__('Sort the Report By')}
            placeholder={__('Sort the Report By')}
            render={({ input, ...rest }) => (<FinalFormSelect
              input={resetInput(input, change, 'chosen_sort2', [])}
              {...rest}
            />)}
            options={columns}
            simpleValue={false}
            clearable
          />
        </Col>
        <Field name="chosenSort1" subscription={{ value: true }}>
          {({ input: { value } }) => {
          const showTimeFields = shouldShowTime(value, columnOptions);
          const sortType = value && value.type;
            return (
              <React.Fragment>
                {value && (
                <Field name="columns" subscription={{ value: true }}>
                  {({ input: { value } }) => // eslint-disable-line no-shadow
                   (
                     <React.Fragment>
                       {showTimeFields && <OriginalValueOfTimeType />}
                       {
                        value && (
                          <React.Fragment>
                            <SortOrder options={sortBreaksOptions} showTimeFields={showTimeFields} sortType={sortType} />
                            <SortBy columns={columns} />
                            <NumberOfRowsToShow />
                          </React.Fragment>
                        )
                      }
                     </React.Fragment>
                  )
                }
                </Field>
              )}
              </React.Fragment>
          );
        } }
        </Field>
      </Fragment>
)}
  </ReportEditorContext.Consumer>
);

SortCriteria.propTypes = {
  columns: PropTypes.array,
  columnOptions: PropTypes.array,
  change: PropTypes.func.isRequired,
};

export default SortCriteria;
