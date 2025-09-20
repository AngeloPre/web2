import { Role } from "../core/store/user-role/user-role.store";
import { Endereco } from "./endereco";
import { StatusAtivoInativo } from "./enums/status-ativo-inativo.enum";

export abstract class Usuario {
  public id: number;
  public nome: string;
  public email: string;
  public senha: string;
  public status: StatusAtivoInativo;

  abstract readonly role: Role;

  constructor(id: number, nome: string, email: string, senha: string, status: StatusAtivoInativo) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.status = status;
  }
}
