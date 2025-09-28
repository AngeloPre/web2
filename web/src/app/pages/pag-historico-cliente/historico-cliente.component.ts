import { HistoricoComponent } from '@shared/components/historico/historico.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ChamadoService } from '@services/chamado.service';
import { ChamadoItem } from '@model/chamado.type';

@Component({
    selector: 'app-historico-cliente',
    imports: [HistoricoComponent, MatButtonModule, RouterLink],
    templateUrl: './historico-cliente.component.html',
    styles: ``
})

export class HistoricoClienteComponent implements OnInit {

    private chamadoService = inject(ChamadoService);
    
    chamado = signal<ChamadoItem | undefined>(undefined);
    constructor(
        private route: ActivatedRoute
    ) {
        this.getOrder();
    }

    getOrder() {
        this.route.paramMap.subscribe(params => {
            const orderId = params.get('id');
        });
    }

    ngOnInit(): void {
    const serviceId = this.route.snapshot.paramMap.get('id');
    if (serviceId) {
      this.chamado.set(this.chamadoService.buscarPorID(+serviceId))
    }
  }
}
