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
      status: StatusConcertoEnum.FINALIZADA,
      descricao: 'Descrição do chamado 1',
      data: new Date(),
    },
    {
      userId: 2,
      serviceId: 102,
      status: StatusConcertoEnum.PAGA,
      descricao: 'Descrição do chamado 2',
      data: new Date(),
    },
    {
      userId: 3,
      serviceId: 103,
      status: StatusConcertoEnum.ARRUMADA,
      descricao: 'Descrição do chamado 3',
      data: new Date(),
    },
    {
      userId: 4,
      serviceId: 104,
      status: StatusConcertoEnum.REDIRECIONADA,
      descricao: 'Descrição do chamado 4',
      data: new Date(),
    },
    {
      userId: 5,
      serviceId: 105,
      status: StatusConcertoEnum.APROVADA,
      descricao: 'Descrição do chamado 5',
      data: new Date(),
    },
    {
      userId: 6,
      serviceId: 106,
      status: StatusConcertoEnum.REJEITADA,
      descricao: 'Descrição do chamado 5',
      data: new Date(),
    },
    {
      userId: 7,
      serviceId: 107,
      status: StatusConcertoEnum.ORCADA,
      descricao: 'Descrição do chamado 5',
      data: new Date(),
    },
    {
      userId: 8,
      serviceId: 108,
      status: StatusConcertoEnum.ABERTA,
      descricao: 'Descrição do chamado 5',
      data: new Date(),
    },
  ];
}
