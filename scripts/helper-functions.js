const { readdirSync, statSync, existsSync } = require('fs');
const { parse } = require('path');
const fileTypes = ['scss', 'ts', 'js'];
const ROOT_FOLDER = 'src';
const FILE_NAMES = ['index', 'style', 'styles', 'vendor'];

function fileEntries(fileNames, checkDirr = true, rootFolder = ROOT_FOLDER) {
  return readdirSync(rootFolder)
    .filter(path => filterFiles(path, checkDirr, rootFolder))
    .map(file => parse(file).name)
    .reduce((acc, curr) => {
      const folder = checkDirr ? `${rootFolder}/${curr}` : `${rootFolder}`;
      acc[curr] = fileTypes
        .map(fileType => fileExists(folder, fileType, fileNames))
        .filter(exists => exists);
      if (acc[curr].length === 0) {
        delete acc[curr]
      }
      return acc;
    }, {});
}

function filterFiles(path, checkDirr, folder) {
  return checkDirr ? statSync(`${folder}/${path}`).isDirectory() : statSync(`${folder}/${path}`).isFile();
}

function fileExists(folder, fileType, fileNames) {
  const files = fileNames
    .map(fName => existsSync(`${folder}/${fName}.${fileType}`) && `../${folder}/${fName}.${fileType}`)
    .filter(exists => exists);
  return files.length === 0 ? false : files[0];
}

function buildExternals(isBuild = false) {
  return !isBuild ? {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
      root: 'React',
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom',
      root: 'ReactDOM',
    },
    'patternfly-react': {
      commonjs: 'patternfly-react',
      commonjs2: 'patternfly-react',
      amd: 'patternfly-react',
      root: 'PFReact',
    },
    lodash: {
      commonjs: 'lodash',
      commonjs2: 'lodash',
      amd: 'lodash',
      root: '_',
    },
    redux: {
      commonjs: 'redux',
      commonjs2: 'redux',
      amd: 'redux',
      root: 'Redux',
    },
    'react-redux': {
      commonjs: 'react-redux',
      commonjs2: 'react-redux',
      amd: 'react-redux',
      root: 'ReactRedux',
    },
    'react-router-dom': {
      commonjs: 'react-router-dom',
      commonjs2: 'react-router-dom',
      amd: 'react-router-dom',
      root: 'ReactRouterDOM',
    },
  } : {};
}

module.exports = { fileEntries, buildExternals, FILE_NAMES };
