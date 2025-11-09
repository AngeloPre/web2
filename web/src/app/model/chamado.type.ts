import { Cliente } from './cliente';
import { StatusConsertoEnum } from './enums/chamado-status.enum';
import { EtapaHistorico } from './etapa-historico.type';
import { Funcionario } from './funcionario';
import { Orcamento } from './orcamento';

export type ChamadoItem = {
  id: number;
  userId?: number;
  userName?: string;
  serviceId: number;
  cliente: string;
  serviceCategory: string;
  status: StatusConsertoEnum;
  descricaoEquipamento: string;
  descricaoFalha: string;
  slug?: string;
  //etapas: EtapaHistorico[]
  dataCriacao: Date;
  dataResposta?: Date;
  comentario?: string;
  precoBase: number;
  funcionario?: string;
  //orcamento?: Orcamento;
};
