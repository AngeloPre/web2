import { Component, input } from '@angular/core';
import { StatusAtivoInativo } from '@/app/model/enums/status-ativo-inativo.enum';

@Component({
  selector: 'app-status-ativo-inativo',
  imports: [],
  templateUrl: './status-ativo-inativo.component.html',
  styles: ``
})
export class StatusAtivoInativoComponent {
  status = input.required<StatusAtivoInativo>();
  categoriaStatus = StatusAtivoInativo;
}
