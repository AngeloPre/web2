import { Observable } from 'rxjs';

export interface ApiServices<T, ID = number | string> {
  listarTodos(): Observable<T[]>;
  buscarPorId(id: ID): Observable<T>;
  inserir(elemento: T): Observable<T>;
  atualizar(elemento: T): Observable<T>;
  remover(id: ID): Observable<void>;

}
