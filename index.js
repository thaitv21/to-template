#! /usr/bin/env node

const { program, Argument } = require('commander');
const createModel = require('./command/create-model');
const createRepository = require('./command/create-repository');
const {createCLRUDUseCase, createSingleUseCase} = require('./command/create-usecase');
const createService = require('./command/create-service');

program.command('model')
  .argument('<model_name>', 'Name of model')
  .addArgument(new Argument('<type>', 'Type of model').choices(['sql', 'dynamo']))
  .description('Create a model')
  .action(createModel);

program.command('repo')
  .argument('<model_name>', 'Name of model')
  .description('Create repository')
  .action(createRepository);

const usecaseCmd = program.command('usecase');

usecaseCmd.command('clrud')
  .argument('<model_name>', 'Name of model')
  .description('Create CLRUD usecases')
  .action(createCLRUDUseCase);

usecaseCmd.command('single')
  .argument('<name>', 'Name of usecase')
  .description('Create an usecase')
  .action(createSingleUseCase);

program.command('service')
  .argument('<name>', 'Name of service')
  .option('--model [model]', 'Model name')
  .action(createService)

program.parse();