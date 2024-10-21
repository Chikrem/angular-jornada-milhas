// Importações necessárias
import { Injectable } from '@angular/core'; // Importa o decorador Injectable
import { MatSnackBar } from '@angular/material/snack-bar'; // Importa o serviço MatSnackBar do Angular Material

@Injectable({
  providedIn: 'root' // Torna o serviço disponível em toda a aplicação
})
export class MensagemService {

  constructor(private snackBar: MatSnackBar) { } // Injeta o MatSnackBar no construtor

  // Método para exibir uma mensagem de snack bar
  openMessage(message: string) {
    this.snackBar.open(message, undefined, {
      duration: 3000, // Duração da mensagem em milissegundos
      verticalPosition: 'top', // Posição vertical da mensagem
      horizontalPosition: 'right', // Posição horizontal da mensagem
    });
  }
}
