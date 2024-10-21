// Importações necessárias
import { Injectable } from '@angular/core'; // Importa o decorador Injectable
import { FormGroup } from '@angular/forms'; // Importa FormGroup do Angular Forms

@Injectable({
  providedIn: 'root' // Torna o serviço disponível em toda a aplicação
})
export class FormularioService {

  // Propriedade que armazena um FormGroup, inicialmente null
  cadastroForm: FormGroup | null = null;

  // Método para obter o FormGroup de cadastro
  getCadastro(): FormGroup | null {
    return this.cadastroForm; // Retorna o FormGroup ou null
  }

  // Método para definir o FormGroup de cadastro
  setCadastro(form: FormGroup) {
    this.cadastroForm = form; // Armazena o FormGroup passado como argumento
  }

}
