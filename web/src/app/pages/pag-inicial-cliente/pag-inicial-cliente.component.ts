import { Component } from '@angular/core';
import { ChamadoItem } from '@/app/model/chamado-list-mock.type';
import { ChamadoTableComponent } from '@/app/shared/components/chamado-table/chamado-table.component';
//Temporário
import { StatusConcertoEnum } from '@/app/model/enums/chamado-status.enum';

@Component({
  selector: 'app-pag-inicial-cliente',
  imports: [ChamadoTableComponent],
  templateUrl: './pag-inicial-cliente.component.html',
  styles: ``,
})
export class PagInicialClienteComponent {
  chamadosMock: ChamadoItem[] = [
    {
      userId: 1,
      serviceId: 101,
      status: StatusConcertoEnum.ORCADA,
      descricao: 'Descrição do chamado 1',
      data: new Date(),
    },
    {
      userId: 2,
      serviceId: 102,
      status: StatusConcertoEnum.FINALIZADA,
      descricao: 'Descrição do chamado 2',
      data: new Date(),
    },
  ];
}
