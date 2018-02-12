const { readdirSync, statSync, existsSync } = require('fs');
const { parse } = require('path');
const { fileTypes, ROOT_FOLDER, FILE_NAMES, externals } = require('./constants');

function filterFiles(path, checkDirr, folder) {
  return checkDirr ? statSync(`${folder}/${path}`).isDirectory() : statSync(`${folder}/${path}`).isFile();
}

function fileExists(folder, fileType, fileNames) {
  const files = fileNames
    .map(fName => existsSync(`${folder}/${fName}.${fileType}`) && `../${folder}/${fName}.${fileType}`)
    .filter(exists => exists);
  return files.length === 0 ? false : files[0];
}

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
        delete acc[curr];
      }
      return acc;
    }, {});
}

function buildExternals(isBuild = false) {
  return !isBuild ? externals : {};
}

module.exports = { fileEntries, buildExternals, FILE_NAMES };
