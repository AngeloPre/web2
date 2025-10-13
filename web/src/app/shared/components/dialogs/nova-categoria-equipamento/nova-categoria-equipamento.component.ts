import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { NgxCurrencyDirective } from "ngx-currency";
import { CategoriaEquipamento } from '@model/categoria-equipamento.type';
import { CategoriaEquipamentoService } from '@services/categoria-equipamento.service';
import { SlugifyService } from '@services/slugify.service';

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
  isEdit = false;
  constructor(
    private ref: MatDialogRef<NovaCategoriaEquipamentoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { categoria?: CategoriaEquipamento } | null,
    private categoriasService: CategoriaEquipamentoService,
    private slug: SlugifyService,
  ) {
    const categoria = data?.categoria;
    if (categoria) {
      this.isEdit = true;
      this.categoria = categoria.name;
      this.valor = (categoria.baseValue / 100).toString();
    }
  }

  get slugValue(): string { return this.slug.make(this.categoria); }

  send() {
    const valorCentavos = Math.round(Number(this.valor) * 100);
    if (this.isEdit && this.data?.categoria) {
      const payload: CategoriaEquipamento = {
        ...this.data.categoria,
        name: this.categoria.trim(),
        slug: this.slug.make(this.categoria),
        baseValue: valorCentavos,
      };
      this.categoriasService.atualizar(payload).subscribe(() => this.ref.close(true));
    } else {
      const payload: CategoriaEquipamento = {
        name: this.categoria.trim(),
        slug: this.slug.make(this.categoria),
        baseValue: valorCentavos,
        status: true,
      };
      this.categoriasService.inserir(payload).subscribe(() => this.ref.close(true));
    }
  }
}
