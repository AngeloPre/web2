import { ChamadoCardComponent } from '@shared/components/chamado-card/chamado-card.component';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { StatusConsertoEnum } from '@model/enums/chamado-status.enum';
import { ChamadoItem } from '@model/chamado.type';
//Temporário
import { ChamadoService } from '@services/chamado.service';

@Component({
  selector: 'app-pag-inicial-funcionario',
  imports: [ChamadoCardComponent],
  templateUrl: './pag-inicial-funcionario.component.html',
  styles: ``,
})
export class PagInicialFuncionarioComponent {
  private chamadoService = inject(ChamadoService);

  chamadosStatusAberto = computed(() =>
    this.chamadoService
      .chamadosSignal()
      .filter((chamado) => chamado.status === StatusConsertoEnum.ABERTA)
  );
}
