import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ChamadoItem } from '@/app/model/chamado.type';

@Component({
  selector: 'app-approve-confirm-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule
  ],
    templateUrl: './approve-confirm-dialog.component.html',
    styles: ``
  })
  export class ApproveConfirmDialogComponent {
    public data: { chamado: ChamadoItem } = inject(MAT_DIALOG_DATA);

    constructor(private ref: MatDialogRef<ApproveConfirmDialogComponent>) { }

    aprovarOrcamento(): void {
      this.ref.close(true);
    }

    cancelar(): void {
      this.ref.close(false);
    }
  }
