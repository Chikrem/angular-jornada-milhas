// Importações necessárias
import { Injectable } from '@angular/core'; // Importa o decorador Injectable
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor // Importa as interfaces necessárias para criar um interceptor HTTP
} from '@angular/common/http';
import { Observable } from 'rxjs'; // Importa Observable do RxJS
import { TokenService } from './services/token.service'; // Importa o serviço TokenService

@Injectable() // Decorador que torna o interceptor injetável
export class AutenticacaoInterceptor implements HttpInterceptor {
  // Construtor que injeta o serviço TokenService
  constructor(private tokenService: TokenService) {}

  // Método intercept que manipula as requisições HTTP
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Verifica se o serviço possui um token válido
    if (this.tokenService.possuiToken()) {
      const token = this.tokenService.retornarToken(); // Obtém o token
      // Clona a requisição e adiciona o cabeçalho de autorização com o token
      request = request.clone({
        setHeaders: {
          'Authorization': `Bearer ${token}` // Adiciona o cabeçalho Authorization
        }
      });
    }
    // Continua o processamento da requisição, passando-a para o próximo manipulador
    return next.handle(request);
  }
}
