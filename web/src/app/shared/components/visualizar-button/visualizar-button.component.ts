import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StatusConcertoEnum } from '@/app/model/enums/chamado-status.enum';

@Component({
  selector: 'app-visualizar-button',
  standalone: true,
  imports: [ RouterLink ],
  templateUrl: './visualizar-button.component.html',
  styles: ``,
})
export class VisualizarButtonComponent {
  status = input.required<StatusConcertoEnum>();
  id = input.required<number>();
  slug = input<string>();

  btnClicked = output<number>();

  eventoBtn(): void {
    this.btnClicked.emit(this.id());
  }

  chamadosStatus = StatusConcertoEnum;
}
