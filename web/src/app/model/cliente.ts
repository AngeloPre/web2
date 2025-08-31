import { Role } from "../core/store/user-role/user-role.store";
import { Endereco } from "./endereco";
import { CLIENT_ROLE } from "./roles";
import { Usuario } from "./usuario"

export class Cliente extends Usuario {

  override readonly role: Role = CLIENT_ROLE;

  constructor(id: string, cpf: string, nome: string, email: string, telefone: string, endereco: Endereco) {
    super(id, cpf, nome, email, telefone, endereco);
  }
}
