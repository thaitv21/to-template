const {githubUrl, templateVersion} = require('../config/config');
const request = require('request');
const { resolve } = require('path');
const fs = require('fs').promises;
const {createWriteStream, createReadStream} = require('fs');
const {Extract} = require('unzipper');



exports.get = async function (path) {
  const url = `${githubUrl}/${templateVersion}/${path}`;
  const options = {
    'method': 'GET',
    'url': url,
    'headers': {}
  }
  return new Promise((resolve, reject) => {
    request(options, function (error, response) {
      if (error) reject(new Error(error));
      else resolve(response.body);
    });
  });
}

exports.lowerCaseFirstLetter = function(str) {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

exports.downloadFile = async function(url, filename) {
  return new Promise((resolve, reject) => {
    request.get(url).on('response', function(response) {
      console.log(response.statusCode) // 200
      console.log(response.headers['content-type']);
      resolve();
    }).pipe(createWriteStream(filename));
  });
}

exports.createDir = async function(dir) {
  await fs.mkdir(dir, {recursive: true});
}

exports.unzip = async function(zipFile, dest) {
  console.log('unzip', zipFile, dest);
  await createReadStream(zipFile).pipe(Extract({ path: dest })).on('entry', entry => entry.autodrain()).promise();
}