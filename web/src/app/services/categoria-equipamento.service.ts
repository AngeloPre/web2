import { Injectable } from '@angular/core';
import { MockServices } from '../model/interfaces/mock-services';
import { CategoriaEquipamento } from '../model/categoria-equipamento.type';
import { StatusAtivoInativo } from '../model/enums/status-ativo-inativo.enum';

export const LS_CategoriaEquipamento = 'CategoriaEquipamento';

@Injectable({
  providedIn: 'root'
})
export class CategoriaEquipamentoService implements MockServices<CategoriaEquipamento> {
  private categoriaID = 1;
  listarTodos(): CategoriaEquipamento[] {
    const categorias = localStorage[LS_CategoriaEquipamento];
    return categorias ? (JSON.parse(categorias)) : [];
  }
  listarPorStatus(status: StatusAtivoInativo): CategoriaEquipamento[] {
    const categorias = localStorage[LS_CategoriaEquipamento];
    const lista: CategoriaEquipamento[] = JSON.parse(categorias);
    return lista.filter((categoria) => categorias.status === status);
  }
  inserir(elemento: CategoriaEquipamento): void {
    const categorias = this.listarTodos();
    elemento.id = this.categoriaID++;
    if (!elemento.createdAt) elemento.createdAt = new Date();
    categorias.push(elemento);
    localStorage[LS_CategoriaEquipamento] = JSON.stringify(categorias);
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
    localStorage[LS_CategoriaEquipamento] = JSON.stringify(categorias);
  }
  remover(elemento: CategoriaEquipamento): void {
    let categorias = this.listarTodos();
    categorias = categorias.filter((categoria) => categoria.id !== elemento.id);
    localStorage[LS_CategoriaEquipamento] = JSON.stringify(categorias);
  }

  constructor() {
    const existentes = this.listarTodos();
    this.categoriaID = (existentes.length+1)
    if (existentes.length === 0) {
      this.inserir({
        name: 'Notebook',
        slug: 'notebook',
        baseValue: 20000,
        isActive: StatusAtivoInativo.ATIVO,
        createdAt: new Date(),
        description: 'Equipamentos portáteis',
      });
      this.inserir({
        name: 'Desktop',
        slug: 'desktop',
        baseValue: 15000,
        isActive: StatusAtivoInativo.ATIVO,
        createdAt: new Date(),
        description: 'Computadores de mesa',
      });
      this.inserir({
        name: 'Impressora',
        slug: 'impressora',
        baseValue: 10000,
        isActive: StatusAtivoInativo.ATIVO,
        createdAt: new Date(),
        description: 'Periféricos de impressão',
      });
      this.inserir({
        name: 'Mouse',
        slug: 'mouse',
        baseValue: 5000,
        isActive: StatusAtivoInativo.ATIVO,
        createdAt: new Date(),
        description: 'Periférico de entrada - mouse',
      });
      this.inserir({
        name: 'Teclado',
        slug: 'teclado',
        baseValue: 8000,
        isActive: StatusAtivoInativo.ATIVO,
        createdAt: new Date(),
        description: 'Periférico de entrada - teclado',
      });
    }
  }
}
