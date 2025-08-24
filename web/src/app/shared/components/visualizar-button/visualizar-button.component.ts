import { Component, input, output } from '@angular/core';
import { StatusConcertoEnum } from '@/app/model/enums/chamado-status.enum';

@Component({
  selector: 'app-visualizar-button',
  imports: [],
  templateUrl: './visualizar-button.component.html',
  styles: ``,
})
export class VisualizarButtonComponent {
  status = input.required<StatusConcertoEnum>();
  id = input.required<number>();

  btnClicked = output<number>();

  eventoBtn(): void {
    this.btnClicked.emit(this.id());
  }

  chamadosStatus = StatusConcertoEnum;
}
