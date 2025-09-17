import { StatusAtivoInativo } from '@/app/model/enums/status-ativo-inativo.enum';
import { Funcionario } from '@/app/model/funcionario';
import { UsuarioService } from '@/app/services/usuario.service';
import { FuncionarioFormComponent } from '@/app/shared/components/funcionario-form/funcionario-form.component';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pag-editar-funcionario',
  imports: [FuncionarioFormComponent],
  templateUrl: './pag-editar-funcionario.component.html',
  styles: ``
})
export class PagEditarFuncionarioComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  usuarioService = inject(UsuarioService);
  funcionarioId: any;


  funcionario: Funcionario = new Funcionario(0, "", "", "", "", new Date(), StatusAtivoInativo.ATIVO);

  ngOnInit(): void {
    this.funcionarioId = Number(this.route.snapshot.paramMap.get('id'));
    this.funcionario = this.usuarioService.buscarPorID(this.funcionarioId) as Funcionario;
    console.log(this.funcionario);
  }

}
