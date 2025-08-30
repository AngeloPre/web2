import { Component } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatFormField } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-solicitacao-cliente',
  imports: [MatFormField, MatInput, MatSelectModule, MatButton],
  templateUrl: './solicitacao-cliente.component.html',
  styles: ``,
})
export class SolicitacaoClienteComponent {
  categorias: string[] = ['Desktop', 'Notebook', 'Monitor'];
}
