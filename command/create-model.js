const fs = require('fs').promises;
const {get, lowerCaseFirstLetter} = require('../utils/utils');

const root = process.cwd();
const modelDir = `${root}/models`;

async function generateModelContent(model) {
  const content = await get('models/ModelName.ts');
  const contentToWrite = content.replace(new RegExp('ModelName', 'g'), model);
  const file = `${modelDir}/${model}.ts`;
  await fs.writeFile(file, contentToWrite);
}

async function generateSql(model) {
  const content = await get('providers/database/sequelize/models/ModelNameModel.ts');
  const contentToWrite = content.replace(new RegExp('ModelName', 'g'), model).replace(new RegExp('modelName', 'g'), lowerCaseFirstLetter(model));
  const file = `${root}/providers/database/sequelize/models/${model}Model.ts`;
  await fs.writeFile(file, contentToWrite);
}

async function generateDAO(model, type) {
  if (type === 'sql') {
    await generateSql(model);
  }
}

async function createModel(model, type) {
  await Promise.all([
    generateModelContent(model),
    generateDAO(model, type)
  ]);
}

module.exports = createModel;