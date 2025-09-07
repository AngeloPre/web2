export interface MockServices<T> {
  listarTodos(): T[];
  inserir(elemento: T): void;
  buscarPorID(id: number): T | undefined;
  atualizar(elemento: T): void;
  remover(elemento: T): void;
}
