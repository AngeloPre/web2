import { Component, input } from '@angular/core';
import { StatusConcertoEnum } from '@/app/model/enums/chamado-status.enum';

@Component({
  selector: 'app-status-icon',
  imports: [],
  templateUrl: './status-icon.component.html',
  styles: ``,
})
export class StatusIconComponent {
  status = input.required<StatusConcertoEnum>();
  chamadosStatus = StatusConcertoEnum;
}
