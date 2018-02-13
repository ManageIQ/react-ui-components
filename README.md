# React UI Components for ManageIQ
[![Build Status](https://travis-ci.org/ManageIQ/ui-components.svg)](https://travis-ci.org/ManageIQ/react-ui-components)
[![Chat](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/ManageIQ/manageiq/ui?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## Purpose

## List of components
| Name          | Documentation                                                                  | Description  |
| ------------- |:-----------------------------------------------------------------------------: | -----:|
| HelloCmp      | [doc/comp-a/some-cmp/hello.component](/doc/comp-a/some-cmp/hello.component.md) | Example component |

## Technologies

Most components are using these libraries:
* [React](https://github.com/facebook/react)
* [ReactDOM](https://github.com/facebook/react/tree/master/packages/react-dom)
* [PropTypes](https://github.com/facebook/prop-types)
* [Redux](https://github.com/reactjs/redux)
* [ReactRedux](https://github.com/reactjs/react-redux)

### Build process

Build process is using [webpack](https://github.com/webpack/webpack) which is set to extract 
[external](https://webpack.js.org/configuration/externals/) libraries so the final library is as small as possible.

Webpack is used to build [library](https://webpack.js.org/guides/author-libraries/#expose-the-library) so the final 
files can be imported into any other application. Library target is set to [umd](https://github.com/umdjs/umd).

#### List of external libraries
* React
* ReactDOM
* PropTypes
* Redux
* ReactRedux
* ReactSelect
* PFReact
* Lodash

Settings of these externals can be found in [constants.js](/scripts/constants.js). Importing any of these libraries will
not make final file bigger, but importing such file needs to ensure, that libraries used in this component are loaded. 

## Architecture
## Development Environment
This library uses LTS of Node environment, to start coding you have to run
```bash
$ [npm|yarn] install
```

No matter what tool you choose to develop with you have to run to load external dependencies.
```bash
$ [npm|yarn] run vendor
```

### Development tools
You can choose from three ways of how to code and test your application on local machine.

To create new set of components you can create new folder inside `src/` folder with `index.js` as entrypoint to your new
components, where you will export [components|reducers|actions] for other application to use. To create custom styles for
your components, create `[style|styles|index].scss` next to `index.js` as entrypoint to your styles.

#### 1. `[npm|yarn] start`

It will automatically watch your files and store final files into `dist` folder.

This way you can create some components
use [npm link](https://docs.npmjs.com/cli/link) to create symlink and use npm link inside your server application to include
these components and debug them inside your environment.  

#### 2. `[npm|yarn] run server`

It will automatically watch your files, run [webpack-dev-server](https://github.com/webpack/webpack-dev-server) and 
serve your new components in demo app. To use your newly created components feel free to change `demo/demo-app.jsx` to include
your components and you can debug them in node server environment.

#### 3. `[npm|yarn] run storybook`
It will automatically watch your files and presents them using [storybook](https://storybook.js.org/), if you want
to use your new components, edit stories inside [stories/index.stories.js](/stories/index.stories.js) and debug them in
nice storybook UI.

#### Binding `this` to methods
You have two ways how to create methods inside classes. One is based on babel using [preset-stage-0](https://babeljs.io/docs/plugins/preset-stage-0/), the other is based on decorators using
[autobind-decorator](https://github.com/andreypopp/autobind-decorator)

1. Babel based method
```javascript 1.8
import * as React from 'react';

export class ExampleClass extends React.Component {
  someMethod = () => {
    //some work with this, which is component's this
  }
}
```

2. Decorator based method
```javascript 1.8
import * as React from 'react';
import autobind from 'autobind-decorator';

export class ExampleClass extends React.Component {
  @autobind
  someMethod() {
    //some work with this, which is component's this
  }
}
```

### Generating of documentation
This project is using [react-docgen](https://github.com/reactjs/react-docgen) to generate documentation out of your comments
in components.

If you wish to generate new documentation you have to have `react-docgen` installed as global dependency and run
```bash
$ scripts/documentation/genDoc.sh
```
This script will generate new documentation, run it trough and saves new markdown inside [/doc](/doc) folder.
