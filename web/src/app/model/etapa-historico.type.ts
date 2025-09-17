import { CategoriaEquipamento } from './enums/categoria-equipamento';
import { StatusConcertoEnum } from './enums/chamado-status.enum';

export type Tecnico = {
  nome: string;
};

export type ChamadoInicial = {
  descricaoFalha: string;
  descricaoEquipamento: string;
  categoriaEquipamento: CategoriaEquipamento;
};

/* const ETAPA: Record<StatusSolicitacao, StatusSolicitacao[]> = {
  [StatusSolicitacao.ABERTA]:        [StatusSolicitacao.ORCADA],
  [StatusSolicitacao.ORCADA]:        [StatusSolicitacao.APROVADA, StatusSolicitacao.REJEITADA],
  [StatusSolicitacao.REJEITADA]:     [StatusSolicitacao.APROVADA], // resgatar
  [StatusSolicitacao.APROVADA]:      [StatusSolicitacao.ARRUMADA, StatusSolicitacao.REDIRECIONADA],
  [StatusSolicitacao.REDIRECIONADA]: [StatusSolicitacao.ARRUMADA, StatusSolicitacao.REDIRECIONADA],
  [StatusSolicitacao.ARRUMADA]:      [StatusSolicitacao.PAGA],
  [StatusSolicitacao.PAGA]:          [StatusSolicitacao.FINALIZADA],
  [StatusSolicitacao.FINALIZADA]:    [],
}; */

export type EtapaHistorico = {
  id: number;
  //chamadoInicial: ChamadoInicial,
  dataCriado: Date;
  tecnico: Tecnico;
  status: StatusConcertoEnum;
  orcamento?: number;
  motivoRejeicao?: string;
};
