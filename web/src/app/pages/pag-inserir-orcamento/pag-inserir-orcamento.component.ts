import { EfetuarOrcamentoComponent } from '@/app/shared/components/efetuar-orcamento/efetuar-orcamento.component';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-pag-inserir-orcamento',
  imports: [EfetuarOrcamentoComponent, RouterLink, MatButtonModule],
  templateUrl: './pag-inserir-orcamento.component.html',
  styles: ``
})
export class PagInserirOrcamentoComponent {

}
