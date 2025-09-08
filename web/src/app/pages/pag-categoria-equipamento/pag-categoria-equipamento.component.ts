import { CategoriaEquipamentoTableComponent } from '@/app/shared/components/categoria-equipamento-table/categoria-equipamento-table.component';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CategoriaEquipamentoService } from '@/app/services/categoria-equipamento.service';
import { CategoriaEquipamento } from '@/app/model/categoria-equipamento.type';

@Component({
  selector: 'app-pag-categoria-equipamento',
  imports: [CategoriaEquipamentoTableComponent, MatButtonModule],
  templateUrl: './pag-categoria-equipamento.component.html',
  styles: ``
})
export class PagCategoriaEquipamentoComponent implements OnInit {
  private categoriaEquipamentoService = inject(CategoriaEquipamentoService);

  categoriaEquipamentoMock = signal<CategoriaEquipamento[]>([]);

  ngOnInit(): void {
    this.atualizarTela();
    console.log(this.categoriaEquipamentoService.listarTodos());
  }

  atualizarTela(): void {
    this.categoriaEquipamentoMock.set(this.categoriaEquipamentoService.listarTodos());
  }
}
