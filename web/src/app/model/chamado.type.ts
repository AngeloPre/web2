import { StatusConcertoEnum } from './enums/chamado-status.enum';

export type ChamadoItem = {
  userId: number;
  userName: string;
  serviceId: number;
  serviceCategory: string;
  status: StatusConcertoEnum;
  descricaoEquipamento: string;
  descricaoFalha: string;
  slug: string;
  dataCriacao: Date;
  dataResposta?: Date;
  comentario?: string;
  precoBase: number;
  precoAdicional?: number;
};
