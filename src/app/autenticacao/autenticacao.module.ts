// Importações necessárias
import { NgModule } from '@angular/core'; // Importa o decorador NgModule
import { CommonModule } from '@angular/common'; // Importa o módulo CommonModule
import { CadastroComponent } from './cadastro/cadastro.component'; // Importa o componente Cadastro
import { LoginComponent } from './login/login.component'; // Importa o componente Login
import { PerfilComponent } from './perfil/perfil.component'; // Importa o componente Perfil
import { SharedModule } from '../shared/shared.module'; // Importa o módulo SharedModule
import { MaterialModule } from '../core/material/material.module'; // Importa o módulo MaterialModule
import { ReactiveFormsModule } from '@angular/forms'; // Importa o módulo ReactiveFormsModule para formulários reativos
import { AutenticacaoRoutingModule } from './autenticacao-routing.module'; // Importa o módulo de roteamento de autenticação

@NgModule({
  declarations: [
    CadastroComponent, // Declara o componente Cadastro
    LoginComponent, // Declara o componente Login
    PerfilComponent // Declara o componente Perfil
  ],
  imports: [
    CommonModule, // Importa o CommonModule que fornece diretivas comuns
    SharedModule, // Importa o módulo compartilhado
    MaterialModule, // Importa o módulo do Angular Material
    ReactiveFormsModule, // Importa o módulo para formulários reativos
    AutenticacaoRoutingModule // Importa o módulo de roteamento de autenticação
  ],
  exports: [
    CadastroComponent, // Exporta o componente Cadastro para uso em outros módulos
    LoginComponent, // Exporta o componente Login para uso em outros módulos
    PerfilComponent // Exporta o componente Perfil para uso em outros módulos
  ]
})
export class AutenticacaoModule { } // Define e exporta o módulo de autenticação
