import { ChamadoItem } from '@/app/model/chamado.type';
import { ChamadoService } from '@/app/services/chamado.service';
import { StatusIconComponent } from '@/app/shared/components/status-icon/status-icon.component';
import { ConfirmarModalComponent } from '@/app/shared/components/confirmar-modal/confirmar-modal.component';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterModule,
} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { StatusConcertoEnum } from '@/app/model/enums/chamado-status.enum';

@Component({
  selector: 'app-pagar-cliente',
  imports: [
    RouterLink,
    RouterModule,
    MatButtonModule,
    StatusIconComponent,
    DatePipe,
    CurrencyPipe,
  ],
  templateUrl: './pagar-cliente.component.html',
  styles: ``,
})
export class PagarClienteComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private chamadoService = inject(ChamadoService);
  private dialog = inject(MatDialog);
  chamado: ChamadoItem | undefined = undefined;

  ngOnInit(): void {
    let serviceID = +this.route.snapshot.params['id'];
    this.chamado = this.chamadoService.buscarPorID(serviceID);
    console.log(this.chamado);
  }

  pagar(): void {
    if (this.chamado) {
      this.chamado.status = StatusConcertoEnum.PAGA;
      this.chamadoService.atualizar(this.chamado);
      this.router.navigate(['/cliente']);
    }
  }

  abrirModal(): void {
    const dialogRef = this.dialog.open(ConfirmarModalComponent, {
      data: { titulo: 'Deseja Realmente Pagar?', confirmacao: 'Pagar' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.pagar();
    });
  }
}
