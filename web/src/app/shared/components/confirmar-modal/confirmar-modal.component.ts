import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmar-modal',
  imports: [MatButton, MatDialogModule],
  templateUrl: './confirmar-modal.component.html',
  styles: ``,
})
export class ConfirmarModalComponent {
  data = inject(MAT_DIALOG_DATA);
}
