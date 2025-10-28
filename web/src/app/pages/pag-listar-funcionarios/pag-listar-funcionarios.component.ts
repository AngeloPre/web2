import { Usuario } from '@model/usuario';
import { UsuarioService } from '@services/usuario.service';
import { FuncionariosTableComponent } from '@shared/components/funcionarios-table/funcionarios-table.component';
import { Component, inject, OnInit } from '@angular/core';
import { MatButton } from "@angular/material/button";
import { RouterLink } from '@angular/router';
import { RiveLoaderComponent } from '@shared/components/rive-loader/rive-loader.component';
import { FuncionarioService } from '@/app/services/funcionario.service';
import { Funcionario } from '@/app/model/funcionario';

@Component({
  selector: 'app-pag-listar-funcionarios',
  imports: [
    FuncionariosTableComponent,
    MatButton,
    RouterLink,
    RiveLoaderComponent,
  ],
  templateUrl: './pag-listar-funcionarios.component.html',
  styles: ``
})
export class PagListarFuncionariosComponent implements OnInit {
  funcionarioService = inject(FuncionarioService);

  funcionarios = this.funcionarioService.signalFuncionarios;
  loading = this.funcionarioService.loading;

  ngOnInit(): void {
    this.funcionarioService.refresh().subscribe();
  }

  recarregarTabela() { this.funcionarioService.refresh().subscribe(); }

  onDeleted() {
    this.recarregarTabela();
  }

}
