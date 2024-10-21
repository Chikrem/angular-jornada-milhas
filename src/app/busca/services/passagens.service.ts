// Importações necessárias
import { HttpClient } from '@angular/common/http'; // Importa HttpClient para realizar requisições HTTP
import { Injectable } from '@angular/core'; // Importa o decorador Injectable para injetar o serviço
import { Observable, take } from 'rxjs'; // Importa Observable e a função take do RxJS
import { environment } from 'src/environments/environment'; // Importa as variáveis de ambiente
import { DadosBusca, Destaques, Passagem, Resultado } from '../../core/types/type'; // Tipos utilizados na aplicação

@Injectable({
  providedIn: 'root' // Permite que o serviço seja injetado em qualquer lugar da aplicação
})
export class PassagensService {
  apiUrl: string = environment.apiUrl; // URL base da API, definida nas variáveis de ambiente
  precoMin = 0; // Preço mínimo das passagens
  precoMax = 0; // Preço máximo das passagens

  constructor(
    private httpClient: HttpClient // Injeção do HttpClient
  ) { }

  // Método para obter passagens baseado nos dados de busca
  getPassagens(search: DadosBusca): Observable<Resultado> {
    const params = this.converterParametroParaString(search); // Converte os parâmetros de busca em string
    const obs = this.httpClient.get<Resultado>(this.apiUrl + '/passagem/search?' + params); // Faz a requisição GET à API
    obs.pipe(take(1)).subscribe(res => { // Limita a quantidade de emissões a 1 e se inscreve na resposta
      this.precoMin = res.precoMin; // Atualiza o preço mínimo
      this.precoMax = res.precoMax; // Atualiza o preço máximo
    });
    return obs; // Retorna o observable da requisição
  }

  // Método para converter os dados de busca em parâmetros de string para a URL
  converterParametroParaString(busca: DadosBusca) {
    const query = Object.entries(busca) // Converte o objeto em um array de pares chave-valor
      .map(([key, value]) => { // Mapeia as entradas para a string de parâmetros
        if (!value) { // Ignora valores falsy
          return '';
        }
        return `${key}=${value}`; // Retorna a string formatada
      })
      .join('&'); // Junta todos os pares com '&'
    return query; // Retorna a string de consulta
  }

  // Método para obter passagens em destaque a partir de um array de passagens
  obterPassagensDestaques(passagem: Passagem[]): Destaques | undefined {
    if (!passagem.length) { // Se não houver passagens
      return undefined; // Retorna indefinido
    }

    // Ordena as passagens por tempo de voo
    const ordenadoPorTempo = [...passagem].sort((a, b) => a.tempoVoo - b.tempoVoo);
    // Ordena as passagens por preço total
    const ordenadoPorPreco = [...passagem].sort((a, b) => a.total - b.total);

    const maisRapida = ordenadoPorTempo[0]; // A passagem mais rápida
    const maisBarata = ordenadoPorPreco[0]; // A passagem mais barata

    // Ordena as passagens por uma média de pontuação que considera tempo e preço
    const ordenadoPorMedia = [...passagem].sort((a, b) => {
      const pontuacaoA = (a.tempoVoo / maisBarata.tempoVoo + a.total / maisBarata.total) / 2; // Cálculo da pontuação da passagem A
      const pontuacaoB = (b.tempoVoo / maisBarata.tempoVoo + b.total / maisBarata.total) / 2; // Cálculo da pontuação da passagem B
      return pontuacaoA - pontuacaoB; // Ordena com base na pontuação
    });
    const sugerida = ordenadoPorMedia[0]; // A passagem sugerida com melhor pontuação

    // Retorna um objeto com as passagens em destaque
    return { maisRapida, maisBarata, sugerida };
  }
}
