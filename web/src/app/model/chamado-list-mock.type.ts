import { CategoriaEquipamento } from './enums/categoria-equipamento';
import { StatusConcertoEnum } from './enums/chamado-status.enum';

export type ChamadoItem = {
  userId: number;
  userName: string;
  serviceId: number;
  serviceCategory: CategoriaEquipamento;
  status: StatusConcertoEnum;
  descricao: string;
  slug: string;
  data: Date;
};
