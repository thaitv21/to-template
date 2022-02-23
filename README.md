# CLI for suni

## Installation
```shell
npm install -g suni-cli
```

## Generate service
Make sure you are under `src/modules` directory
```shell
cd <path-to-project>/src/modules
```
Run command
```shell
suni service --model <model-name> <service-name>
```
For example:
```shell
suni service --model User user-service
```

## Generate new model
Make sure you are under service directory
```shell
cd <path-to-project>/src/modules/<service-name>
```

Run command
```shell
suni model <model-name> <type>
```
There, `type` is one of [`sql`, `dynamo`]

For example:
```shell
suni model User sql
```
This command should generate `models/User.ts` and `providers/database/sequelize/models/UserModel.ts`.

## Generate new repository
Make sure you are under service directory

```shell
suni repo <model-name>
```
For example:
```shell
suni repo User
```
This command should generate `repositories/interfaces/UserRepository.ts` and `repositories/UserRepositoryImpl.ts`.

## Generate single usecase
Make sure you are under service directory

```shell
suni usecase single <usecase-name>
```
For example:
```shell
suni usecase single MyUseCase
```
This command should generate `useCases/interfaces/MyUseCase.ts` and `useCases/MyUseCaseImpl.ts`.

## Generate CLRUD usecases (Create, List, Retrieve, Update, Delete)
Make sure you are under service directory

```shell
suni usecase clrud <model-name>
```
For example:
```shell
suni usecase clrud User
```
This command should generate interfaces and implementations for creating/listing/retrieving/updating/deleting a model.