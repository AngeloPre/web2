import { StatusAtivoInativo } from '@model/enums/status-ativo-inativo.enum';
import { Funcionario } from '@model/funcionario';
import { UsuarioService } from '@services/usuario.service';
import { FuncionarioFormComponent } from '@shared/components/funcionario-form/funcionario-form.component';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FuncionarioService } from '@/app/services/funcionario.service';

@Component({
  selector: 'app-pag-editar-funcionario',
  imports: [FuncionarioFormComponent],
  templateUrl: './pag-editar-funcionario.component.html',
  styles: ``,
})
export class PagEditarFuncionarioComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  funcionarioService = inject(FuncionarioService);
  //usuarioService = inject(UsuarioService);
  funcionarioId: any;

  funcionario: Funcionario = new Funcionario(
    0,
    '',
    '',
    '',
    new Date(),
    StatusAtivoInativo.ATIVO
  );

  ngOnInit(): void {
    this.funcionarioId = Number(this.route.snapshot.paramMap.get('id'));
    this.funcionarioService
      .buscarPorId(this.funcionarioId)
      .subscribe((funcionario) => {
        this.funcionario = funcionario;
      });
    console.log(this.funcionario);
  }
}
