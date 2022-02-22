export interface UseCase {
  invoke: () => Promise<any>
}