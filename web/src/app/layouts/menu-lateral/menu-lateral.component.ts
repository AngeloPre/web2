import { Component } from '@angular/core';
import { RouterOutlet, Router } from "@angular/router"
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu-lateral',
  standalone: true,
  imports: [MatSidenavModule, MatButtonModule, RouterOutlet, CommonModule],
  templateUrl: './menu-lateral.component.html',
  styles: ``
})
export class MenuLateralComponent {
  showFiller = false;
  isEmployee = true;
  selectedItemId = 0;

  constructor(private router: Router) { }

  menuItems = this.isEmployee ? [
    { id: 0, label: 'Página Inicial', path: '/funcionario' },
    { id: 1, label: 'Solicitações', path: '/funcionario/solicitacoes' },
    { id: 2, label: 'Funcionários', path: '/funcionario/funcionarios' },
    { id: 3, label: 'Novo Funcionário', path: '/funcionario/novo-funcionario' },
    { id: 4, label: 'Categorias de Equipamento', path: '/funcionario/categorias-equipamento' }
  ] : [
    { id: 0, label: 'Página Inicial', path: '/cliente' },
    { id: 1, label: 'Solicitar Manutenção', path: '/cliente/solicitar-manutencao' }
  ];

  setActiveItem(itemId: number) {
    this.selectedItemId = itemId;
    const selectedItem = this.menuItems.find(item => item.id === itemId);
    if (selectedItem) {
      this.router.navigate([selectedItem.path]);
    }
  }
}
