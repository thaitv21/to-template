const { templateVersion } = require("../config/config");
const { downloadFile, unzip } = require("../utils/utils");
const fs = require('fs').promises;

async function readDir(dir) {
  const children = await fs.readdir(dir);
  await Promise.all(children.map(async (child) => {
    const stats = await fs.stat(`${dir}/${child}`);
    if (stats.isDirectory()) {
      readDir(`${dir}/${child}`);
    } else {
      console.log('file', child);
    }
  }));
}

async function createService(name, {model}) {
  console.log('name', name);
  console.log('model', model);
  console.log(process.cwd());

  const cwd = process.cwd();
  const zipFile = `${cwd}/template.zip`;
  // await downloadFile('https://github.com/thaitv21/template-service/archive/refs/tags/1.0.2.zip', zipFile);
  await fs.rmdir(`${cwd}/${name}`, {recursive: true});
  await fs.mkdir(`${cwd}/${name}`);
  await unzip(zipFile, `${cwd}/temp`);
  await fs.rename(`${cwd}/temp/template-service-${templateVersion}`, `${cwd}/${name}`);
  await fs.rmdir(`${cwd}/temp`);
  readDir(`${cwd}/${name}`);
  // create folder
  // download file
  // unzip

  // copy

  // rename files
  
}

module.exports = createService;