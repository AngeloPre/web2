import { ChamadoCardComponent } from '@shared/components/chamado-card/chamado-card.component';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButton } from '@angular/material/button';
import { ChamadoService } from '@services/chamado.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { RiveLoaderComponent } from '@shared/components/rive-loader/rive-loader.component';

@Component({
  selector: 'app-pag-solicitacoes',
  imports: [
    ChamadoCardComponent,
    MatButton,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    RiveLoaderComponent,
  ],
  templateUrl: './pag-solicitacoes.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PagSolicitacoesComponent {
  private chamadoService = inject(ChamadoService);
  opcaoData = signal<'HOJE' | 'DATA' | 'TODOS'>('TODOS');
  data_inicial = signal<Date | null>(null);
  data_fim = signal<Date | null>(null);

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  chamados = this.chamadoService.chamadosSignal;
  loading = this.chamadoService.loading;
  constructor() {
    effect(() => {
      const modo = this.opcaoData();
      const di   = this.data_inicial();
      const df   = this.data_fim();

      let params:
        | { dataInicio?: Date; dataFim?: Date }
        | undefined;

      if (modo === 'HOJE') {
        const today = new Date();
        params = { dataInicio: today, dataFim: today };
      } else if (modo === 'DATA' && di && df) {
        params = { dataInicio: di, dataFim: df };
      } else {
        params = undefined;
      }

      this.chamadoService.refresh(params).subscribe();
    });
  }
  mudarFiltro(novoFiltro: 'HOJE' | 'DATA' | 'TODOS'): void {
    switch (novoFiltro) {
      case 'HOJE':
        this.data_inicial.set(new Date());
        this.data_fim.set(new Date());
        this.opcaoData.set('HOJE');
        break;
      case 'DATA':
        this.range.reset();
        this.opcaoData.set('DATA');
        break;
      case 'TODOS':
        this.data_inicial.set(null);
        this.data_fim.set(null);
        this.opcaoData.set('TODOS');
    }
  }

  mudancaDatepicker() {
    if (this.range.value.start && this.range.value.end) {
      this.data_inicial.set(this.range.value.start);
      this.data_fim.set(this.range.value.end);
    }
  }
}
