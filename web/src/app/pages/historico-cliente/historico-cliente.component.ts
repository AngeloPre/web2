import { HistoricoComponent } from '@/app/shared/components/historico/historico.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';

@Component({
    selector: 'app-historico-cliente',
    imports: [HistoricoComponent, MatButtonModule, RouterLink],
    templateUrl: './historico-cliente.component.html',
    styles: ``
})

export class HistoricoClienteComponent {
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
}
