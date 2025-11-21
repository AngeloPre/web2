import { Cliente } from './cliente';
import { StatusConsertoEnum } from './enums/chamado-status.enum';
import { EtapaHistorico, Manutencao, Redirecionamento } from './etapa-historico.type';
import { Funcionario } from './funcionario';
import { Orcamento } from './orcamento';

export type ChamadoItem = {
  id: number;
  userId?: number;
  userName?: string;
  cliente: string;
  serviceCategory: string;
  status: StatusConsertoEnum;
  descricaoEquipamento: string;
  descricaoFalha: string;
  slug: string;
  dataCriacao: Date;
  dataResposta?: Date;
  comentario?: string;
  precoBase: number;
  funcionario?: string;
  manutencao?: Manutencao
};

export type ChamadoUpdateDTO = {
  categoriaNome: string;
  descricaoEquipamento: string;
  descricaoFalha: string;
  statusConcerto?: StatusConsertoEnum;
}
