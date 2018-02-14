import React from 'react';
import { Alert } from 'patternfly-react';

/**
 * Some component Example doc.
 * ![Alt text](/doc/doc-files/stock-owl.jpg?raw=true "Title")
 */
export class HelloCmp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  bla = () => {
    console.log(this, this.setState);
  };

  render() {
    return (
      <div>
        <Alert type="error">
          I am an Alert
        </Alert>
      </div>
    );
  }
}
