import { CepValidoDirective } from '@/app/directives/cep-valido.directive';
import { EmailUnicoDirective } from '@/app/directives/email-unico.directive';
import { Cliente } from '@model/cliente';
import { Endereco } from '@model/endereco';
import { Register } from '@model/register';
import { UF } from '@model/enums/uf';
import { RegisterService } from '@services/register.service';
import { ViacepService } from '@services/viacep.service';
import { fromViaCep } from '@/app/util/mapper/endereco-mapper';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
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
  registerService = inject(RegisterService);
  listaUfs = Object.values(UF);

  passwordVisible = false;

  cliente: Register = {
    nome: '',
    email: '',
    cpf: '',
    telefone: '',
    endereco: this.novoEndereco()
  };

  constructor(private cdr: ChangeDetectorRef) {

  }

  private novoEndereco(): Endereco {
    return {
      cep: '',
      logradouro: '',
      complemento: '',
      numero: '',
      bairro: '',
      cidade: '',
      uf: (this.listaUfs[0] as UF)
    };
  }
  onSubmit(form: NgForm) {
    if (form.invalid) return;

    this.registerService.register(this.cliente).subscribe({
      next: () => {
        alert('Cadastro realizado! Você receberá a senha por e-mail.');
      },
      error: (err) => {
        console.error(err);
        alert('Falha no cadastro.');
      }
    });
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
    //this.passwordVisible = !this.passwordVisible;
  }
}
