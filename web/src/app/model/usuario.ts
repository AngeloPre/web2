import { Role } from "../core/store/user-role/user-role.store";
import { Endereco } from "./endereco";

export abstract class Usuario {
  public id: number;
  public cpf: string;
  public nome: string;
  public email: string;
  public senha: string;
  public telefone: string;
  public endereco: Endereco;

  abstract readonly role: Role;

  constructor(id: number, cpf: string, nome: string, email: string, senha: string, telefone: string, endereco: Endereco) {
    this.id = id;
    this.cpf = cpf;
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.telefone = telefone;
    this.endereco = endereco;
  }
}
