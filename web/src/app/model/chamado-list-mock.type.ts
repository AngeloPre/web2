import { StatusConcertoEnum } from './enums/chamado-status.enum';

export type ChamadoItem = {
  userId: Number;
  serviceId: Number;
  status: StatusConcertoEnum;
  descricao: string;
  data: Date;
};
