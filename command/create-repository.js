const fs = require('fs').promises;
const {get, lowerCaseFirstLetter} = require('../utils/utils');

const root = process.cwd();
const repoDir = `${root}/repositories`;

async function generateInterface(name) {
  const content = await get('repositories/interfaces/ModelNameRepository.ts');
  const contentToWrite = content.replace(new RegExp('ModelName', 'g'), name).replace(new RegExp('modelName', 'g'), lowerCaseFirstLetter(name));
  const file = `${repoDir}/interfaces/${name}Repository.ts`;
  await fs.writeFile(file, contentToWrite);
}

async function generateRepo(name) {
  const content = await get('repositories/ModelNameRepositoryImpl.ts');
  const contentToWrite = content.replace(new RegExp('ModelName', 'g'), name).replace(new RegExp('modelName', 'g'), lowerCaseFirstLetter(name));
  const file = `${repoDir}/${name}RepositoryImpl.ts`;
  await fs.writeFile(file, contentToWrite);
}

async function createRepository(name) {
  const cwd = process.cwd();
  if (!fileExists(`${cwd}/repositories`)) {
    console.log('Could not found `repositories` directory. You must run under root of service!');
    console.log('Exit!');
    return;
  }
  await Promise.all([
    generateInterface(name),
    generateRepo(name),
  ]);
}

module.exports = createRepository;