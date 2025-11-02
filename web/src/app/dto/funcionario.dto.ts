import { StatusAtivoInativo } from '../model/enums/status-ativo-inativo.enum';
import { Funcionario } from '../model/funcionario';

export type FuncionarioResponse = {
  id: number;
  nome: string;
  email: string;
  dataNascimento: string;
};

export type FuncionarioCreateUpdate = {
  nome: string;
  senha: string;
  email: string;
  dataNascimento: Date;
};

export function dtoToFuncionario(dto: FuncionarioResponse): Funcionario {
  return new Funcionario(
    dto.id,
    dto.nome,
    dto.email,
    '',
    new Date(dto.dataNascimento),
    StatusAtivoInativo.ATIVO
  );
}

export function funcionarioToDTO(
  funcionario: Funcionario
): FuncionarioCreateUpdate {
  return {
    nome: funcionario.nome,
    senha: funcionario.senha,
    email: funcionario.email,
    dataNascimento: funcionario.dataNascimento,
  };
}
