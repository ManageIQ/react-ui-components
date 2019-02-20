import React from 'react';
import { storiesOf } from '@storybook/react';
import { Quadicon } from '..';

import './styles.scss';

import { quads, numbers, piecharts, hosts, vms, containerproviders } from '../data/quadicons';

storiesOf('Quadicon', module)
  .add('Quadicon', () => (
    <React.Fragment>
      <div className="pull-left" style={{ padding: '10px' }}>
        { quads.map(quad => (
          <div className="pull-left" style={{ padding: '10px' }}>
            <Quadicon data={quad} />
          </div>
        ))}
      </div>
      <div className="clearfix" />
      <hr />
      <h2>Text sizing and number abbreviation</h2>
      <div className="pull-left" style={{ padding: '10px' }}>
        { numbers.map(quad => (
          <div className="pull-left" style={{ padding: '10px' }}>
            <Quadicon data={quad} />
          </div>
        ))}
      </div>
      <div className="clearfix" />
      <hr />
      <h2>Pie charts</h2>
      <div className="pull-left" style={{ padding: '10px' }}>
        { piecharts.map(quad => (
          <div className="pull-left" style={{ padding: '10px' }}>
            <Quadicon data={quad} />
          </div>
        ))}
      </div>
      <div className="clearfix" />
      <hr />
      <h2>ManageIQ Examples</h2>
      <h3>Hosts</h3>
      <div className="pull-left" style={{ padding: '10px' }}>
        { hosts.map(quad => (
          <div className="pull-left" style={{ padding: '10px' }}>
            <Quadicon data={quad} />
          </div>
        ))}
      </div>
      <div className="clearfix" />
      <h3>VMs</h3>
      <div className="pull-left" style={{ padding: '10px' }}>
        { vms.map(quad => (
          <div className="pull-left" style={{ padding: '10px' }}>
            <Quadicon data={quad} />
          </div>
        ))}
      </div>
      <div className="clearfix" />
      <h3>Container Providers</h3>
      <div className="pull-left" style={{ padding: '10px' }}>
        { containerproviders.map(quad => (
          <div className="pull-left" style={{ padding: '10px' }}>
            <Quadicon data={quad} />
          </div>
        ))}
      </div>
    </React.Fragment>));
