import React from 'react';
import autobind from 'autobind-decorator';

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

  @autobind
  bla() {
    console.log(this, this.setState);
  }

  render() {
    return (
      <div>
        Hello
        {this.bla()}
      </div>
    );
  }
}
