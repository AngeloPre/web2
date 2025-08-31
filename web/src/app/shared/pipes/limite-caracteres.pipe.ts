import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limiteCaracteres',
})
export class LimiteCaracteresPipe implements PipeTransform {
  transform(texto: string, limite: number): string {
    if (texto.length <= limite) {
      return texto;
    } else {
      return texto.substring(0, limite) + '\u2026';
    }
  }
}
