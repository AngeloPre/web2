import { CepValidoDirective } from '@/app/directives/cep-valido.directive';
import { EmailUnicoDirective } from '@/app/directives/email-unico.directive';
import { Cliente } from '@model/cliente';
import { Endereco } from '@model/endereco';
import { StatusAtivoInativo } from '@model/enums/status-ativo-inativo.enum';
import { UF } from '@model/enums/uf';
import { EmailjsService } from '@services/emailjs.service';
import { UsuarioService } from '@services/usuario.service';
import { ViacepService } from '@services/viacep.service';
import { fromViaCep } from '@/app/util/mapper/endereco-mapper';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { RouterLink } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import { catchError, EMPTY } from 'rxjs';

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
    NgxMaskDirective,
    EmailUnicoDirective,
    CepValidoDirective
  ],

  templateUrl: './register-form.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterFormComponent {
  viacepService = inject(ViacepService);
  usuarioService = inject(UsuarioService);
  listaUfs = Object.values(UF);
  private email = inject(EmailjsService);

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
    this.enviarSenha(this.cliente.email, this.cliente.senha);
    console.log('cliente do form', this.cliente);
  }

  limparCampo(path: keyof Cliente) {
    (this.cliente as any)[path] = '';
  }

  limparEnderecoCampo(path: keyof Endereco) {
    (this.cliente.endereco as any)[path] = '';
  }

  buscarCep(cepModel: NgModel) {
    const limpo = (cepModel.value || '').toString().replace(/\D/g, '');//tira qualquer dígito que naõ seja um número
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
  enviarSenha(email: string, senha: string) {
    this.email.mandarSenha(email, senha).then(() => {
      alert('Enviado!');
    }).catch(err => {
      console.error(err);
      alert('Falha ao enviar');
    });

  }
}
