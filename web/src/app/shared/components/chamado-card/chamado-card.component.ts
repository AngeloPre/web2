import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-chamado-card',
  imports: [ MatCardModule, RouterLink ],
  templateUrl: './chamado-card.component.html',
  styles: ``
})
export class ChamadoCardComponent {
  
}
