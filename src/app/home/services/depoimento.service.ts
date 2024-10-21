import { HttpClient } from '@angular/common/http'; // Importa o HttpClient para fazer requisições HTTP
import { Injectable } from '@angular/core'; // Importa o decorador Injectable
import { Observable } from 'rxjs'; // Importa Observable do RxJS
import { Depoimento } from 'src/app/core/types/type'; // Importa o tipo Depoimento
import { environment } from 'src/environments/environment'; // Importa variáveis de ambiente

@Injectable({
  providedIn: 'root' // Torna o serviço disponível em toda a aplicação
})
export class DepoimentoService {

  private apiUrl: string = environment.apiUrl; // Define a URL da API a partir das variáveis de ambiente

  constructor(
    private http: HttpClient // Injeta o HttpClient
  ) {
  }

  // Método para listar depoimentos
  listar(): Observable<Depoimento[]> {
    // Faz uma requisição GET para a URL dos depoimentos e retorna um Observable com um array de Depoimento
    return this.http.get<Depoimento[]>(`${this.apiUrl}/depoimentos`);
  }
}
