import { Injectable } from '@angular/core';
import slugify from 'slugify';

export type SlugifyOptions = Exclude<Parameters<typeof slugify>[1], string>;

@Injectable({
  providedIn: 'root'
})
export class SlugifyService {

  private readonly padraoSlug: SlugifyOptions = {
    lower: true,
    strict: true,
    locale: 'pt',
    trim: true,
    replacement: '-',
  };

  make(input: string | null | undefined, option?: SlugifyOptions): string {
    return slugify(input ?? '', { ...this.padraoSlug, ...(option ?? {}) });
  }
  constructor() { }
}