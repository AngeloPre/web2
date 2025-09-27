import { Usuario } from '@model/usuario';
import { UsuarioService } from '@services/usuario.service';
import { FuncionariosTableComponent } from '@shared/components/funcionarios-table/funcionarios-table.component';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButton } from "@angular/material/button";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pag-listar-funcionarios',
  imports: [
    FuncionariosTableComponent,
    MatButton,
    RouterLink,
  ],
  templateUrl: './pag-listar-funcionarios.component.html',
  styles: ``
})
export class PagListarFuncionariosComponent implements OnInit {
  usuarioService = inject(UsuarioService);

  funcionarioMock = signal<Usuario[]>([]);

  ngOnInit(): void {
    this.recarregarTabela();
  }

  recarregarTabela() {
    this.funcionarioMock.set(this.usuarioService.listarTodosFuncionarios());
  }

  onDeleted() {
    this.recarregarTabela();
  }

}
