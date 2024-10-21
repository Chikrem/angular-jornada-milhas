// Importações necessárias
import { Component, Input } from '@angular/core'; // Importa o decorador Component e o decorador Input para definir propriedades de entrada
import { Passagem } from 'src/app/core/types/type'; // Importa o tipo Passagem

@Component({
  selector: 'app-passagem-destaque', // Seletor do componente
  templateUrl: './passagem-destaque.component.html', // Caminho para o template HTML do componente
  styleUrls: ['./passagem-destaque.component.scss'] // Caminho para os estilos CSS do componente
})
export class PassagemDestaqueComponent {
  @Input() destacadaPor = ''; // Propriedade de entrada para indicar o critério de destaque, inicializada como string vazia
  @Input() passagem?: Passagem; // Propriedade de entrada para receber um objeto do tipo Passagem, opcional
  @Input() variant: 'primary' | 'secondary' | 'default' = 'primary'; // Propriedade de entrada para definir a variante do componente, com valor padrão 'primary'
}
