import { Component, inject, OnInit, signal } from '@angular/core';
import { ChamadoItem } from '@/app/model/chamado-list.type';
import { ChamadoTableComponent } from '@/app/shared/components/chamado-table/chamado-table.component';
//Temporário
import { StatusConcertoEnum } from '@/app/model/enums/chamado-status.enum';
import { ChamadoService } from '@/app/services/chamado.service';

@Component({
  selector: 'app-pag-inicial-cliente',
  imports: [ChamadoTableComponent],
  templateUrl: './pag-inicial-cliente.component.html',
  styles: ``,
})
export class PagInicialClienteComponent implements OnInit {
  private chamadoService = inject(ChamadoService);
  chamadosMock2 = signal<ChamadoItem[]>([]);

  ngOnInit(): void {
    this.atualizarTela();
  }

  atualizarTela(): void {
    this.chamadosMock2.set(this.chamadoService.listarEmOrdemCrescente());
  }

  btnAtualizar(event: { id: number; statusNovo: StatusConcertoEnum }): void {
    console.log(event.id);
    let chamadoToUpdate = this.chamadoService.buscarPorID(event.id);
    if (chamadoToUpdate) {
      chamadoToUpdate.status = event.statusNovo;
      this.chamadoService.atualizar(chamadoToUpdate);
      this.atualizarTela();
    } else {
      console.log('chamado nao encontrado');
    }
  }
}
