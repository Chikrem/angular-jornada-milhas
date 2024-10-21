// Importações necessárias
import { HttpClient } from '@angular/common/http'; // Importa HttpClient para realizar requisições HTTP
import { Injectable } from '@angular/core'; // Importa o decorador Injectable
import { Observable, shareReplay } from 'rxjs'; // Importa Observable e shareReplay do RxJS
import { environment } from 'src/environments/environment'; // Importa as variáveis de ambiente
import { UnidadeFederativa } from '../types/type'; // Importa o tipo UnidadeFederativa

@Injectable({
  providedIn: 'root' // Torna o serviço disponível em toda a aplicação
})
export class UnidadeFederativaService {
  private apiUrl: string = environment.apiUrl; // URL base da API
  private cache$?: Observable<UnidadeFederativa[]>; // Cache opcional para armazenar a resposta da API

  constructor(
    private http: HttpClient // Injeta o HttpClient
  ) {}

  // Método para listar as unidades federativas
  listar(): Observable<UnidadeFederativa[]> {
    // Verifica se o cache já foi criado
    if (!this.cache$) {
      // Se não, cria uma nova requisição e armazena a resposta em cache
      this.cache$ = this.requestEstados().pipe(
        shareReplay(1) // Compartilha a resposta e a reemite para futuros subscritores
      );
    }

    // Retorna o cache ou a requisição já existente
    return this.cache$;
  }

  // Método privado para solicitar os estados da API
  private requestEstados(): Observable<UnidadeFederativa[]> {
    // Realiza a requisição GET para obter a lista de estados
    return this.http.get<UnidadeFederativa[]>(`${this.apiUrl}/estados`);
  }
}
