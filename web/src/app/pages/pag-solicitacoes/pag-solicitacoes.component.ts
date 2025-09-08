import { ChamadoCardComponent } from '@/app/shared/components/chamado-card/chamado-card.component';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ChamadoItem } from '@/app/model/chamado-list.type';
//Temporário
import { ChamadoService } from '@/app/services/chamado.service';

@Component({
  selector: 'app-pag-solicitacoes',
  imports: [ChamadoCardComponent],
  templateUrl: './pag-solicitacoes.component.html',
  styles: ``
})
export class PagSolicitacoesComponent implements OnInit {
  private chamadoService = inject(ChamadoService);

  chamadosMock = signal<ChamadoItem[]>([]);

  ngOnInit(): void {
    this.atualizarTela();
    console.log(this.chamadoService.listarTodos());
  }

  atualizarTela(): void {
    this.chamadosMock.set(this.chamadoService.listarTodos());
  }
}
