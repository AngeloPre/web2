import { CategoriaEquipamento } from '../model/categoria-equipamento.type';

export type EquipamentoCreateUpdateApi = {
  name: string;
  baseValue: number;
  status: boolean;
};

export type EquipamentoResponseApi = {
  categoryId: number;
  name: string;
  slug: string;
  baseValue: number;
  status: boolean;
  createdAt: string;
};

export function EquipamentoToDTO(
  cat: CategoriaEquipamento
): EquipamentoCreateUpdateApi {
  return {
    name: cat.name,
    baseValue: cat.baseValue,
    status: cat.status,
  } as EquipamentoCreateUpdateApi;
}

export function DtoToEquipamento(
  dto: EquipamentoResponseApi
): CategoriaEquipamento {
  return {
    categoryId: dto.categoryId,
    name: dto.name,
    slug: dto.slug,
    baseValue: dto.baseValue,
    status: dto.status,
    createdAt: dto.createdAt,
  } as CategoriaEquipamento;
}
