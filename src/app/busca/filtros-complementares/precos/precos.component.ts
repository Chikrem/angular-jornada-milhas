// Importações necessárias
import { Component } from '@angular/core'; // Importa o decorador Component do Angular
import { FormControl } from '@angular/forms'; // Importa FormControl para gerenciar os controles de formulário
import { FormBuscaService } from 'src/app/shared/services/form-busca.service'; // Importa o serviço FormBuscaService
import { PassagensService } from 'src/app/busca/services/passagens.service'; // Importa o serviço PassagensService

@Component({
  selector: 'app-precos', // Seletor do componente
  templateUrl: './precos.component.html', // Caminho para o template HTML do componente
  styleUrls: ['./precos.component.scss'] // Caminho para os estilos CSS do componente
})
export class PrecosComponent {
  precoMin: FormControl<number>; // Controle de formulário para o preço mínimo
  precoMax: FormControl<number>; // Controle de formulário para o preço máximo

  constructor(
    public passagemService: PassagensService, // Injeção pública do serviço PassagensService
    private formBuscaService: FormBuscaService // Injeção privada do serviço FormBuscaService
  ) {
    // Obtém os controles de preço mínimo e máximo do serviço FormBuscaService
    this.precoMin = this.formBuscaService.obterControle<number>('precoMin');
    this.precoMax = this.formBuscaService.obterControle<number>('precoMax');
  }
}
