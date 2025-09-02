import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { MatButton } from "@angular/material/button";


@Component({
  selector: 'app-efetuar-orcamento',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButton],
  templateUrl: './efetuar-orcamento.component.html',
  styles: ``
})
export class EfetuarOrcamentoComponent {

}
