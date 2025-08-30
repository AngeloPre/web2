import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatFormField } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SoliticacaoConfirmarComponent } from '@/app/shared/components/soliticacao-confirmar/soliticacao-confirmar.component';

@Component({
  selector: 'app-solicitacao-cliente',
  imports: [
    MatFormField,
    MatInput,
    MatSelectModule,
    MatButton,
    MatDialogModule,
  ],
  templateUrl: './solicitacao-cliente.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SolicitacaoClienteComponent {
  categorias: string[] = ['Desktop', 'Notebook', 'Monitor'];

  readonly dialog = inject(MatDialog);

  openDialog() {
    const dialogRef = this.dialog.open(SoliticacaoConfirmarComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
