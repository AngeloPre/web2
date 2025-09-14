import { Routes } from '@angular/router';
import { MenuLateralComponent } from './layouts/menu-lateral/menu-lateral.component';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { PagInicialClienteComponent } from './pages/pag-inicial-cliente/pag-inicial-cliente.component';
import { SolicitacaoClienteComponent } from './pages/solicitacao-cliente/solicitacao-cliente.component';
import { WrapperLoginRegisterComponent } from './layouts/wrapper-login-register/wrapper-login-register.component';
import { RegisterComponent } from './pages/register/register.component';
import { authGuard } from './core/guards/auth/auth.guard';
import { PagInicialFuncionarioComponent } from './pages/pag-inicial-funcionario/pag-inicial-funcionario.component';
import { PagAprovarRejeitarOrcamentoComponent } from './pages/pag-aprovar-rejeitar-orcamento/pag-aprovar-rejeitar-orcamento.component';
import { UserRole } from './core/store/user-role/user-role.store';
import { HistoricoClienteComponent } from './pages/historico-cliente/historico-cliente.component';
import { PagInserirOrcamentoComponent } from './pages/pag-inserir-orcamento/pag-inserir-orcamento.component';
import { PagCategoriaEquipamentoComponent } from './pages/pag-categoria-equipamento/pag-categoria-equipamento.component';
import { PagSolicitacoesComponent } from './pages/pag-solicitacoes/pag-solicitacoes.component';
import { PagarClienteComponent } from './pages/pagar-cliente/pagar-cliente.component';

export const routes: Routes = [
  //enquanto ainda não temos landing page, encaminhamos do root pro login
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: WrapperLoginRegisterComponent,
    title: 'Sign In',
    children: [{ path: '', component: LoginComponent }],
  },
  {
    path: 'register',
    component: WrapperLoginRegisterComponent,
    title: 'Sign Up',
    children: [{ path: '', component: RegisterComponent }],
  },
  {
    path: 'cliente',
    component: MenuLateralComponent,
    canActivate: [authGuard],
    providers: [{ provide: UserRole, useValue: { isEmployee: () => false } }],
    children: [
      {
        path: '',
        component: PagInicialClienteComponent,
        title: 'Meus chamados',
      },
      {
        path: 'solicitar-manutencao',
        component: SolicitacaoClienteComponent,
        title: 'Solicitar Manutenção',
      },
      {
        path: 'visualizar-manutencao',
        component: PagInicialClienteComponent,
        title: 'Visualizar Manutenção',
      },
      {
        path: 'historico/:id/:slug',
        component: HistoricoClienteComponent,
        title: 'Detalhe do Orçamento',
      },
      {
        path: 'orcamentos/:id/:slug',
        component: PagAprovarRejeitarOrcamentoComponent,
        title: 'Detalhe do Orçamento',
      },
      {
        path: 'pagar/:id/:slug',
        component: PagarClienteComponent,
        title: 'Pagamento do Serviço',
      },
    ],
  },
  {
    path: 'funcionario',
    component: MenuLateralComponent,
    providers: [{ provide: UserRole, useValue: { isEmployee: () => true } }],
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: PagInicialFuncionarioComponent,
        title: 'Solicitações em Aberto',
      },
      {
        path: 'orcamentos/:id/:slug',
        component: PagInserirOrcamentoComponent,
        title: 'Efetuar Orçamento',
      },
      {
        path: 'solicitacoes',
        component: PagSolicitacoesComponent,
        title: 'Todas as Solicitações',
      },
      {
        path: 'funcionarios',
        component: HomeComponent,
        title: 'Funcionários',
      },
      {
        path: 'novo-funcionario',
        component: HomeComponent,
        title: 'Novo Funcionário',
      },
      {
        path: 'categorias-equipamento',
        component: PagCategoriaEquipamentoComponent,
        title: 'Categorias de Equipamento',
      },
    ],
  },

  {
    path: '404',
    component: NotFoundComponent,
    data: { title: 'Página não encontrada' },
  },
  { path: '**', redirectTo: '404' },
];
