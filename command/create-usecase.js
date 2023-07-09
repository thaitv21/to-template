const fs = require('fs').promises;
const {get, lowerCaseFirstLetter, fileExists} = require('../utils/utils');

const root = process.cwd();
const useCasesDir = `${root}/useCases`;

async function generateInterface(filename, content) {
  const file = `${useCasesDir}/interfaces/${filename}.ts`;
  await fs.writeFile(file, content);
}

async function generateImpl(filename, content) {
  const file = `${useCasesDir}/${filename}.ts`;
  await fs.writeFile(file, content);
}

async function createCLRUDUseCase(model) {
  const cwd = process.cwd();
  if (!fileExists(`${cwd}/useCases`)) {
    console.log('Could not found `useCases` directory. You must run under root of service!');
    console.log('Exit!');
    return;
  }
  const classnames = [
    'CreateModelNameUseCase',
    'DeleteModelNameUseCase',
    'GetModelNameListUseCase',
    'GetModelNameUseCase',
    'UpdateModelNameUseCase',
  ];
  await Promise.all(classnames.map(async (classname) => {
    const usecase = classname.replace('ModelName', model);

    const contentInterface = await get(`useCases/interfaces/${classname}.ts`);
    const contentInterfaceToWrite = contentInterface.replace(new RegExp('ModelName', 'g'), model).replace(new RegExp('modelName', 'g'), lowerCaseFirstLetter(model));
    await generateInterface(`${usecase}`, contentInterfaceToWrite);

    const contentImpl = await get(`useCases/${classname}Impl.ts`);
    const contentImplToWrite = contentImpl.replace(new RegExp('ModelName', 'g'), model).replace(new RegExp('modelName', 'g'), lowerCaseFirstLetter(model));
    await generateImpl(`${usecase}Impl`, contentImplToWrite);
  }));
}

async function createSingleUseCase(name) {
  const cwd = process.cwd();
  if (!fileExists(`${cwd}/useCases`)) {
    console.log('Could not found `useCases` directory. You must run under root of service!');
    console.log('Exit!');
    return;
  }
  const contentInterface = await fs.readFile('../template/UseCase.ts');
  const contentInterfaceToWrite = contentInterface.replace(new RegExp('UseCase', 'g'), `${name}UseCase`);
  await generateInterface(`${name}UseCase`, contentInterfaceToWrite);

  const contentImpl = await fs.readFile('../template/UseCaseImpl.ts');
  const contentImplToWrite = contentImpl.replace(new RegExp('UseCase', 'g'), `${name}UseCase`);
  await generateImpl(`${name}UseCaseImpl`, contentImplToWrite);
}

module.exports = {
  createSingleUseCase,
  createCLRUDUseCase,
};