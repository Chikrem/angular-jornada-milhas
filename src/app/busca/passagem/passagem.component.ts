// Importações necessárias
import { Component, Input } from '@angular/core'; // Importa o decorador Component e a funcionalidade Input
import { Passagem } from 'src/app/core/types/type'; // Importa o tipo Passagem

@Component({
  selector: 'app-passagem', // Seletor do componente
  templateUrl: './passagem.component.html', // Caminho para o template HTML do componente
  styleUrls: ['./passagem.component.scss'] // Caminho para o estilo CSS do componente
})
export class PassagemComponent {
  @Input() passagem!: Passagem; // Propriedade de entrada que recebe um objeto do tipo Passagem

  // Getter que determina o texto a ser exibido com base na presença da data de volta
  get textoIdaVolta() {
    if (!this.passagem.dataVolta) { // Se não há data de volta
      return "Somente ida"; // Retorna texto indicando que é uma passagem somente de ida
    }
    return "Ida e volta"; // Retorna texto indicando que é uma passagem de ida e volta
  }
}
