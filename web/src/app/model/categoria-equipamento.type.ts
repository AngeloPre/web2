import { StatusAtivoInativo } from "./enums/status-ativo-inativo.enum";

export type CategoriaEquipamento = {
  id: number;
  name: string;
  slug: string;
  baseValue: number;
  isActive: StatusAtivoInativo;
  createdAt: Date;
  description?: string;
}