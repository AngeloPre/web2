import { Directive, forwardRef, inject } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ViacepService } from '@/app/services/viacep.service';

@Directive({
  selector: '[cepValido][ngModel]',
  standalone: true,
  providers: [{
    provide: NG_ASYNC_VALIDATORS,
    useExisting: forwardRef(() => CepValidoDirective),
    multi: true,
  }],
})
export class CepValidoDirective implements AsyncValidator {
  private viacep = inject(ViacepService);

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const inputCep = (control.value ?? '').toString();
    const cep = inputCep.replace(/\D/g, '');
    if (!cep || cep.length !== 8) return of(null);

    return this.viacep.getCepFromViaCep(cep).pipe(
      map((res: any) => {
        const naoEncontrou = res?.erro === true || res?.erro === 'true';
        return naoEncontrou ? { cepInvalido: true } : null;
      }),
      catchError(() => of({ cepInvalido: true }))
    );
  }
}
