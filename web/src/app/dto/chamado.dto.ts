import { ChamadoItem } from '../model/chamado.type';
import { StatusConsertoEnum } from '../model/enums/chamado-status.enum';

export type ChamadoCreateApi = {
  categoriaNome: string;
  descricaoEquipamento: string;
  descricaoFalha: string;
};

export type ChamadoResponseApi = {
  id: number;
  cliente: string;
  funcionario?: string;
  categoriaNome: string;
  descricaoEquipamento: string;
  descricaoFalha: string;
  precoBase: number;
  comentario?: string;
  status: string;
  dataCriacao: string;
  dataResposta?: string;
  orcamentoValor?: number;
};

export function chamadoToDTO(chamado: ChamadoItem): ChamadoCreateApi {
  return {
    categoriaNome: chamado.serviceCategory,
    descricaoEquipamento: chamado.descricaoEquipamento,
    descricaoFalha: chamado.descricaoFalha,
  } as ChamadoCreateApi;
}

export function dtoToChamado(dto: ChamadoResponseApi): ChamadoItem {
  return {
    id: dto.id,
    serviceId: dto.id,
    cliente: dto.cliente,
    serviceCategory: dto.categoriaNome,
    status: fromApiStatus(dto.status),
    descricaoEquipamento: dto.descricaoEquipamento,
    descricaoFalha: dto.descricaoFalha,
    dataCriacao: new Date(dto.dataCriacao),
    dataResposta: dto.dataResposta ? new Date(dto.dataResposta) : undefined,
    comentario: dto.comentario ?? undefined,
    precoBase: dto.precoBase,
    funcionario: dto.funcionario ?? undefined,
  } as ChamadoItem;
}

function fromApiStatus(s: string | null | undefined): StatusConsertoEnum {
  const key = (s ?? '').toUpperCase() as keyof typeof StatusConsertoEnum;
  return StatusConsertoEnum[key];
}
