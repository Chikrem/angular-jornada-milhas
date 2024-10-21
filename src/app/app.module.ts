// Importações necessárias para o funcionamento do Angular e bibliotecas externas
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'; // Módulo para fazer requisições HTTP e injeção de interceptores
import { ReactiveFormsModule } from '@angular/forms'; // Módulo para trabalhar com formulários reativos
import { NgModule } from '@angular/core'; // Decorador @NgModule e funcionalidades centrais do Angular
import { BrowserModule } from '@angular/platform-browser'; // Necessário para rodar a aplicação em um navegador
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Necessário para habilitar animações no Angular

// Importações de módulos específicos da aplicação
import { AppRoutingModule } from './app-routing.module'; // Módulo de rotas da aplicação
import { AppComponent } from './app.component'; // Componente raiz da aplicação
import { AutenticacaoInterceptor } from './autenticacao/autenticacao.interceptor'; // Interceptor de autenticação
import { SharedModule } from './shared/shared.module'; // Módulo compartilhado com componentes e serviços reutilizáveis
import { MaterialModule } from './core/material/material.module'; // Módulo com os componentes do Angular Material
import { HomeModule } from './home/home.module'; // Módulo que encapsula as funcionalidades da página inicial (home)
import { ErroModule } from './core/erro/erro.module'; // Módulo de tratamento de erros
import { ErrosInterceptor } from './core/erro/erros.interceptor'; // Interceptor para captura de erros nas requisições HTTP

// Decorador @NgModule define a configuração do módulo
@NgModule({
  declarations: [
    AppComponent // Declaração do componente raiz da aplicação
  ],
  imports: [
    BrowserModule, // Módulo que prepara a aplicação para ser executada em um navegador
    AppRoutingModule, // Configuração de rotas da aplicação
    HttpClientModule, // Módulo para realizar requisições HTTP
    ReactiveFormsModule, // Módulo para trabalhar com formulários reativos
    BrowserAnimationsModule, // Habilita animações no Angular
    SharedModule, // Módulo compartilhado da aplicação, onde ficam componentes e serviços reutilizáveis
    MaterialModule, // Módulo que contém os componentes do Angular Material
    HomeModule, // Módulo com funcionalidades e componentes da página home
    ErroModule // Módulo dedicado ao tratamento de erros
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, // Registro de interceptores HTTP
      useClass: AutenticacaoInterceptor, // Interceptor de autenticação
      multi: true // Permite múltiplos interceptores
    },
    {
      provide: HTTP_INTERCEPTORS, // Registro de interceptores HTTP
      useClass: ErrosInterceptor, // Interceptor para tratamento de erros
      multi: true // Permite múltiplos interceptores
    },
  ],
  bootstrap: [AppComponent] // Componente raiz que será inicializado ao carregar o aplicativo
})
export class AppModule { }
