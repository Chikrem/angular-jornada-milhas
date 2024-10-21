// Importações necessárias
import { HttpClient } from "@angular/common/http"; // Importa HttpClient para realizar requisições HTTP
import { Injectable } from "@angular/core"; // Importa o decorador Injectable para permitir a injeção do serviço
import { Observable } from "rxjs"; // Importa Observable do RxJS para trabalhar com operações assíncronas
import { environment } from "src/environments/environment"; // Importa as variáveis de ambiente
import { Companhia } from "../../core/types/type"; // Importa o tipo Companhia

@Injectable({
  providedIn: 'root' // Permite que o serviço seja injetado em qualquer lugar da aplicação
})
export class CompanhiaService {

  private apiUrl: string = environment.apiUrl; // URL base da API, definida nas variáveis de ambiente

  constructor(
    private httpClient: HttpClient // Injeção do HttpClient
  ) { }

  // Método para listar companhias aéreas
  listar(): Observable<Companhia[]> {
    // Faz uma requisição GET à API e retorna um Observable do array de Companhia
    return this.httpClient.get<Companhia[]>(`${this.apiUrl}/companhias`);
  }
}
