import { ChamadoCardComponent } from '@/app/shared/components/chamado-card/chamado-card.component';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Signal,
  signal,
} from '@angular/core';
import { ChamadoItem } from '@/app/model/chamado.type';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButton } from '@angular/material/button';
import { ChamadoService } from '@/app/services/chamado.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-pag-solicitacoes',
  imports: [
    ChamadoCardComponent,
    MatButton,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './pag-solicitacoes.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PagSolicitacoesComponent {
  private chamadoService = inject(ChamadoService);
  opcaoData = signal<'HOJE' | 'DATA' | 'TODOS'>('TODOS');
  data_inicial = signal<string>('');
  data_fim = signal<string>('');

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  chamdados: Signal<ChamadoItem[]> = computed(() => {
    if (this.data_inicial() && this.data_fim()) {
      return this.chamadoService.listarFiltroData(
        this.data_inicial(),
        this.data_fim()
      );
    } else {
      return this.chamadoService.listarEmOrdemCrescente();
    }
  });

  mudarFiltro(novoFiltro: 'HOJE' | 'DATA' | 'TODOS'): void {
    switch (novoFiltro) {
      case 'HOJE':
        this.data_inicial.set(new Date().toDateString());
        this.data_fim.set(new Date().toDateString());
        this.opcaoData.set('HOJE');
        break;
      case 'DATA':
        this.range.reset();
        this.opcaoData.set('DATA');
        break;
      case 'TODOS':
        this.data_inicial.set('');
        this.data_fim.set('');
        this.opcaoData.set('TODOS');
    }
  }

  mudancaDatepicker(range: any) {
    if (range.value.start && range.value.end) {
      this.data_inicial.set(range.value.start);
      this.data_fim.set(range.value.end);
    }
  }
}
