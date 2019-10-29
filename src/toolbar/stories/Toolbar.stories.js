import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Toolbar } from '..';

const toolbarData = require('../data/toolbar.json');
const viewData = require('../data/toolbar-view.json');
const toolbarBigData = require('../data/toolbar-big.json');

storiesOf('Toolbar', module)
  .add('Toolbar', () => (
    <React.Fragment>
      <div className="container-fluid">
        <div className="toolbar-pf row">
          <div className="col-sm-12">
            <Toolbar
              onClick={action('Toolbar click')}
              onViewClick={action('Toolbar click')}
              groups={toolbarData}
              views={viewData}
            />
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="toolbar-pf row">
          <div className="col-sm-12">
            <Toolbar
              onClick={action('Toolbar click')}
              onViewClick={action('Toolbar click')}
              groups={toolbarBigData}
              views={viewData}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  ));
