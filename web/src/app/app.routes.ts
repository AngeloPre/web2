import { Routes } from '@angular/router';
import { MenuLateralComponent } from './layouts/menu-lateral/menu-lateral.component';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { WrapperLoginRegisterComponent } from './layouts/wrapper-login-register/wrapper-login-register.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
  {
    path: 'login',
    component: WrapperLoginRegisterComponent,
    children: [
      { path: '', component: LoginComponent },
    ],
  },
  {
    path: 'register',
    component: WrapperLoginRegisterComponent,
    children: [
      { path: '', component: RegisterComponent },
    ],
  },

  {
    path: '',
    component: MenuLateralComponent,
    children: [
      { path: '', component: HomeComponent },
    ],
  },

  { path: '404', component: NotFoundComponent, data: { title: 'Página não encontrada' } },
  { path: '**', redirectTo: '404' },
];
