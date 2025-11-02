import { Funcionario } from '@model/funcionario';
import { Component, inject, input, OnInit } from '@angular/core';
import { Form, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import {
  MatFormField,
  MatInput,
  MatInputModule,
  MatLabel,
} from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { UsuarioService } from '@services/usuario.service';
import { ConfirmarModalComponent } from '../confirmar-modal/confirmar-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { FuncionarioService } from '@/app/services/funcionario.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-funcionario-form',
  imports: [
    FormsModule,
    MatIcon,
    MatInput,
    MatLabel,
    MatFormField,
    RouterLink,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatCardModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './funcionario-form.component.html',
  styles: ``,
})
export class FuncionarioFormComponent {
  private dialog = inject(MatDialog);
  router = inject(Router);
  //usuarioService = inject(UsuarioService);
  funcionarioService = inject(FuncionarioService);
  avatarPreview: string | null = null;
  funcionario = input.required<Funcionario>();
  private snack = inject(MatSnackBar);

  onSubmit(form: Form) {}

  limparCampo(path: keyof Funcionario) {
    // (this.funcionario as any)[path] = '';
  }

  onAvatarChange(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => (this.avatarPreview = reader.result as string);
    reader.readAsDataURL(file);
  }

  salvarFuncionario() {
    console.log(this.funcionario());
    if (this.funcionario().id === 0) {
      this.funcionarioService.inserir(this.funcionario()).subscribe({
        next: (resp) => {
          this.snack.open(`Funcionário ${resp.nome} criado com sucesso`, 'OK', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: ['snack-top', 'snack-success'],
          });
          this.router.navigate(['/funcionario/funcionarios']);
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
    } else {
      this.funcionarioService.atualizar(this.funcionario()).subscribe({
        next: (resp) => {
          this.snack.open(
            `Funcionário ${resp.nome} atualizado com sucesso`,
            'OK',
            {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
              panelClass: ['snack-top', 'snack-success'],
            }
          );
          this.router.navigate(['/funcionario/funcionarios']);
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
  }

  confirmarExcluir() {
    this.dialog
      .open(ConfirmarModalComponent, {
        data: {
          titulo: `Deseja excluir o(a) funcionário(a) ${
            this.funcionario().nome
          }?`,
          confirmacao: 'Excluir',
        },
        width: '360px',
      })
      .afterClosed()
      .subscribe((ok) => {
        if (!ok) return;

        this.funcionarioService.remover(this.funcionario().id);
        this.router.navigate(['/funcionario/funcionarios']);
      });
  }
}
