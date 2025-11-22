import { Component, inject, signal } from '@angular/core';
import {
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
  Router,
} from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { UserRole } from '@core/store/user-role/user-role.store';
import { LoginService } from '@/app/services/login.service';
import { LimiteCaracteresPipe } from '@/app/shared/pipes/limite-caracteres.pipe';
import { MatDialog } from '@angular/material/dialog';
import { LogoutDialogComponent } from '@/app/shared/components/dialogs/logout-dialog/logout-dialog.component';
import { MatIcon } from '@angular/material/icon';
import { IniciaisPipe } from '@pipes/iniciais.pipe';

@Component({
  selector: 'app-menu-lateral',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatButtonModule,
    RouterOutlet,
    CommonModule,
    RouterLink,
    RouterLinkActive,
    LimiteCaracteresPipe,
    MatIcon,
    IniciaisPipe,
  ],
  templateUrl: './menu-lateral.component.html',
  styles: ``,
})
export class MenuLateralComponent {
  readonly userRole = inject(UserRole);
  //private usuarioService = inject(UsuarioService);
  private loginService = inject(LoginService);
  private dialog = inject(MatDialog);

  usuarioNome = signal<string>('');

  ngOnInit(): void {
    const stored = localStorage.getItem('UserName') || '';
    this.usuarioNome.set(stored);
  }

  //controla o estado do menu (open/closed)
  isOpen = true;
  toggleMenu(): void {
    this.isOpen = !this.isOpen;
  }

  abrirDialog(){
    const ref = this.dialog.open(LogoutDialogComponent, {
      width: '500px',
      maxWidth: 'none',
      panelClass: 'dialog-xxl'
    });
  }

  get roleLabel(): 'Funcionário' | 'Cliente' {
    return this.userRole.isEmployee() ? 'Funcionário' : 'Cliente';
  }

  get menuItems() {
    return this.userRole.isEmployee()
      ? [
          {
            id: 0,
            icon: 'assets/svg/pagina-inicial.svg',
            label: 'Página Inicial',
            path: '/funcionario',
          },
          {
            id: 1,
            icon: 'assets/svg/solicitacoes.svg',
            label: 'Solicitações',
            path: '/funcionario/solicitacoes',
          },
          {
            id: 2,
            icon: 'assets/svg/funcionarios.svg',
            label: 'Funcionários',
            path: '/funcionario/funcionarios',
          },
          {
            id: 3,
            icon: 'assets/svg/novo-funcionario.svg',
            label: 'Novo Funcionário',
            path: '/funcionario/novo-funcionario',
          },
          {
            id: 4,
            icon: 'assets/svg/categorias-equipamento.svg',
            label: 'Categorias de Equipamento',
            path: '/funcionario/categorias-equipamento',
          },
          {
            id: 5,
            icon: 'assets/svg/dolar.svg',
            label: 'Relatórios',
            path: '/funcionario/relatorios',
          },
        ]
      : [
          {
            id: 0,
            icon: 'assets/svg/pagina-inicial.svg',
            label: 'Página Inicial',
            path: '/cliente',
          },
          {
            id: 1,
            icon: 'assets/svg/solicitacoes.svg',
            label: 'Solicitar Manutenção',
            path: '/cliente/solicitar-manutencao',
          },
        ];
  }

  trackById = (_: number, item: { id: number }) => item.id;
}
