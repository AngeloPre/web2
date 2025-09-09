import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nova-categoria-equipamento',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './nova-categoria-equipamento.component.html',
  styles: ``
})
export class NovaCategoriaEquipamentoComponent {
  categoria = '';
  valor = '';
  constructor(
    private ref: MatDialogRef<NovaCategoriaEquipamentoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  send() {
    const valorCentavos = Number((this.valor).replace(/\D/g, ''));
    this.ref.close({ categoria: this.categoria.trim(), valorCentavos });
  }
}
