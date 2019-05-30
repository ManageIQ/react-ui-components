import React, { Fragment } from 'react';
import { Col } from 'patternfly-react';
import { Field } from 'react-final-form';
import { FinalFormSelect } from '../forms';
import { __ } from '../global-functions';
import { ReportEditorContext } from './report-editor';

const PdfOutput = () => (
  <ReportEditorContext.Consumer>
    {({ pdfOptions }) => (
      <Fragment>
        <Col xs={12}>
          <h3>{__('PDP Output')}</h3>
        </Col>
        <Col xs={12}>
          <Field
            name="pdf_page_size"
            label={__('Page Size')}
            component={FinalFormSelect}
            options={pdfOptions}
          />
        </Col>
        <hr />
      </Fragment>
)}
  </ReportEditorContext.Consumer>
);

export default PdfOutput;
