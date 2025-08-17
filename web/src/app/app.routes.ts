import { Routes } from '@angular/router';
import { MenuLateralComponent } from './layouts/menu-lateral/menu-lateral.component';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { PagInicialClienteComponent } from './pages/pag-inicial-cliente/pag-inicial-cliente.component';

export const routes: Routes = [
  {
    path: '',
    component: MenuLateralComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'home', component: PagInicialClienteComponent },
      {
        path: '404',
        component: NotFoundComponent,
        data: { title: 'Página não encontrada' },
      },
      { path: '**', redirectTo: '404' },
    ],
  },
];
