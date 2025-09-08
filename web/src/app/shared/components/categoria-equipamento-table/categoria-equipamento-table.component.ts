import { Component, input } from '@angular/core';
import { StatusAtivoInativoComponent } from '../status-ativo-inativo/status-ativo-inativo.component';
import { CategoriaEquipamento } from '@/app/model/categoria-equipamento.type';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-categoria-equipamento-table',
  imports: [StatusAtivoInativoComponent, MatButtonModule],
  templateUrl: './categoria-equipamento-table.component.html',
  styles: ``
})
export class CategoriaEquipamentoTableComponent {
  categorias = input.required<CategoriaEquipamento[]>();
}
