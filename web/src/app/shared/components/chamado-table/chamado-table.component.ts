import { Component, input } from '@angular/core';
import { ChamadoItem } from '@/app/model/chamado-list-mock.type';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-chamado-table',
  imports: [DatePipe],
  templateUrl: './chamado-table.component.html',
  styles: ``,
})
export class ChamadoTableComponent {
  chamados = input.required<Array<ChamadoItem>>();
}
