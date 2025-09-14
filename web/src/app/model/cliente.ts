import { Role } from "../core/store/user-role/user-role.store";
import { Endereco } from "./endereco";
import { StatusAtivoInativo } from "./enums/status-ativo-inativo.enum";
import { CLIENT_ROLE } from "./roles";
import { Usuario } from "./usuario"

export class Cliente extends Usuario {

  override readonly role: Role = CLIENT_ROLE;
  public cpf: string;
  public telefone: string;
  public endereco: Endereco;

  constructor(id: number, cpf: string, nome: string, email: string, senha: string, telefone: string, endereco: Endereco, status: StatusAtivoInativo) {
    super(id, nome, email, senha, status);
    this.cpf = cpf;
    this.telefone = telefone;
    this.endereco = endereco;
  }
}
