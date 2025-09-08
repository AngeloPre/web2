import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeradorsenhaService {

  constructor() { }

  gerarSenha(): string {
    const numeroAleatorio = Math.random() * 9000;
    const senhaQuatroDigitos = Math.floor(1000 + numeroAleatorio);
    return senhaQuatroDigitos.toString();
  }
}
