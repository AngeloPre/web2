import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-soliticacao-confirmar',
  imports: [MatButton, MatDialogModule],
  templateUrl: './soliticacao-confirmar.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SoliticacaoConfirmarComponent {}
