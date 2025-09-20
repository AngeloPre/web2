import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'dataHora'
})
export class DataHoraPipe implements PipeTransform {
    transform(valor: Date | undefined | null): string {
        if (!valor) return '';
        const data = valor instanceof Date ? valor : new Date(valor);
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();
        const hora = String(data.getHours()).padStart(2, '0');
        const minuto = String(data.getMinutes()).padStart(2, '0');
        return `${dia}/${mes}/${ano}, ${hora}:${minuto}`;
    }
}