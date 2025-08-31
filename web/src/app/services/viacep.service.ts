import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EnderecoViaCep } from '../model/endereco-viacep-type';

@Injectable({
  providedIn: 'root'
})
export class ViacepService {
  http = inject(HttpClient);
  getCepFromViaCep(cep: string) {
    const url = `https://viacep.com.br/ws/${cep}/json/`
    return this.http.get<EnderecoViaCep>(url);
  }
}
