import { StatusConsertoEnum } from './enums/chamado-status.enum';
export type Tecnico = {
  nome: string;
};

export type Redirecionamento = {
  //tecnico redireciona quando não está apto
  tecnicoOrigem: Tecnico;
  tecnicoDestino: Tecnico;
};

export type Manutencao = {
  //tecnico efetuou a manutenção
  descricao: string;
  orientacoes: string;
};

export type EtapaHistorico = {
  id: number;
  serviceId: number; //id do chamado
  dataCriado: Date;
  tecnico?: Tecnico;
  status: StatusConsertoEnum;
  redirecionamento?: Redirecionamento;
  manutencao?: Manutencao;
  orcamento?: number;
  motivoRejeicao?: string;
};
