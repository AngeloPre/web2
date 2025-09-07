import { Component, inject, OnInit, signal } from '@angular/core';
import { ChamadoItem } from '@/app/model/chamado-list-mock.type';
import { ChamadoTableComponent } from '@/app/shared/components/chamado-table/chamado-table.component';
import { ChamadoService } from '@/app/services/chamado.service';
//Temporário
import { StatusConcertoEnum } from '@/app/model/enums/chamado-status.enum';
import { CategoriaEquipamento } from '@/app/model/enums/categoria-equipamento';

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
    this.chamadosMock2.set(this.chamadoService.listarTodos());
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
