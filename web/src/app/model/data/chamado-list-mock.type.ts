import { StatusConcertoEnum } from "../enums/chamado-status.enum";

export type ChamadoItem = {
  userId: number;
  serviceId: number;
  status: StatusConcertoEnum;
  descricao: string;
  data: Date;
};
