import { Endereco } from '@model/endereco';

export type Register = {
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
  endereco: Endereco;
};