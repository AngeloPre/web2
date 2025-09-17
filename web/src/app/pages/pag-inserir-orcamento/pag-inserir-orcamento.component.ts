import { EfetuarOrcamentoComponent } from '@/app/shared/components/efetuar-orcamento/efetuar-orcamento.component';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ChamadoService } from '@/app/services/chamado.service';
import { ChamadoItem } from '@/app/model/chamado.type';

@Component({
  selector: 'app-pag-inserir-orcamento',
  imports: [EfetuarOrcamentoComponent, RouterLink, MatButtonModule],
  templateUrl: './pag-inserir-orcamento.component.html',
  styles: ``
})
export class PagInserirOrcamentoComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private chamadoService = inject(ChamadoService);

  chamado = signal<ChamadoItem | undefined>(undefined);

  ngOnInit(): void {
    const serviceId = this.route.snapshot.paramMap.get('id');
    if (serviceId) {
      this.chamado.set(this.chamadoService.buscarPorID(+serviceId))
    }
  }
}
