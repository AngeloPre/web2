import { Component, input } from '@angular/core';
import { StatusConcertoEnum } from '@/app/model/enums/chamado-status.enum';

@Component({
  selector: 'app-visualizar-button',
  imports: [],
  templateUrl: './visualizar-button.component.html',
  styles: ``,
})
export class VisualizarButtonComponent {
  status = input.required<StatusConcertoEnum>();
  chamadosStatus = StatusConcertoEnum;
}
