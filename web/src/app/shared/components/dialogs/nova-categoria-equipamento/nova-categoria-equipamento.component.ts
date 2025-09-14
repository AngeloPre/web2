import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { NgxCurrencyDirective } from "ngx-currency";
import { CategoriaEquipamento } from '@/app/model/categoria-equipamento.type';
import { CategoriaEquipamentoService } from '@/app/services/categoria-equipamento.service';
import { StatusAtivoInativo } from '@/app/model/enums/status-ativo-inativo.enum';
import { SlugifyService } from '@/app/services/slugify.service';

@Component({
  selector: 'app-nova-categoria-equipamento',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule, NgxCurrencyDirective],
  templateUrl: './nova-categoria-equipamento.component.html',
  styles: ``
})
export class NovaCategoriaEquipamentoComponent {
  categoria = '';
  valor = '';
  constructor(
    private ref: MatDialogRef<NovaCategoriaEquipamentoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoriasService: CategoriaEquipamentoService,
    private slug: SlugifyService,
  ) {}

  get slugValue(): string { return this.slug.make(this.categoria); }

  send() {
    const valorCentavos = Math.round(Number(this.valor) * 100);
    const novo: CategoriaEquipamento = {
      id: this.categoriasService.peekNextId(),
      name: this.categoria.trim(),
      slug: this.slug.make(this.categoria),
      baseValue: valorCentavos,
      isActive: StatusAtivoInativo.ATIVO,
      createdAt: new Date(),
    };
    this.categoriasService.inserir(novo);
    this.ref.close(novo);
  }
}
