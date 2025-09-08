import { inject, Injectable } from '@angular/core';
import { MockServices } from '../model/interfaces/mock-services';
import { Usuario } from '../model/usuario';
import { Funcionario } from '../model/funcionario';
import { Endereco } from '../model/endereco';
import { toUF } from '../model/enums/uf';
import { Cliente } from '../model/cliente';
import { GeradorsenhaService } from './geradorsenha.service';

export const LS_USUARIO = "Usuario";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService implements MockServices<Usuario> {
  private usuarioID = 0;
  private geradorSenhaService = inject(GeradorsenhaService);

  constructor() {
    if (this.listarTodos().length === 0) {

      let enderecoMaria: Endereco = {
        cep: "83511520",
        cidade: "Almirante Tamandaré",
        logradouro: "Rua das Laranjeiras",
        bairro: "Cachoeira",
        estado: "Paraná",
        numero: "120",
        uf: toUF("PR"),
        complemento: "Casa"
      };

      let maria: Usuario = new Funcionario(
        this.usuarioID++,
        "15080311002",
        "Maria",
        "maria@email.com",
        "1234",
        "41 996767676",
        enderecoMaria,
        "152" // matrícula
      );

      let enderecoMario: Endereco = {
        cep: "83510230",
        cidade: "Almirante Tamandaré",
        logradouro: "Avenida das Araucárias",
        bairro: "Centro",
        estado: "Paraná",
        numero: "45",
        uf: toUF("PR"),
        complemento: "Bloco B, sala 204"
      };

      let mario: Usuario = new Funcionario(
        this.usuarioID++,
        "31728945010",
        "Mário",
        "mario@email.com",
        "1234",
        "41 984545454",
        enderecoMario,
        "207" // matrícula
      );

      // --- Clientes ---
      let enderecoJoao: Endereco = {
        cep: "83510110",
        cidade: "Almirante Tamandaré",
        logradouro: "Rua Ipê Amarelo",
        bairro: "Jardim Roma",
        estado: "Paraná",
        numero: "300",
        uf: toUF("PR"),
        complemento: "Casa 03"
      };

      let joao: Usuario = new Cliente(
        this.usuarioID++,
        "11122233344",
        "João",
        "joao@email.com",
        "1234",
        "41 988887777",
        enderecoJoao
      );

      let enderecoJose: Endereco = {
        cep: "83512000",
        cidade: "Almirante Tamandaré",
        logradouro: "Rua das Palmeiras",
        bairro: "Santa Fé",
        estado: "Paraná",
        numero: "55",
        uf: toUF("PR"),
        complemento: "Fundos"
      };

      let jose: Usuario = new Cliente(
        this.usuarioID++,
        "22233344455",
        "José",
        "jose@email.com",
        "1234",
        "41 987006006",
        enderecoJose
      );

      let enderecoJoana: Endereco = {
        cep: "83511080",
        cidade: "Almirante Tamandaré",
        logradouro: "Travessa Pitangueiras",
        bairro: "Cachoeira",
        estado: "Paraná",
        numero: "18",
        uf: toUF("PR"),
        complemento: "Apto 201"
      };

      let joana: Usuario = new Cliente(
        this.usuarioID++,
        "33344455566",
        "Joana",
        "joana@email.com",
        "1234",
        "41 997778888",
        enderecoJoana
      );

      let enderecojoaquina: Endereco = {
        cep: "83513010",
        cidade: "Almirante Tamandaré",
        logradouro: "Rua Jacarandá",
        bairro: "Tanguá",
        estado: "Paraná",
        numero: "910",
        uf: toUF("PR"),
        complemento: "Casa"
      };

      let joaquina: Usuario = new Cliente(
        this.usuarioID++,
        "44455566677",
        "joaquina",
        "joaquina@email.com",
        "1234",
        "41 996660000",
        enderecojoaquina
      );

      this.inserir(maria);
      this.inserir(mario);

      this.inserir(joana);
      this.inserir(joao);
      this.inserir(joaquina);
      this.inserir(jose);
    }
  }
  listarTodos(): Usuario[] {
    const usuarios = localStorage[LS_USUARIO];
    return usuarios ? JSON.parse(usuarios) : [];
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
    return usuarios.find((usuario) => usuario.id === id);
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
    usuarios.filter((usuario) => usuario.id !== elemento.id);
    localStorage[LS_USUARIO] = JSON.stringify(usuarios);
  }
}
