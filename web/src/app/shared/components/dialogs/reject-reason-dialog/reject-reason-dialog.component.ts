import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reject-reason-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './reject-reason-dialog.component.html',
  styles: ``
})
export class RejectReasonDialogComponent {
  reason: string = '';
  constructor(private ref: MatDialogRef<RejectReasonDialogComponent>) { }

  rejeitarOrcamento(): void {
    this.ref.close({ reason: this.reason.trim() });
  }
}
