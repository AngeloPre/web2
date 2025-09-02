import { ChamadoCardComponent } from '@/app/shared/components/chamado-card/chamado-card.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-pag-inicial-funcionario',
  imports: [ChamadoCardComponent],
  templateUrl: './pag-inicial-funcionario.component.html',
  styles: ``
})
export class PagInicialFuncionarioComponent {
  
  items = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 }
  ];
}
