// Importações necessárias
import { Component, OnInit } from '@angular/core'; // Para criação de componentes e ciclo de vida
import { take } from 'rxjs'; // Operador RxJS que finaliza a inscrição após receber um valor
import { FormBuscaService } from 'src/app/shared/services/form-busca.service'; // Serviço para manipulação do formulário de busca
import { PassagensService } from 'src/app/busca/services/passagens.service'; // Serviço que lida com requisições de passagens
import { DadosBusca, Destaques, Passagem } from 'src/app/core/types/type'; // Tipos definidos para dados de busca, destaques e passagens

@Component({
  selector: 'app-busca', // Seletor do componente
  templateUrl: './busca.component.html', // Arquivo de template HTML do componente
  styleUrls: ['./busca.component.scss'] // Arquivo de estilos SCSS do componente
})
export class BuscaComponent implements OnInit {
  // Declaração das propriedades do componente
  passagens: Passagem[] = []; // Armazena o array de passagens
  destaques?: Destaques; // Armazena os destaques (opcional, pode ser undefined)

  // Injeção de dependências no construtor
  constructor(
    private passagensService: PassagensService, // Serviço para manipulação das passagens
    private formBuscaService: FormBuscaService // Serviço que lida com os dados do formulário de busca
  ) { }

  // Método do ciclo de vida do Angular, chamado quando o componente é inicializado
  ngOnInit(): void {
    // Dados de busca padrão, caso o formulário de busca ainda não esteja preenchido
    const buscaPadrao: DadosBusca = {
      dataIda: new Date().toISOString(), // Define a data de ida como a data atual
      pagina: 1, // Primeira página de resultados
      porPagina: 25, // Quantidade de resultados por página
      somenteIda: false, // Especifica que a busca é para ida e volta
      passageirosAdultos: 1, // Número de passageiros adultos
      tipo: "Executiva" // Tipo de passagem (classe executiva)
    };

    // Verifica se o formulário de busca está válido e usa os dados, caso contrário usa os dados padrão
    const busca = this.formBuscaService.formEstaValido ? this.formBuscaService.obterDadosBusca() : buscaPadrao;

    // Chama o serviço para buscar as passagens de acordo com os dados de busca
    this.passagensService.getPassagens(busca)
      .pipe(take(1)) // Utiliza o operador `take(1)` para pegar apenas uma resposta e encerrar a inscrição automaticamente
      .subscribe(
        res => {
          // Atualiza o array de passagens com os resultados retornados
          this.passagens = res.resultado;
          // Atualiza o formulário de busca com os valores mínimos e máximos de preço retornados pela API
          this.formBuscaService.formBusca.patchValue({
            precoMin: res.precoMin,
            precoMax: res.precoMax,
          });
          // Chama o método para obter os destaques das passagens
          this.obterDestaques();
        }
      );
  }

  // Método para realizar nova busca com os dados atualizados
  busca(ev: DadosBusca) {
    this.passagensService.getPassagens(ev).subscribe(
      res => {
        console.log(res); // Exibe o resultado da busca no console para depuração
        this.passagens = res.resultado; // Atualiza o array de passagens com os resultados
      }
    );
  }

  // Método para obter as passagens em destaque, baseado nos resultados obtidos
  obterDestaques(){
    this.destaques = this.passagensService.obterPassagensDestaques(this.passagens); // Chama o serviço para obter os destaques
  }
}
