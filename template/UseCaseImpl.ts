import { UseCase } from './UseCase';

export default class UseCaseImpl implements UseCase {
  invoke = async () => Promise.reject('Method not implemented!');
}