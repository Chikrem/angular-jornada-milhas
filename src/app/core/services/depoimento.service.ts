import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Depoimento } from './../types/type';

@Injectable({
  providedIn: 'root'
})

export class DepoimentoService {

  private apiUrl: string = environment.apiUrl;

  constructor(
    private httpClient: HttpClient
  ) { }

  listar(): Observable<Depoimento[]>{
    return this.httpClient.get<Depoimento[]>(`${this.apiUrl}/depoimentos`)
  }

}


// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { Promocao } from '../types/type';
// import { environment } from 'src/environments/environment';

// @Injectable({
//   providedIn: 'root'
// })
// export class PromocaoService {

//   private apiUrl: string = environment.apiUrl;

//   constructor(
//     private httpClient: HttpClient
//   ) { }

//   listar () : Observable<Promocao[]> {
//     return this.httpClient.get<Promocao[]>(`${this.apiUrl}/promocoes`)
//   }
// }

