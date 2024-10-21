// Importações necessárias
import { Component, EventEmitter, Output } from '@angular/core'; // Importa Component, EventEmitter, e Output do Angular
import { FormBuscaService } from 'src/app/shared/services/form-busca.service'; // Importa o serviço FormBuscaService
import { PassagensService } from 'src/app/busca/services/passagens.service'; // Importa o serviço PassagensService

@Component({
  selector: 'app-filtros-complementares', // Seletor do componente
  templateUrl: './filtros-complementares.component.html', // Caminho para o template HTML
  styleUrls: ['./filtros-complementares.component.scss'] // Caminho para o estilo CSS
})
export class FiltrosComplementaresComponent {
  @Output() realizarBusca = new EventEmitter(); // Cria um evento de saída para emitir os dados de busca para o componente pai

  constructor(
    public formBuscaService: FormBuscaService, // Injeção pública do serviço FormBuscaService
    private passagemService: PassagensService // Injeção privada do serviço PassagensService
  ) {}

  // Método para realizar a busca
  busca() {
    // Verifica se o formulário de busca é válido
    if (!this.formBuscaService.formEstaValido) {
      this.formBuscaService.formBusca.markAllAsTouched(); // Marca todos os campos do formulário como "tocados" para exibir as validações
      window.scroll({
        top: 0, // Rola a página para o topo
        left: 0,
        behavior: 'smooth' // Animação suave na rolagem
      });
      return; // Sai da função se o formulário for inválido
    }
    // Emite o evento realizarBusca com os dados do formulário
    this.realizarBusca.emit(this.formBuscaService.obterDadosBusca());
  }

  // Método para limpar os filtros de busca
  limparFiltros() {
    // Atualiza os campos do formulário com valores padrão
    this.formBuscaService.formBusca.patchValue({
      conexoes: null, // Reseta o campo conexões
      companhias: null, // Reseta o campo companhias
      precoMin: this.passagemService.precoMin, // Define o preço mínimo baseado no valor armazenado no serviço PassagensService
      precoMax: this.passagemService.precoMax, // Define o preço máximo baseado no valor armazenado no serviço PassagensService
    });
  }
}
