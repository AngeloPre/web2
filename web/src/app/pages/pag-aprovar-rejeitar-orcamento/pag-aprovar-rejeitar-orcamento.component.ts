import { OrcamentoPreviewComponent } from '@/app/shared/components/orcamento-preview/orcamento-preview.component';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-pag-aprovar-rejeitar-orcamento',
  imports: [OrcamentoPreviewComponent, MatButtonModule, RouterLink],
  templateUrl: './pag-aprovar-rejeitar-orcamento.component.html',
  styles: ``
})
export class PagAprovarRejeitarOrcamentoComponent {

}
