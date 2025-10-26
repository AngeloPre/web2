import { Component, inject, OnInit, signal } from '@angular/core';
import { ChamadoItem } from '@/app/model/chamado.type';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ChamadoService } from '@services/chamado.service';
import { EfetuarManutencaoComponent } from '@/app/shared/components/efetuar-manutencao/efetuar-manutencao.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-pag-efetuar-manutencao',
  imports: [EfetuarManutencaoComponent, RouterLink, MatButtonModule],
  templateUrl: './pag-efetuar-manutencao.component.html',
  styles: ``
})

export class PagEfetuarManutencaoComponent {
  private chamadoService = inject(ChamadoService);
  chamado = signal<ChamadoItem | undefined>(undefined);

  constructor(
    private route: ActivatedRoute
  ) {
    this.salvarChamado = this.salvarChamado.bind(this);
    this.atualizarTela();
  }

  atualizarTela(): void {
    this.route.paramMap.subscribe(params => {
      const chamadoIdParam = params.get('id');
      const chamadoId = chamadoIdParam !== null ? Number(chamadoIdParam) : null;

      if (chamadoId !== null && !isNaN(chamadoId)) {
        this.chamadoService.buscarPorId(chamadoId).subscribe(c => {
          this.chamado.set(c);
        });
      }
    });
  }

  salvarChamado(chamadoItem: ChamadoItem): void {
    this.chamadoService.atualizar(chamadoItem);
    this.atualizarTela();
  }

}
