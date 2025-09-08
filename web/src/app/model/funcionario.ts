import { Usuario } from './usuario';
import type { Role } from '../core/store/user-role/user-role.store';
import { EMPLOYEE_ROLE } from './roles';
import { Endereco } from './endereco';

export class Funcionario extends Usuario {

  public matricula: string;

  override readonly role: Role = EMPLOYEE_ROLE;

  constructor(id: number, cpf: string, nome: string, email: string, senha: string, telefone: string, endereco: Endereco, matricula: string) {
    super(id, cpf, nome, email, senha, telefone, endereco);
    this.matricula = matricula;
  }
}
