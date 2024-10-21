// Importações necessárias
import { inject } from "@angular/core"; // Importa a função inject do Angular
import { UserService } from "./services/user.service"; // Importa o serviço UserService
import { Router } from "@angular/router"; // Importa o Router do Angular Router

// Função guardião de autenticação
export const authGuard = () => {
  // Injeta o UserService e o Router
  const userService = inject(UserService);
  const router = inject(Router);

  // Verifica se o usuário está logado
  if (userService.estaLogado()) {
    return true; // Permite o acesso se o usuário estiver logado
  } else {
    // Redireciona para a página de login se o usuário não estiver logado
    router.navigate(['auth/login']);
    return false; // Bloqueia o acesso
  }
};
