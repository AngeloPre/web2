import { ChamadoCardComponent } from '@shared/components/chamado-card/chamado-card.component';
import { RiveLoaderComponent } from '@shared/components/rive-loader/rive-loader.component';
import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { StatusConsertoEnum } from '@model/enums/chamado-status.enum';
import { ChamadoItem } from '@model/chamado.type';
//Temporário
import { ChamadoService } from '@services/chamado.service';
import { FuncionarioService } from '@/app/services/funcionario-service';

@Component({
  selector: 'app-pag-inicial-funcionario',
  imports: [ChamadoCardComponent, RiveLoaderComponent],
  templateUrl: './pag-inicial-funcionario.component.html',
  styles: ``,
})
export class PagInicialFuncionarioComponent {
  private chamadoService = inject(ChamadoService);
  private funcionarioService = inject(FuncionarioService);
  loading = this.chamadoService.loading || this.funcionarioService.loading;

  constructor() {
    effect(() => {
      this.chamadoService.refresh({ status: StatusConsertoEnum.ABERTA }).subscribe();
      this.funcionarioService.refresh().subscribe();
    });
  }

  chamadosStatusAberto = computed(() => this.chamadoService.chamadosSignal());
}
