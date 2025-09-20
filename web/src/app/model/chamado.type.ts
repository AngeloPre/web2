import { StatusConcertoEnum } from './enums/chamado-status.enum';
import { EtapaHistorico } from './etapa-historico.type';

export type ChamadoItem = {
  userId: number;
  userName: string;
  serviceId: number;
  serviceCategory: string;
  status: StatusConcertoEnum;
  descricaoEquipamento: string;
  descricaoFalha: string;
  slug: string;
  etapas: EtapaHistorico[]
  dataCriacao: Date;
  dataResposta?: Date;
  comentario?: string;
  precoBase: number;
  precoAdicional?: number;
};
