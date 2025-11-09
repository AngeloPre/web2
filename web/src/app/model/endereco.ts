import { UF } from "./enums/uf";

export type Endereco = {
  cep: string,
  logradouro: string,
  complemento?: string,
  bairro: string,
  cidade: string,//localidade
  uf: UF,
  numero: string
};
