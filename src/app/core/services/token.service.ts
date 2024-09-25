import { Injectable } from '@angular/core';

// Na Jornada Milhas, há a necessidade de implementar uma funcionalidade de autenticação utilizando tokens JWT.
// Precisamos criar um serviço chamado tokenService que será responsável por manipular o token, armazenando-o no
// localStorage.
// Além disso, precisamos criar o serviço UserService para lidar com o login do usuário através do token.

// https://jwt.io/introduction

const KEY: string = 'token'

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  salvarToken(token: string){
    return localStorage.setItem(KEY, token)
  }

  excluirToken(){
    return localStorage.removeItem(KEY)
  }

  retornarToken(){
    return localStorage.getItem(KEY) ?? ""
  }

  possuiToken(){
    return !!this.retornarToken()
  }

}

// Em aplicações web modernas, a segurança é uma preocupação fundamental.
// Tokens são elementos essenciais para garantir a autenticação e a autorização de usuários em sistemas.

// Um token é uma sequência de caracteres que representa a identidade e as permissões de um usuário autenticado
// em uma aplicação web.

// Após a autenticação bem-sucedida do usuário, um token é gerado e enviado de volta para o cliente.
// O cliente armazena esse token e o inclui em todas as requisições subsequentes.
// O servidor verifica o token para autorizar ou restringir o acesso do usuário a recursos e funcionalidades.

// Um dos tokens mais comumente utilizados no desenvolvimento de aplicações web é o JSON Web Token ou JWT.
