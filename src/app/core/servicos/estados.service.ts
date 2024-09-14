import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Estado } from '../types/type';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {
  private apiUrl: string = environment.apiUrl
  private cache$?: Observable<Estado[]>;

  constructor(
    private http: HttpClient
  ) {
  }

  listar() : Observable<Estado[]> {
    if (!this.cache$) {
      this.cache$ = this.requestEstados().pipe(
        shareReplay(1)    // ShareReplay
      );
    }

    return this.cache$;
  }

// Dentro do nosso serviço, nós temos a variável apiUrl que guarda a URL base da API - sacada diretamente das variáveis de ambiente. Também temos a cache$,
// uma variável opcional que vai guardar um Observable de um array de UnidadeFederativa.

// A mágica começa no método listar(). Quando chamado, ele checa se já existe algo na nossa cache$. Se não tiver nada lá, ele chama o método requestEstados(),
// que faz uma requisição GET para a rota '/estados' da nossa API. A resposta dessa requisição é então armazenada na cache$ com o uso do operador shareReplay,
// que faz com que o valor buscado fique guardado para futuras subscrições.

// Agora, toda vez que chamarmos listar(), se já tivermos uma resposta armazenada na cache$, ela é retornada direto, evitando uma nova requisição HTTP.

  private requestEstados(): Observable<Estado[]> {
    return this.http.get<Estado[]>(`${this.apiUrl}/estados`);
  }
}

// O operador shareReplay é uma funcionalidade poderosa do RxJS que permite armazenar em cache o resultado de um Observable.
// Isso é especialmente útil quando lidamos com dados que não mudam com frequência, como a lista de unidades federativas do formulário de busca de passagens aéreas.

// Ao utilizar o shareReplay, podemos evitar chamadas desnecessárias à API. Uma vez que os dados já foram buscados, eles são armazenados em cache e podem ser
// reutilizados, proporcionando um melhor desempenho e otimização da aplicação.

// No contexto do serviço de Unidades Federativas, utilizamos o shareReplay para armazenar a resposta da requisição HTTP feita à rota '/estados'.
// Quando o método listar() é chamado, é verificado se já existe uma resposta armazenada em cache. Se sim, essa resposta é retornada diretamente, evitando uma nova chamada à API.
// Caso contrário, é feita a requisição e o resultado é armazenado em cache para futuras requisições.
