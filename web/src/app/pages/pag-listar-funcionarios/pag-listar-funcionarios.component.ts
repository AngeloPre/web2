import { Funcionario } from '@/app/model/funcionario';
import { Usuario } from '@/app/model/usuario';
import { UsuarioService } from '@/app/services/usuario.service';
import { FuncionariosTableComponent } from '@/app/shared/components/funcionarios-table/funcionarios-table.component';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButton } from "@angular/material/button";
import { RouterLink, RouterOutlet } from '@angular/router';

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
    this.funcionarioMock.set(this.usuarioService.listarTodosFuncionarios())
  }

}
