import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CategoriaEquipamentoService } from '@/app/services/categoria-equipamento.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { PdfServiceService } from '@/app/services/pdf-service.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-pag-relatorios',
  imports: [
    MatButtonModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './pag-relatorios.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PagRelatoriosComponent {
  private categoriaService = inject(CategoriaEquipamentoService);
  private pdfService = inject(PdfServiceService);
  tipoRelatorio = signal<'Periodo' | 'Categoria'>('Periodo');

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  categorias = computed(() =>
    this.categoriaService.signalCategorias().map((cat) => cat.name)
  );

  mudarTipoRelatorio(novoTipo: 'Periodo' | 'Categoria') {
    this.tipoRelatorio.set(novoTipo);
  }

  gerarPDF(): void {
    this.pdfService.gerarPDF(
      this.tipoRelatorio(),
      this.range.value.start?.toLocaleDateString('pt-BR'),
      this.range.value.end?.toLocaleDateString('pt-BR'),
      this.categorias()
    );
  }
}
