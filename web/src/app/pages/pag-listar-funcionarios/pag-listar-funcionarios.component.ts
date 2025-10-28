import { Usuario } from '@model/usuario';
import { UsuarioService } from '@services/usuario.service';
import { FuncionariosTableComponent } from '@shared/components/funcionarios-table/funcionarios-table.component';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButton } from "@angular/material/button";
import { RouterLink } from '@angular/router';
import { FuncionarioService } from '@/app/services/funcionario-service';
import { Funcionario } from '@/app/model/funcionario';

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
  funcionarioService = inject(FuncionarioService);

  funcionarios = signal<Funcionario[]>([]);

  ngOnInit(): void {
    this.recarregarTabela();
  }

  recarregarTabela() {
    this.funcionarioService.listarTodos().subscribe(f => {
      this.funcionarios.set(f);
    });
  }

  onDeleted() {
    this.recarregarTabela();
  }

}
