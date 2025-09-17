import { Component, input, output } from '@angular/core';
import { ChamadoItem } from '@/app/model/chamado-list.type';
import { StatusIconComponent } from '../status-icon/status-icon.component';
import { DataHoraPipe } from '../../pipes/data-hora.pipe';

@Component({
    selector: 'app-efetuar-manutencao',
    imports: [StatusIconComponent, DataHoraPipe],
    templateUrl: './efetuar-manutencao.component.html',
    styles: ``
})
export class EfetuarManutencaoComponent {
    chamado = input<ChamadoItem>();
}
