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
    private categoriasService: CategoriaEquipamentoService
  ) {}

  get slug(): string { return this.slugFrom(this.categoria); }

  send() {
    const valorCentavos = Number(this.valor)*100;
    const novo: CategoriaEquipamento = {
      name: this.categoria.trim(),
      slug: this.slugFrom(this.categoria),
      baseValue: valorCentavos,
      isActive: StatusAtivoInativo.ATIVO,
      createdAt: new Date(),
    };
    this.categoriasService.inserir(novo);
    this.ref.close(novo);
  }

  private slugFrom(s: string): string {
    return (s || '').trim().toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').replace(/-+/g, '-');
  }
}
