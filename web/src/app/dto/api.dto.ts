import { Cliente } from "../model/cliente";
import { Endereco } from "../model/endereco";
import { StatusAtivoInativo } from "../model/enums/status-ativo-inativo.enum";
import { Funcionario } from "../model/funcionario";

export type EnderecoApi = {
  cep: string;
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  uf: string;
};

export type ClienteApi = {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  endereco: EnderecoApi;
};

export type FuncionarioApi = {
  id: number;
  nome: string;
  email: string;
  dataNascimento: string;
} | null;

export type EtapaHistoricoApi = {
  id: number;
  status: string;
  comentario: string | null;
  dataCriacao: string;
  funcionario: FuncionarioApi;
  motivoRejeicao: string | null;
};

export type OrcamentoApi = {
  id: number;
  valor: number;
} | null;


export type ChamadoApi = {
  id: number;
  slug: string;
  cliente: ClienteApi;
  funcionario: FuncionarioApi;
  categoriaNome: string;
  descricaoEquipamento: string;
  descricaoFalha: string;
  precoBase: number;
  comentario: string | null;
  status: string;
  dataCriacao: string;
  dataResposta: string | null;
  etapas: EtapaHistoricoApi[];
  orcamento: OrcamentoApi;
};


export function mapEndereco(api: EnderecoApi): Endereco {
  return {
    cep: api.cep,
    logradouro: api.logradouro,
    numero: api.numero,
    bairro: api.bairro,
    cidade: api.cidade,
    uf: api.uf,
  } as Endereco;
}

export function mapFuncionario(api: FuncionarioApi): Funcionario | undefined {
  if (!api) return undefined;
  return {
    id: api.id,
    nome: api.nome,
    email: api.email,
    dataNascimento: new Date(api.dataNascimento),
  } as unknown as Funcionario;
}

export function mapCliente(api: ClienteApi): Cliente {
  return new Cliente(
    api.id,
    api.cpf,
    api.nome,
    api.email,
    '',//placeholder, ver se faz sentido remover dps
    api.telefone,
    mapEndereco(api.endereco),
    StatusAtivoInativo.ATIVO //placeholder, ver se faz sentido remover dps
  );
}

export function enderecoToApi(e: Endereco): EnderecoApi {
  return {
    cep: e.cep,
    logradouro: e.logradouro,
    numero: e.numero,
    bairro: e.bairro,
    cidade: e.cidade,
    uf: e.uf,
  };
}

export function clienteToApi(c: Cliente): ClienteApi {
  return {
    id: c.id,
    nome: c.nome,
    email: c.email,
    telefone: c.telefone,
    cpf: c.cpf,
    endereco: enderecoToApi(c.endereco as Endereco),
  };
}

export function funcionarioToApi(f?: Funcionario | null): FuncionarioApi {
  if (!f) return null;
  return {
    id: f.id!,
    nome: f.nome,
    email: f.email,
    dataNascimento: (f.dataNascimento instanceof Date)
      ? f.dataNascimento.toISOString().slice(0, 10) // yyyy-mm-dd
      : String(f.dataNascimento),
  };
}
