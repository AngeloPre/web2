import { OrcamentoPreviewComponent } from '@shared/components/orcamento-preview/orcamento-preview.component';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ChamadoService } from '@services/chamado.service';
import { ChamadoItem } from '@model/chamado.type';

@Component({
  selector: 'app-pag-aprovar-rejeitar-orcamento',
  imports: [OrcamentoPreviewComponent, MatButtonModule, RouterLink],
  templateUrl: './pag-aprovar-rejeitar-orcamento.component.html',
  styles: ``
})

export class PagAprovarRejeitarOrcamentoComponent implements OnInit {
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
