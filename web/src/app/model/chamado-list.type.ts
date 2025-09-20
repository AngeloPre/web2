import { CategoriaEquipamento } from './enums/categoria-equipamento';
import { StatusConcertoEnum } from './enums/chamado-status.enum';
import { EtapaHistorico } from './etapa-historico.type';

export type ChamadoItem = {
  userId: number;
  userName: string;
  serviceId: number;
  serviceCategory: CategoriaEquipamento;
  status: StatusConcertoEnum;
  descricaoEquipamento: string;
  descricaoFalha: string;
  slug: string;
  data: Date;
  etapas: EtapaHistorico[]
};
