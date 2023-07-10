const { templateVersion, releaseUrl } = require("../config/config");
const { downloadFile, unzip, lowerCaseFirstLetter, fileExists } = require("../utils/utils");
const fs = require('fs').promises;
const { execSync } = require("child_process");
const inquirer = require('inquirer');


async function readDir(dir, modelName) {
  const children = await fs.readdir(dir);
  await Promise.all(children.map(async (child) => {
    const path = `${dir}/${child}`;
    const stats = await fs.stat(path);
    if (stats.isDirectory()) {
      await readDir(path, modelName);
    } else {
      const content = await fs.readFile(path, 'utf8');
      const contentToWrite = content.replace(new RegExp('ModelName', 'g'), modelName)
                                    .replace(new RegExp('modelName', 'g'), lowerCaseFirstLetter(modelName))
                                    .replace(new RegExp('MODEL_NAME', 'g'), modelName.toUpperCase());
      await fs.writeFile(path, contentToWrite);
      await fs.rename(path, path.replace('ModelName', modelName));
    }
  }));
}

async function createService(name, {model}) {
  const cwd = process.cwd();

  if (!cwd.endsWith('src/modules')) {
    const ans = await inquirer.prompt([{
      name: 'continue',
      message: 'You aren\'t running in src/modules. Continue? [Y/n]',
      default: 'y',
    }]);
    if (ans.continue !== 'y') {
      console.log('Finish');
      return;
    }
  }

  console.log(`Generating ${name}`);

  const zipFile = `${cwd}/template.zip`;
  await downloadFile(`${releaseUrl}/${templateVersion}.zip`, zipFile);
  await fs.rmdir(`${cwd}/${name}`, {recursive: true});
  await fs.mkdir(`${cwd}/${name}`);
  await unzip(zipFile, `${cwd}/temp`);
  await fs.rename(`${cwd}/temp/template-service-${templateVersion}`, `${cwd}/${name}`);
  await fs.rmdir(`${cwd}/temp`);
  await readDir(`${cwd}/${name}`, model);
  await fs.unlink(zipFile);
  console.log('Install dependencies...');
  execSync(`cd ${cwd}/${name} && yarn install`);
  console.log('Done!');
}

module.exports = createService;