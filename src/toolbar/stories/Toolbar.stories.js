import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Toolbar } from '..';

const toolbarData = require('../data/toolbar.json');
const viewData = require('../data/toolbar-view.json');

storiesOf('Toolbar', module)
  .add('Toolbar', () => (
    <div style={{ padding: 16 }}>
        <div className="toolbar-pf row">
          <Toolbar
            onClick={action('Toolbar click')}
            groups={toolbarData}
            views={viewData}
          />
       </div>
     </div>));
