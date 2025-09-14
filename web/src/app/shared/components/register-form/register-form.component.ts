import { Cliente } from '@/app/model/cliente';
import { Endereco } from '@/app/model/endereco';
import { StatusAtivoInativo } from '@/app/model/enums/status-ativo-inativo.enum';
import { toUF, UF } from '@/app/model/enums/uf';
import { UsuarioService } from '@/app/services/usuario.service';
import { ViacepService } from '@/app/services/viacep.service';
import { fromViaCep } from '@/app/util/mapper/endereco-mapper';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { RouterLink } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    MatSelectModule,
    MatStepperModule,
    NgxMaskDirective],

  templateUrl: './register-form.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterFormComponent {
  viacepService = inject(ViacepService);
  usuarioService = inject(UsuarioService);
  listaUfs = Object.values(UF);

  passwordVisible = false;

  cliente = new Cliente(1, '052.333.719-45', 'Marcos Renato', 'renato@email.com', "", '(41)-9 9999-8888', this.novoEndereco(), StatusAtivoInativo.ATIVO)

  // cliente: Cliente = new Cliente(
  //   '', // id
  //   '', // cpf
  //   '', // nome
  //   '', // email
  //   '', // telefone
  //   this.novoEndereco()
  // );

  constructor(private cdr: ChangeDetectorRef) {

  }

  private novoEndereco(): Endereco {
    return {
      cep: '',
      logradouro: '',
      numero: '',
      bairro: '',
      cidade: '',
      estado: '',
      uf: (this.listaUfs[0] as UF) // default
    };
  }
  onSubmit(form: NgForm) {
    if (form.invalid) return;

    this.usuarioService.inserir(this.cliente);
    console.log('cliente do form', this.cliente);
  }

  limparCampo(path: keyof Cliente) {
    (this.cliente as any)[path] = '';
  }

  limparEnderecoCampo(path: keyof Endereco) {
    (this.cliente.endereco as any)[path] = '';
  }

  buscarCep(cep: string) {
    const limpo = (cep || '').replace(/\D/g, '');//tira qualquer dígito que naõ seja um número
    if (limpo.length !== 8) return;

    this.viacepService.getCepFromViaCep(limpo).pipe(
      catchError((erro) => {
        console.log(erro);
        throw erro;
      })
    )
      .subscribe(res => {
        Object.assign(this.cliente.endereco, fromViaCep(res, ''));
        this.cdr.markForCheck();
      });
  }

  togglePassword(): void {
    this.passwordVisible = !this.passwordVisible;
  }
}
