import { ChamadoCardComponent } from '@/app/shared/components/chamado-card/chamado-card.component';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { StatusConcertoEnum } from '@/app/model/enums/chamado-status.enum';
import { ChamadoItem } from '@/app/model/chamado.type';
//Temporário
import { ChamadoService } from '@/app/services/chamado.service';

@Component({
  selector: 'app-pag-inicial-funcionario',
  imports: [ChamadoCardComponent],
  templateUrl: './pag-inicial-funcionario.component.html',
  styles: ``,
})
export class PagInicialFuncionarioComponent implements OnInit {
  private chamadoService = inject(ChamadoService);

  chamadosMock = signal<ChamadoItem[]>([]);
  chamadosStatusAberto = computed(() =>
    this.chamadosMock().filter(
      chamado => chamado.status === StatusConcertoEnum.ABERTA
    )
  );
  
  ngOnInit(): void {
    this.atualizarTela();
    console.log(this.chamadoService.listarPorStatus(StatusConcertoEnum.ABERTA));
  }

  atualizarTela(): void {
    this.chamadosMock.set(this.chamadoService.listarPorStatus(StatusConcertoEnum.ABERTA));
  }
}
