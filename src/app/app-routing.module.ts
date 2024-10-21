// Importações necessárias para configurar rotas no Angular
import { NgModule } from '@angular/core'; // Decorador @NgModule para definir um módulo
import { RouterModule, Routes } from '@angular/router'; // Módulo para trabalhar com rotas no Angular
import { HomeModule } from './home/home.module'; // Importa o módulo da página Home

// Definição das rotas da aplicação
const routes: Routes = [
  {
    path: 'auth', // Rota para autenticação
    loadChildren: () => import('./autenticacao/autenticacao.module').then(m => m.AutenticacaoModule),
    // Carregamento lazy do módulo de autenticação. O módulo será carregado apenas quando o usuário acessar a rota 'auth'
  },
  {
    path: 'busca', // Rota para a página de busca
    loadChildren: () => import('./busca/busca.module').then(m => m.BuscaModule),
    // Carregamento lazy do módulo de busca
  },
  {
    path: '', // Rota raiz (URL base)
    redirectTo: '/home', // Redireciona para a rota 'home'
    pathMatch: 'full' // Garante que o redirecionamento ocorre apenas se o caminho for exatamente ''
  },
  {
    path: '**', // Rota coringa (para qualquer caminho não definido)
    redirectTo: '/pagina-nao-encontrada', // Redireciona para uma página de erro (página não encontrada)
    pathMatch: 'full' // Garante que a rota se aplica a URLs inteiras
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes), // Configura o roteamento com as rotas definidas
    HomeModule // Importa o módulo da página Home para que esteja acessível na aplicação
  ],
  exports: [RouterModule] // Exporta o RouterModule para que esteja disponível em outros módulos
})
export class AppRoutingModule { }
