import { ChamadoItem } from '@model/chamado.type';
import { ChamadoService } from '@services/chamado.service';
import { StatusIconComponent } from '@shared/components/status-icon/status-icon.component';
import { ConfirmarModalComponent } from '@shared/components/confirmar-modal/confirmar-modal.component';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterModule,
} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { StatusConsertoEnum } from '@/app/model/enums/chamado-status.enum';
import { EtapaHistorico } from '@/app/model/etapa-historico.type';

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

  chamado = signal<ChamadoItem | undefined>(undefined);

  ngOnInit(): void {
    let chamadoId = +this.route.snapshot.params['id'];
    this.chamadoService.buscarPorId(chamadoId).subscribe(c => {
      this.chamado.set(c);
    });
    console.log(this.chamado);
  }

  pagar(): void {
    const atual = this.chamado();
    if (!atual) return;

    const novaEtapa: EtapaHistorico = {
      id: -1,
      serviceId: atual.id,
      status: StatusConsertoEnum.PAGA,
      dataCriado: new Date()
    }

    this.chamadoService.pagar(atual.id, novaEtapa).subscribe({
      next: salvo => {
        this.chamado.set(salvo);
        this.router.navigate(['/cliente']);
      },
      error: (e) => {
        console.error(e);
      }
    });
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
