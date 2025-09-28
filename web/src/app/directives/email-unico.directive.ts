import { Directive, forwardRef, inject } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { UsuarioService } from '@/app/services/usuario.service';

@Directive({
  selector: '[emailUnico][ngModel]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => EmailUnicoDirective),
    multi: true,
  }],
})
export class EmailUnicoDirective implements Validator {
  private usuarioService = inject(UsuarioService);

  validate(control: AbstractControl): ValidationErrors | null {
    const inputEmail = (control.value ?? '').toString().trim();
    if (!inputEmail) return null; // garantia que o campo não entre aqui vazio

    if (control.hasError?.('email')) return null;// se tiver algum erro no preenchimento não prosseguir

    const email = inputEmail.toLowerCase();
    const existe = !!this.usuarioService.buscarPorEmail(email);
    return existe ? { jaExisteEmail: true } : null;
  }
}
