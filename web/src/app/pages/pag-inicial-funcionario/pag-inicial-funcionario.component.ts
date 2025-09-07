import { ChamadoCardComponent } from '@/app/shared/components/chamado-card/chamado-card.component';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ChamadoItem } from '@/app/model/chamado-list-mock.type';
//Temporário
import { ChamadoService } from '@/app/services/chamado.service';
import { StatusConcertoEnum } from '@/app/model/enums/chamado-status.enum';
import { CategoriaEquipamento } from '@/app/model/enums/categoria-equipamento';

@Component({
  selector: 'app-pag-inicial-funcionario',
  imports: [ChamadoCardComponent],
  templateUrl: './pag-inicial-funcionario.component.html',
  styles: ``,
})
export class PagInicialFuncionarioComponent implements OnInit {
  private chamadoService = inject(ChamadoService);

  chamadosMock = signal<ChamadoItem[]>([]);

  ngOnInit(): void {
    this.atualizarTela();
    console.log(this.chamadoService.listarTodos());
  }

  atualizarTela(): void {
    this.chamadosMock.set(this.chamadoService.listarTodos());
  }
}
