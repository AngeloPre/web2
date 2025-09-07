import { Component } from '@angular/core';
import { StatusAtivoInativoComponent } from '../status-ativo-inativo/status-ativo-inativo.component';
import { StatusAtivoInativo } from '@/app/model/enums/status-ativo-inativo.enum';

@Component({
  selector: 'app-categoria-equipamento-table',
  imports: [StatusAtivoInativoComponent],
  templateUrl: './categoria-equipamento-table.component.html',
  styles: ``
})
export class CategoriaEquipamentoTableComponent {
  categoriaStatus = StatusAtivoInativo;
}
