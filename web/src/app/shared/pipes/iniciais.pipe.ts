import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'iniciais',
  standalone: true,
})
export class IniciaisPipe implements PipeTransform {
  transform(name?: string | null): string {
    if (!name) return '';
    const trimmed = name.trim();
    if (!trimmed) return '';
    const parts = trimmed.split(' ').filter(p => p);
    const first = parts[0].charAt(0);
    const last = parts.length > 1 ? parts[parts.length - 1].charAt(0) : '';
    return (first + last).toUpperCase();
  }
}