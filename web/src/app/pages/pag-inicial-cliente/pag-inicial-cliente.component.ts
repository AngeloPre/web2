import { Component, inject, OnInit, signal } from '@angular/core';
import { ChamadoTableComponent } from '@shared/components/chamado-table/chamado-table.component';
import { ChamadoService } from '@services/chamado.service';

@Component({
  selector: 'app-pag-inicial-cliente',
  imports: [ChamadoTableComponent],
  templateUrl: './pag-inicial-cliente.component.html',
  styles: ``,
})
export class PagInicialClienteComponent {
  private chamadoService = inject(ChamadoService);

  chamadosMock = this.chamadoService.chamadosSignal;
}
