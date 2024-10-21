import { HttpClient } from '@angular/common/http'; // Importa o HttpClient para fazer requisições HTTP
import { Injectable } from '@angular/core'; // Importa o decorador Injectable
import { Observable } from 'rxjs'; // Importa Observable do RxJS
import { Promocao } from 'src/app/core/types/type'; // Importa o tipo Promocao
import { environment } from 'src/environments/environment'; // Importa variáveis de ambiente

@Injectable({
  providedIn: 'root' // Torna o serviço disponível em toda a aplicação
})
export class PromocaoService {

  private apiUrl: string = environment.apiUrl; // Define a URL da API a partir das variáveis de ambiente

  constructor(
    private httpClient: HttpClient // Injeta o HttpClient
  ) { }

  // Método para listar promoções
  listar(): Observable<Promocao[]> {
    // Faz uma requisição GET para a URL das promoções e retorna um Observable com um array de Promocao
    return this.httpClient.get<Promocao[]>(`${this.apiUrl}/promocoes`);
  }
}
