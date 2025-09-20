import { StatusAtivoInativo } from '@/app/model/enums/status-ativo-inativo.enum';
import { Funcionario } from '@/app/model/funcionario';
import { FuncionarioFormComponent } from '@/app/shared/components/funcionario-form/funcionario-form.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-pag-cadastro-funcionario',
  imports: [FuncionarioFormComponent],
  templateUrl: './pag-cadastro-funcionario.component.html',
  styles: ``
})
export class PagCadastroFuncionarioComponent {

  funcionario: Funcionario = new Funcionario(0, "", "", "", "", new Date(), StatusAtivoInativo.ATIVO);

}
