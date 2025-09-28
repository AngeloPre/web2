import { Injectable, signal } from '@angular/core';
import { MockServices } from '@model/interfaces/mock-services';
import { CategoriaEquipamento } from '@model/categoria-equipamento.type';
import { StatusAtivoInativo } from '@model/enums/status-ativo-inativo.enum';

export const LS_CategoriaEquipamento = 'CategoriaEquipamento';

@Injectable({
  providedIn: 'root'
})
export class CategoriaEquipamentoService implements MockServices<CategoriaEquipamento> {
  private categoriaID = 1;
  peekNextId(): number { return this.categoriaID; }
  signalCategorias = signal<CategoriaEquipamento[]>(this.listarTodos());
  private persistirAtualizar(categorias: CategoriaEquipamento[]) {
    localStorage[LS_CategoriaEquipamento] = JSON.stringify(categorias);
    this.signalCategorias.set(categorias);
  }
  listarTodos(): CategoriaEquipamento[] {
    const categorias = localStorage[LS_CategoriaEquipamento];
    return categorias ? (JSON.parse(categorias)) : [];
  }
  listarPorStatus(status: StatusAtivoInativo): CategoriaEquipamento[] {
    const categorias = localStorage[LS_CategoriaEquipamento];
    const lista: CategoriaEquipamento[] = JSON.parse(categorias);
    return lista.filter((categoria) => categoria.isActive === status);
  }
  inserir(elemento: CategoriaEquipamento): void {
    const categorias = this.listarTodos();
    if (!elemento.id || elemento.id <= 0) {
      elemento.id = this.categoriaID;
    }
    this.categoriaID++;
    if (!elemento.createdAt) elemento.createdAt = new Date();
    elemento.baseValue = Math.round(elemento.baseValue);
    categorias.push(elemento);
    this.persistirAtualizar(categorias)
  }
  buscarPorID(id: number): CategoriaEquipamento | undefined {
    const categorias = this.listarTodos();
    return categorias.find((categoria) => categoria.id === id);
  }
  atualizar(elemento: CategoriaEquipamento): void {
    let categorias = this.listarTodos();
    categorias = categorias.map((categoria) =>
      categoria.id === elemento.id ? { ...categoria, ...elemento } : categoria
    );
    this.persistirAtualizar(categorias)
  }
  remover(elemento: CategoriaEquipamento): void {
    let categorias = this.listarTodos();
    categorias = categorias.filter((categoria) => categoria.id !== elemento.id);
    this.persistirAtualizar(categorias)
  }

  reativar(id: number)  { this.setStatus(id, StatusAtivoInativo.ATIVO); }
  desativar(id: number) { this.setStatus(id, StatusAtivoInativo.INATIVO); }
  private setStatus(id: number, status: StatusAtivoInativo) {
    const categorias = this.listarTodos();
    const elemento = categorias.findIndex(categoria => categoria.id === id);
    categorias[elemento] = { ...categorias[elemento], isActive: status };
    this.persistirAtualizar(categorias)
  }

  constructor() {
    const existentes = this.listarTodos();
    this.categoriaID = (existentes.length+1)
    if (existentes.length === 0) {
      this.inserir({
        id: -1,
        name: 'Notebook',
        slug: 'notebook',
        baseValue: 20000,
        isActive: StatusAtivoInativo.ATIVO,
        createdAt: new Date(),
        description: 'Equipamentos portáteis',
      });
      this.inserir({
        id: -1,
        name: 'Desktop',
        slug: 'desktop',
        baseValue: 15000,
        isActive: StatusAtivoInativo.ATIVO,
        createdAt: new Date(),
        description: 'Computadores de mesa',
      });
      this.inserir({
        id: -1,
        name: 'Impressora',
        slug: 'impressora',
        baseValue: 10000,
        isActive: StatusAtivoInativo.ATIVO,
        createdAt: new Date(),
        description: 'Periféricos de impressão',
      });
      this.inserir({
        id: -1,
        name: 'Mouse',
        slug: 'mouse',
        baseValue: 5000,
        isActive: StatusAtivoInativo.ATIVO,
        createdAt: new Date(),
        description: 'Periférico de entrada - mouse',
      });
      this.inserir({
        id: -1,
        name: 'Teclado',
        slug: 'teclado',
        baseValue: 8000,
        isActive: StatusAtivoInativo.ATIVO,
        createdAt: new Date(),
        description: 'Periférico de entrada - teclado',
      });
    } else {
      this.signalCategorias.set(existentes);
    }
  }
}
