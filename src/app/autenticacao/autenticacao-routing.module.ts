// Importações necessárias
import { RouterModule, Routes } from "@angular/router"; // Importa RouterModule e Routes do Angular Router
import { NgModule } from "@angular/core"; // Importa o decorador NgModule
import { authGuard } from "./auth.guard"; // Importa o guardião de autenticação
import { CadastroComponent } from "./cadastro/cadastro.component"; // Importa o componente de cadastro
import { LoginComponent } from "./login/login.component"; // Importa o componente de login
import { PerfilComponent } from "./perfil/perfil.component"; // Importa o componente de perfil

// Define as rotas para o módulo de autenticação
const routes: Routes = [
  {
    path: 'login', // Rota para o login
    component: LoginComponent // Componente a ser exibido
  },
  {
    path: 'cadastro', // Rota para o cadastro
    component: CadastroComponent // Componente a ser exibido
  },
  {
    path: 'perfil', // Rota para o perfil
    component: PerfilComponent, // Componente a ser exibido
    canActivate: [authGuard] // Guarda de ativação para verificar se o usuário está autenticado
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Registra as rotas definidas
  exports: [RouterModule] // Exporta o RouterModule para ser utilizado em outros módulos
})
export class AutenticacaoRoutingModule { }
