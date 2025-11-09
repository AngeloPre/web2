import { Orcamento } from '../model/orcamento';

export type OrcamentoDTO = {
  valor: number;
  comentario?: string;
};

export function orcamentoToDTO(orcamento: Orcamento) {
  return {
    valor: orcamento.valor,
    comentario: orcamento.comentario ?? undefined,
  } as OrcamentoDTO;
}
