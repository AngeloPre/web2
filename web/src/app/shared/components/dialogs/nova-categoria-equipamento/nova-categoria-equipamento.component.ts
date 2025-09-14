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
  isEdit = false;
  editingId?: number;
  constructor(
    private ref: MatDialogRef<NovaCategoriaEquipamentoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { categoria?: CategoriaEquipamento } | null,
    private categoriasService: CategoriaEquipamentoService,
    private slug: SlugifyService,
  ) {
    const categoria = data?.categoria;
    if (categoria) {
      this.isEdit = true;
      this.editingId = categoria.id;
      this.categoria = categoria.name;
      this.valor = (categoria.baseValue / 100).toString();
    }
  }

  get slugValue(): string { return this.slug.make(this.categoria); }

  send() {
    const valorCentavos = Math.round(Number(this.valor) * 100);
    const base: CategoriaEquipamento = {
      id: this.isEdit ? (this.editingId as number) : this.categoriasService.peekNextId(),
      name: this.categoria.trim(),
      slug: this.slug.make(this.categoria),
      baseValue: valorCentavos,
      isActive: this.isEdit ? (this.data!.categoria!.isActive) : StatusAtivoInativo.ATIVO,
      createdAt: this.isEdit ? (this.data!.categoria!.createdAt) : new Date(),
      description: this.data?.categoria?.description
    };

    if (this.isEdit) {
      this.categoriasService.atualizar(base);
    } else {
      this.categoriasService.inserir(base);
    }
    this.ref.close(true);
  }
}
