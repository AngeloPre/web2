import { CategoriaEquipamentoTableComponent } from '@/app/shared/components/categoria-equipamento-table/categoria-equipamento-table.component';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-pag-categoria-equipamento',
  imports: [CategoriaEquipamentoTableComponent, MatButtonModule],
  templateUrl: './pag-categoria-equipamento.component.html',
  styles: ``
})
export class PagCategoriaEquipamentoComponent {

}
