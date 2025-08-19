import { Routes } from '@angular/router';
import { MenuLateralComponent } from './layouts/menu-lateral/menu-lateral.component';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { PagInicialClienteComponent } from './pages/pag-inicial-cliente/pag-inicial-cliente.component';
import { WrapperLoginRegisterComponent } from './layouts/wrapper-login-register/wrapper-login-register.component';
import { RegisterComponent } from './pages/register/register.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  //enquanto ainda não temos landing page, encaminhamos do root pro login
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: WrapperLoginRegisterComponent,
    children: [{ path: '', component: LoginComponent }],
  },
  {
    path: 'register',
    component: WrapperLoginRegisterComponent,
    children: [{ path: '', component: RegisterComponent }],
  },
  {
    path: 'cliente',
    component: MenuLateralComponent,
    children: [
      { path: '', component: PagInicialClienteComponent, canActivate: [authGuard] },
      { path: 'solicitar-manutencao', component: PagInicialClienteComponent, canActivate: [authGuard] },
      { path: 'visualizar-manutencao', component: PagInicialClienteComponent, canActivate: [authGuard] },
    ],
  },
  {
    path: 'funcionario',
    component: MenuLateralComponent,
    children: [
      { path: '', component: HomeComponent, canActivate: [authGuard] },
      { path: 'solicitacoes', component: HomeComponent, canActivate: [authGuard] },
      { path: 'funcionarios', component: HomeComponent, canActivate: [authGuard] },
      { path: 'novo-funcionario', component: HomeComponent, canActivate: [authGuard] },
      { path: 'categorias-equipamento', component: HomeComponent, canActivate: [authGuard] },
    ],
  },

  {
    path: '404',
    component: NotFoundComponent,
    data: { title: 'Página não encontrada' },
  },
  { path: '**', redirectTo: '404' },
];
