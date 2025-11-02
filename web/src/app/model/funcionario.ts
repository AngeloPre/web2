import { Usuario } from './usuario';
import type { Role } from '../core/store/user-role/user-role.store';
import { EMPLOYEE_ROLE } from './roles';
import { StatusAtivoInativo } from './enums/status-ativo-inativo.enum';

export class Funcionario extends Usuario {
  //public matricula: string;
  public dataNascimento: Date;

  override readonly role: Role = EMPLOYEE_ROLE;

  constructor(
    id: number,
    nome: string,
    email: string,
    senha: string,
    dataNascimento: Date,
    status: StatusAtivoInativo
  ) {
    super(id, nome, email, senha, status);
    //this.matricula = matricula;
    this.dataNascimento = dataNascimento;
  }
}
