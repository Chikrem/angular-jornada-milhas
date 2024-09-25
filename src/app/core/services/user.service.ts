import { Injectable } from '@angular/core';
import { PessoaUsuaria } from '../types/type';
import { TokenService } from './token.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject = new BehaviorSubject<PessoaUsuaria | null>(null);

  // O BehaviorSubject funciona tanto como um observable quanto como um observer.
  // Ou seja, ele pode tanto emitir notificações e informações quanto recebê-las.

  constructor(private tokenService: TokenService) {
    if(this.tokenService.possuiToken()) {
      this.decodificarJWT();
    }
  }

  private decodificarJWT() {
    const token = this.tokenService.retornarToken();
    const user = jwtDecode(token) as PessoaUsuaria;
    this.userSubject.next(user);
  }

  retornarUser() {
    return this.userSubject.asObservable();
  }

  salvarToken(token: string) {
    this.tokenService.salvarToken(token);
    this.decodificarJWT();
  }

  logout() {
    this.tokenService.excluirToken();
    this.userSubject.next(null);
  }

  estaLogado() {
    return this.tokenService.possuiToken();
  }
}

