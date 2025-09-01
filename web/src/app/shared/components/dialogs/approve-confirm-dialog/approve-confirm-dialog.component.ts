import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-approve-confirm-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './approve-confirm-dialog.component.html',
  styles: ``
})
export class ApproveConfirmDialogComponent {
  constructor(
    private ref: MatDialogRef<ApproveConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  confirm() { this.ref.close(true); }
}
