import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'data'
})
export class DataPipe implements PipeTransform {
    transform(valor: Date | undefined | null): string {
        if (!valor) return '';
        const data = valor instanceof Date ? valor : new Date(valor);
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();
        return `${dia}/${mes}/${ano}`;
    }
}