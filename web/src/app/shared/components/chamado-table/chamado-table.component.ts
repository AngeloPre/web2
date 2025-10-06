import { Component, input, output } from '@angular/core';
import { ChamadoItem } from '@/app/model/chamado.type';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { VisualizarButtonComponent } from '../visualizar-button/visualizar-button.component';
import { StatusIconComponent } from '../status-icon/status-icon.component';
import { LimiteCaracteresPipe } from '../../pipes/limite-caracteres.pipe';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-chamado-table',
  imports: [
    DatePipe,
    VisualizarButtonComponent,
    StatusIconComponent,
    RouterLink,
    LimiteCaracteresPipe,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './chamado-table.component.html',
  styles: `:host {overflow-y: auto; max-height: 75vh; display: block;}`,
})
export class ChamadoTableComponent {
  chamados = input.required<Array<ChamadoItem>>();
}
