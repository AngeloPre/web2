import { Endereco } from "@/app/model/endereco";
import { EnderecoViaCep } from "@/app/model/endereco-viacep-type";
import { toUF, UF } from "@/app/model/enums/uf";

export function fromViaCep(dto: EnderecoViaCep, numero: string): Endereco {
  return {
    cep: dto.cep,
    logradouro: dto.logradouro,
    bairro: dto.bairro,
    cidade: dto.localidade,
    uf: toUF(dto.uf),
    numero,
    complemento: '',
  };
}
