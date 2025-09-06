import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { ChamadoItem } from '@/app/model/chamado-list-mock.type';
import { DatePipe } from '@angular/common';
import { LimiteCaracteresPipe } from '@/app/shared/pipes/limite-caracteres.pipe';
import { StatusIconComponent } from '../status-icon/status-icon.component';


@Component({
  selector: 'app-chamado-card',
  imports: [ DatePipe, MatCardModule, RouterLink, LimiteCaracteresPipe, StatusIconComponent ],
  templateUrl: './chamado-card.component.html',
  styles: ``
})
export class ChamadoCardComponent {
  chamados = input.required<Array<ChamadoItem>>();
}
