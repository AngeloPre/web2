import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-confirmar-orcamento-dialog',
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './confirmar-orcamento-dialog.component.html',
  styles: ``
})
export class ConfirmarOrcamentoDialogComponent {
  confirmarOrcamento(){
    //implementar on confirmar
  }
}
