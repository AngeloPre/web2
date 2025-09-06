import { ChamadoCardComponent } from '@/app/shared/components/chamado-card/chamado-card.component';
import { Component, signal } from '@angular/core';
import { ChamadoItem } from '@/app/model/chamado-list-mock.type';
//Temporário
import { StatusConcertoEnum } from '@/app/model/enums/chamado-status.enum';
import { CategoriaEquipamento } from '@/app/model/enums/categoria-equipamento';

@Component({
  selector: 'app-pag-inicial-funcionario',
  imports: [ChamadoCardComponent],
  templateUrl: './pag-inicial-funcionario.component.html',
  styles: ``
})
export class PagInicialFuncionarioComponent {

  chamadosMock = signal<ChamadoItem[]>([
    {
      userId: 1,
      userName: 'João',
      serviceId: 101,
      serviceCategory: CategoriaEquipamento.NOTEBOOK,
      status: StatusConcertoEnum.FINALIZADA,
      descricao: 'Descrição do chamado 1',
      slug: 'descricao-do-chamado-1',
      data: new Date(),
    },
    {
      userId: 2,
      userName: 'João',
      serviceId: 102,
      serviceCategory: CategoriaEquipamento.IMPRESSORA,
      status: StatusConcertoEnum.PAGA,
      descricao: 'Descrição do chamado 2',
      slug: 'descricao-do-chamado-2',
      data: new Date(),
    },
    {
      userId: 3,
      userName: 'José',
      serviceId: 103,
      serviceCategory: CategoriaEquipamento.MOUSE,
      status: StatusConcertoEnum.ARRUMADA,
      descricao: 'Descrição do chamado 3',
      slug: 'descricao-do-chamado-3',
      data: new Date(),
    },
    {
      userId: 4,
      userName: 'José',
      serviceId: 104,
      serviceCategory: CategoriaEquipamento.DESKTOP,
      status: StatusConcertoEnum.REDIRECIONADA,
      descricao: 'Descrição do chamado 4',
      slug: 'descricao-do-chamado-4',
      data: new Date(),
    },
    {
      userId: 5,
      userName: 'Joana',
      serviceId: 105,
      serviceCategory: CategoriaEquipamento.TECLADO,
      status: StatusConcertoEnum.APROVADA,
      descricao: 'Descrição do chamado 5',
      slug: 'descricao-do-chamado-5',
      data: new Date(),
    },
    {
      userId: 6,
      userName: 'Joana',
      serviceId: 106,
      serviceCategory: CategoriaEquipamento.IMPRESSORA,
      status: StatusConcertoEnum.REJEITADA,
      descricao: 'Descrição do chamado 6',
      slug: 'descricao-do-chamado-6',
      data: new Date(),
    },
    {
      userId: 7,
      userName: 'Joaquina',
      serviceId: 107,
      serviceCategory: CategoriaEquipamento.DESKTOP,
      status: StatusConcertoEnum.ORCADA,
      descricao: 'Descrição do chamado 7',
      slug: 'descricao-do-chamado-7',
      data: new Date(),
    },
    {
      userId: 8,
      userName: 'Joaquina',
      serviceId: 108,
      serviceCategory: CategoriaEquipamento.NOTEBOOK,
      status: StatusConcertoEnum.ABERTA,
      descricao: 'Descrição do chamado 8',
      slug: 'descricao-do-chamado-8',
      data: new Date(),
    },
  ]);
}
