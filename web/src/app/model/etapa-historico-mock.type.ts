import { CategoriaEquipamento } from "./enums/categoria-equipamento"
import { StatusConcertoEnum } from "./enums/chamado-status.enum"

export type Tecnico = {
    nome: string
}

export type ChamadoInicial = {
    descricaoFalha: string,
    descricaoEquipamento: string,
    categoriaEquipamento: CategoriaEquipamento
}

export type EtapaHistorico = {
    id: number,
    chamadoInicial: ChamadoInicial,
    dataCriado: Date,
    tecnico: Tecnico,
    status: StatusConcertoEnum
    orcamento?: number,
    motivoRejeicao?: string
}