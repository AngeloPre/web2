import { inject, Injectable } from '@angular/core';
import { MockServices } from '@model/interfaces/mock-services';
import { Usuario } from '@model/usuario';
import { Funcionario } from '@model/funcionario';
import { Endereco } from '@model/endereco';
import { toUF } from '@model/enums/uf';
import { Cliente } from '@model/cliente';
import { GeradorsenhaService } from './geradorsenha.service';
import { StatusAtivoInativo } from '@model/enums/status-ativo-inativo.enum';

export const LS_USUARIO = 'Usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService implements MockServices<Usuario> {
  private usuarioID = 0;
  private geradorSenhaService = inject(GeradorsenhaService);

  constructor() {
    if (this.nenhumUsuario()) {
      console.log('esta criando ususarios');
      let maria: Usuario = new Funcionario(
        this.usuarioID++,
        'Maria',
        'maria@email.com',
        '1234',
        new Date(1990, 9, 26, 10, 0, 0),
        StatusAtivoInativo.ATIVO
      );

      let mario: Usuario = new Funcionario(
        this.usuarioID++,
        'Mário',
        'mario@email.com',
        '1234',
        new Date(1990, 9, 26, 10, 0, 0),
        StatusAtivoInativo.ATIVO
      );

      // --- Clientes ---
      let enderecoJoao: Endereco = {
        cep: '83510110',
        cidade: 'Almirante Tamandaré',
        logradouro: 'Rua Ipê Amarelo',
        bairro: 'Jardim Roma',
        numero: '300',
        uf: toUF('PR'),
        complemento: 'Casa 03',
      };

      let joao: Usuario = new Cliente(
        this.usuarioID++,
        '11122233344',
        'João',
        'joao@email.com',
        '1234',
        '41 988887777',
        enderecoJoao,
        StatusAtivoInativo.ATIVO
      );

      let enderecoJose: Endereco = {
        cep: '83512000',
        cidade: 'Almirante Tamandaré',
        logradouro: 'Rua das Palmeiras',
        bairro: 'Santa Fé',
        numero: '55',
        uf: toUF('PR'),
        complemento: 'Fundos',
      };

      let jose: Usuario = new Cliente(
        this.usuarioID++,
        '22233344455',
        'José',
        'jose@email.com',
        '1234',
        '41 987006006',
        enderecoJose,
        StatusAtivoInativo.ATIVO
      );

      let enderecoJoana: Endereco = {
        cep: '83511080',
        cidade: 'Almirante Tamandaré',
        logradouro: 'Travessa Pitangueiras',
        bairro: 'Cachoeira',
        numero: '18',
        uf: toUF('PR'),
        complemento: 'Apto 201',
      };

      let joana: Usuario = new Cliente(
        this.usuarioID++,
        '33344455566',
        'Joana',
        'joana@email.com',
        '1234',
        '41 997778888',
        enderecoJoana,
        StatusAtivoInativo.ATIVO
      );

      let enderecojoaquina: Endereco = {
        cep: '83513010',
        cidade: 'Almirante Tamandaré',
        logradouro: 'Rua Jacarandá',
        bairro: 'Tanguá',
        numero: '910',
        uf: toUF('PR'),
        complemento: 'Casa',
      };

      let joaquina: Usuario = new Cliente(
        this.usuarioID++,
        '44455566677',
        'joaquina',
        'joaquina@email.com',
        '1234',
        '41 996660000',
        enderecojoaquina,
        StatusAtivoInativo.ATIVO
      );

      this.inserir(maria);
      this.inserir(mario);

      this.inserir(joana);
      this.inserir(joao);
      this.inserir(joaquina);
      this.inserir(jose);
    }
  }

  nenhumUsuario(): boolean {
    return this.listarTodos().length === 0;
  }

  listarTodos(): Usuario[] {
    const usuarios = localStorage[LS_USUARIO];
    return usuarios ? JSON.parse(usuarios) : [];
  }
  listarTodosFuncionarios(): Funcionario[] {
    const funcionarios = this.listarTodos().filter((funcionario) => {
      return funcionario.role.name === 'employee';
    });
    return funcionarios as Funcionario[];
  }
  inserir(elemento: Usuario): void {
    const usuarios = this.listarTodos();
    elemento.id = this.usuarioID++;
    elemento.senha = this.geradorSenhaService.gerarSenha();
    usuarios.push(elemento);
    localStorage[LS_USUARIO] = JSON.stringify(usuarios);
  }

  buscarPorID(id: number): Usuario | undefined {
    const usuarios = this.listarTodos();
    return this.nenhumUsuario()
      ? undefined
      : usuarios.find((usuario) => usuario.id === id);
  }

  buscarPorEmail(email: string): Usuario | undefined {
    const alvo = (email || '').trim().toLowerCase();
    const usuarios = this.listarTodos();
    if (this.nenhumUsuario()) return undefined;
    return usuarios.find((u) => (u.email || '').trim().toLowerCase() === alvo);
  }

  atualizar(elemento: Usuario): void {
    let usuarios = this.listarTodos();
    usuarios = usuarios.map((usuario) =>
      usuario.id === elemento.id ? elemento : usuario
    );
    localStorage[LS_USUARIO] = JSON.stringify(usuarios);
  }
  remover(elemento: Usuario): void {
    let usuarios = this.listarTodos();
    usuarios = usuarios.filter((usuario) => usuario.id !== elemento.id);
    console.log(usuarios);
    localStorage[LS_USUARIO] = JSON.stringify(usuarios);
    this.listarTodos();
  }
}
