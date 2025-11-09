import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  Signal,
  signal,
  ViewChild,
} from '@angular/core';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatFormField } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CategoriaEquipamentoService } from '@services/categoria-equipamento.service';
import { ConfirmarModalComponent } from '@shared/components/confirmar-modal/confirmar-modal.component';
//import { StatusAtivoInativo } from '@model/enums/status-ativo-inativo.enum';
import { ChamadoItem } from '@model/chamado.type';
import { StatusConsertoEnum } from '@model/enums/chamado-status.enum';
import { FormsModule, NgForm } from '@angular/forms';
import { ChamadoService } from '@services/chamado.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-solicitacao-cliente',
  imports: [
    MatFormField,
    MatInput,
    MatSelectModule,
    MatButton,
    MatDialogModule,
    FormsModule,
  ],
  templateUrl: './solicitacao-cliente.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SolicitacaoClienteComponent {
  private catEquipamentoService = inject(CategoriaEquipamentoService);
  private chamadoService = inject(ChamadoService);
  private router = inject(Router);
  readonly dialog = inject(MatDialog);
  private snack = inject(MatSnackBar);

  @ViewChild('formChamado') formChamado!: NgForm;

  categorias = computed(() =>
    this.catEquipamentoService.signalCategorias().filter((cat) => !!cat.status)
  );

  pedido: ChamadoItem = {
    id: 0,
    userId: 0,
    userName: '',
    serviceId: -1,
    serviceCategory: '',
    cliente: '',
    status: StatusConsertoEnum.ABERTA,
    descricaoEquipamento: '',
    descricaoFalha: '',
    slug: 'slug',
    //etapas: [],
    dataCriacao: new Date(),
    precoBase: 0,
  };

  criarChamado(): void {
    this.chamadoService.inserir(this.pedido).subscribe({
      next: (resp) => {
        this.snack.open('Chamado criado com sucesso', 'OK', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: ['snack-top', 'snack-success'],
        });
        this.router.navigate(['/cliente']);
      },
      error: (err) => {
        this.snack.open(err.error, 'OK', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: ['snack-top', 'snack-danger'],
        });
      },
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(ConfirmarModalComponent, {
      data: { titulo: 'Deseja Abrir Solicitação', confirmacao: 'Abrir' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result || this.formChamado.form.valid) this.criarChamado();
    });
  }
}
