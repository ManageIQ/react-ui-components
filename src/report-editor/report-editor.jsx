import React, { createContext } from 'react';
import { Form } from 'react-final-form';
import { TabContainer, Nav, NavItem, TabContent, TabPane, Form as PfForm, Row, Grid, Button } from 'patternfly-react';
import PropTypes from 'prop-types';
import { __ } from '../global-functions';
import ConfigureReportColumns from './configure-report-columns';
import SortCriteria from './sort-criteria';
import GroupRecordsBy from './consolidation';
import BasicReportInfo from './basic-info';
import ReportCreationTimeout from './creation-timeout';
import PdfOutput from './pdf-output';
import FormattingTable from './formatting-table';
import ChartsTabWarning from './charts-warning';
import TimelineTabWarning from './timeline-warning';

const consolidationDisabled = (chosenModel, columns) => !chosenModel || chosenModel.length === 0 || !columns || columns.length === 0;

export const ReportEditorContext = createContext();

const ReportEditor = ({ submit, ...props }) => (
  <div className="report-editor">
    <Grid fluid>
      <h1>{__('Adding a new Report')}</h1>
      <Form
        onSubmit={submit}
        initialValues={{
          chosen_queue_timeout: '1 Hour',
          pdf_page_size: 'A4 - 210mm x 297mm',
          sort_order: 'Asc',
          sort_breaks: 'No',
          row_limit: 'All',
          original_value: 'Original Value',
          columns: [],
        }}
        render={({ handleSubmit, values, form: { change } }) => {
          const disableTabs = consolidationDisabled(values.chosen_model, values.columns);
          return (
            <PfForm horizontal>
              <ReportEditorContext.Provider value={props}>
                <Row>
                  <TabContainer id="basic-tabs-pf" defaultActiveKey={1} >
                    <div>
                      <Nav bsClass="nav nav-tabs nav-tabs-pf">
                        <NavItem eventKey={1}>
                          {__('Columns')}
                        </NavItem>
                        <NavItem eventKey={2} disabled={disableTabs}>
                          {__('Consolidation')}
                        </NavItem>
                        <NavItem eventKey={3} disabled={disableTabs}>
                          {__('Formatting')}
                        </NavItem>
                        <NavItem eventKey={4} disabled={disableTabs}>
                          {__('Summary')}
                        </NavItem>
                        <NavItem eventKey={5} disabled={disableTabs}>
                          {__('Charts')}
                        </NavItem>
                        <NavItem eventKey={6} disabled={disableTabs}>
                          {__('Timeline')}
                        </NavItem>
                      </Nav>
                      <TabContent animation>
                        <TabPane eventKey={1}>
                          <BasicReportInfo />
                          <ConfigureReportColumns change={change} />
                          <ReportCreationTimeout />
                        </TabPane>
                        <TabPane eventKey={2}>
                          {
                          values.columns && values.columns.length > 0 &&
                          <GroupRecordsBy columns={values.columns} />
                        }
                        </TabPane>
                        <TabPane eventKey={3}>
                          <PdfOutput />
                          <FormattingTable values={values} />
                        </TabPane>
                        <TabPane eventKey={4}>
                          {
                        values.columns && values.columns.length > 0 &&
                        <SortCriteria
                          columnOptions={props.columnOptions}
                          columns={values.columns}
                          change={change}
                        />
                      }
                        </TabPane>
                        <TabPane eventKey={5}>
                          <ChartsTabWarning
                            columns={values.columns}
                            chosenSort1={!!values.chosenSort1}
                            change={change}
                          />
                        </TabPane>
                        <TabPane eventKey={6}>
                          <TimelineTabWarning columnOptions={props.columnOptions} columns={values.columns} />
                        </TabPane>
                      </TabContent>
                    </div>
                  </TabContainer>
                </Row>
                <Row>
                  <hr />
                  <Button onClick={handleSubmit}>
                    {__('Add')}
                  </Button>
                </Row>
              </ReportEditorContext.Provider>
            </PfForm>
        );
      }}
      />
    </Grid>
  </div>
);

ReportEditor.propTypes = {
  submit: PropTypes.func.isRequired,
  columnOptions: PropTypes.array.isRequired,
};

export default ReportEditor;
