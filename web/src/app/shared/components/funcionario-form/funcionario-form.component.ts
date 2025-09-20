import { Funcionario } from '@/app/model/funcionario';
import { Component, inject, input, OnInit } from '@angular/core';
import { Form, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatInput, MatInputModule, MatLabel } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { UsuarioService } from '@/app/services/usuario.service';
import { ConfirmarModalComponent } from '../confirmar-modal/confirmar-modal.component';
import { MatDialog } from '@angular/material/dialog';

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
    MatCardModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './funcionario-form.component.html',
  styles: ``
})
export class FuncionarioFormComponent {
  private dialog = inject(MatDialog);
  router = inject(Router);
  usuarioService = inject(UsuarioService);
  avatarPreview: string | null = null;
  funcionario = input.required<Funcionario>();

  onSubmit(form: Form) { }

  limparCampo(path: keyof Funcionario) {
    // (this.funcionario as any)[path] = '';
  }

  onAvatarChange(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => this.avatarPreview = reader.result as string;
    reader.readAsDataURL(file);
  }

  salvarFuncionario() {
    if (this.funcionario().id === 0) {
      this.usuarioService.inserir(this.funcionario());
    } else {
      this.usuarioService.atualizar(this.funcionario());
    }
    this.router.navigate(['/funcionario/funcionarios']);
  }

  confirmarExcluir() {
    this.dialog.open(ConfirmarModalComponent, {
      data: { titulo: `Deseja excluir o(a) funcionário(a) ${this.funcionario().nome}?`, confirmacao: 'Excluir' },
      width: '360px'
    }).afterClosed().subscribe(ok => {
      if (!ok) return;

      this.usuarioService.remover(this.funcionario());
      this.router.navigate(['/funcionario/funcionarios']);
    });
  }
}
