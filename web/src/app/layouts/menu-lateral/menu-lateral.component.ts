import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from "@angular/router"
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { UserRole } from '@core/store/user-role/user-role.store';

@Component({
  selector: 'app-menu-lateral',
  standalone: true,
  imports: [MatSidenavModule, MatButtonModule, RouterOutlet, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './menu-lateral.component.html',
  styles: ``
})
export class MenuLateralComponent {
  readonly userRole = inject(UserRole);

  get roleLabel(): 'Funcionário' | 'Cliente' {
    return this.userRole.isEmployee() ? 'Funcionário' : 'Cliente';
  }

  get menuItems() {
    return this.userRole.isEmployee()
      ? [
          { id: 0, icon: 'assets/svg/pagina-inicial.svg', label: 'Página Inicial', path: '/funcionario' },
          { id: 1, icon: 'assets/svg/solicitacoes.svg', label: 'Solicitações', path: '/funcionario/solicitacoes' },
          { id: 2, icon: 'assets/svg/funcionarios.svg', label: 'Funcionários', path: '/funcionario/funcionarios' },
          { id: 3, icon: 'assets/svg/novo-funcionario.svg', label: 'Novo Funcionário', path: '/funcionario/novo-funcionario' },
          { id: 4, icon: 'assets/svg/categorias-equipamento.svg', label: 'Categorias de Equipamento', path: '/funcionario/categorias-equipamento' },
        ]
      : [
          { id: 0, icon: 'assets/svg/pagina-inicial.svg', label: 'Página Inicial', path: '/cliente' },
          { id: 1, icon: 'assets/svg/solicitacoes.svg', label: 'Solicitar Manutenção', path: '/cliente/solicitar-manutencao' },
        ];
  }

  trackById = (_: number, item: { id: number }) => item.id;
}
