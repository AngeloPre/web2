import { StatusConsertoEnum } from "../model/enums/chamado-status.enum";
import { EtapaHistorico } from "../model/etapa-historico.type";
import { toApiStatus } from "./chamado.dto";


export type EtapaCreateApi = {
  status: StatusConsertoEnum | string;
  valorOrcamento?: number;
  motivoRejeicao?: string;
  funcionarioDestinoId?: number;
  descricaoManutencao?: string;
  orientacoesCliente?: string;
  comentario?: string;
};

export function etapaCreateDTO(etapa: EtapaHistorico): EtapaCreateApi {
  const dto: EtapaCreateApi = {
    status: etapa.status,
  };

  switch (etapa.status) {
    case StatusConsertoEnum.ORCADA: {
      dto.valorOrcamento = etapa.orcamento;
      break;
    }

    case StatusConsertoEnum.REJEITADA: {
      if (etapa.motivoRejeicao) {
        dto.motivoRejeicao = etapa.motivoRejeicao;
      }
      break;
    }

    case StatusConsertoEnum.REDIRECIONADA: {
      dto.funcionarioDestinoId = etapa.redirecionamento?.tecnicoDestino.id
      break;
    }

    case StatusConsertoEnum.ARRUMADA: {
      dto.descricaoManutencao = etapa.manutencao?.descricao
      dto.orientacoesCliente = etapa.manutencao?.orientacoes ?? undefined
      break;
    }

  }
  dto.status = toApiStatus(dto.status)
  return dto;
}
