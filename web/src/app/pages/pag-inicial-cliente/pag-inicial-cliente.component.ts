import { Component, inject} from '@angular/core';
import { ChamadoTableComponent } from '@shared/components/chamado-table/chamado-table.component';
import { RiveLoaderComponent } from '@shared/components/rive-loader/rive-loader.component';
import { ChamadoService } from '@services/chamado.service';

@Component({
  selector: 'app-pag-inicial-cliente',
  imports: [ChamadoTableComponent, RiveLoaderComponent],
  templateUrl: './pag-inicial-cliente.component.html',
  styles: ``,
})
export class PagInicialClienteComponent {
  private chamadoService = inject(ChamadoService);

  chamadosRequest = this.chamadoService.chamadosSignal;

  loading = this.chamadoService.loading;
}
