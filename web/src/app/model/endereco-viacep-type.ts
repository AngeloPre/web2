export type EnderecoViaCep = {
  cep: string,
  logradouro: string,
  complemento?: string,
  unidade?: string,
  bairro: string,
  localidade: string,//é o nome da cidade
  uf: string,
  regiao: string,
  ibge: number,
  ddd: number
};
