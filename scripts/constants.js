const fileTypes = ['scss', 'ts', 'js', 'jsx'];
const ROOT_FOLDER = 'src';
const FILE_NAMES = ['index', 'style', 'styles', 'vendor'];
const react = {
  commonjs: 'react',
  commonjs2: 'react',
  amd: 'react',
  root: 'React',
};

const reactDom = {
  commonjs: 'react-dom',
  commonjs2: 'react-dom',
  amd: 'react-dom',
  root: 'ReactDOM',
};

const pfReact = {
  commonjs: 'patternfly-react',
  commonjs2: 'patternfly-react',
  amd: 'patternfly-react',
  root: 'PFReact',
};

const pfReact4 = {
  commonjs: '@patternfly/react-core',
  commonjs2: '@patternfly/react-core',
  amd: '@patternfly/react-core',
  root: 'PFReact4',
};
const redux = {
  commonjs: 'redux',
  commonjs2: 'redux',
  amd: 'redux',
  root: 'Redux',
};

const reactRedux = {
  commonjs: 'react-redux',
  commonjs2: 'react-redux',
  amd: 'react-redux',
  root: 'ReactRedux',
};

const reactRouterDom = {
  commonjs: 'react-router-dom',
  commonjs2: 'react-router-dom',
  amd: 'react-router-dom',
  root: 'ReactRouterDOM',
};

const reactSelect = {
  commonjs: 'react-select',
  commonjs2: 'react-select',
  amd: 'react-select',
  root: 'ReactSelect',
};

const propTypes = {
  commonjs: 'prop-types',
  commonjs2: 'prop-types',
  amd: 'prop-types',
  root: 'PropTypes',
};

module.exports = {
  fileTypes,
  ROOT_FOLDER,
  FILE_NAMES,
  externals: {
    react,
    redux,
    'patternfly-react': pfReact,
    '@patternfly/react-core': pfReact4,
    'react-dom': reactDom,
    'react-redux': reactRedux,
    'react-router-dom': reactRouterDom,
    'react-select': reactSelect,
    'prop-types': propTypes,
  },
};
