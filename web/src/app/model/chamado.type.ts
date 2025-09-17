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
  data: Date;
  preco?: number;
  comentario?: string;
};
