import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Promocao } from '../types/type';
import { environment } from 'src/environments/environment';


// O Singleton é um design pattern que visa garantir que apenas uma única instância de uma determinada classe exista em todo o sistema. Ele é útil quando é necessário controlar e restringir o número de instâncias de uma classe específica, garantindo que todos os componentes que dependem dela acessem a mesma instância compartilhada. E para configurar um serviço para ser um Singleton, pode fornecer no nível raiz da hierarquia de injeção de dependência ou usando o modificador providedIn: 'root'

@Injectable({
  providedIn: 'root'
})
export class PromocaoService {

  private apiUrl: string = environment.apiUrl;

  constructor(
          private httpClient: HttpClient
      ) { }

      listar() : Observable<Promocao[]>{
          return this.httpClient.get<Promocao[]>(`${this.apiUrl}/promocoes`)
      }
}
