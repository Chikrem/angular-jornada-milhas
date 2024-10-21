import { Component, Input, OnInit } from '@angular/core'; // Importa classes necessárias do Angular
import { FormControl } from '@angular/forms'; // Importa FormControl para controle de formulários
import { Observable, map, startWith } from 'rxjs'; // Importa funções do RxJS para manipulação de observáveis
import { UnidadeFederativaService } from 'src/app/core/services/unidade-federativa.service'; // Importa o serviço de Unidade Federativa
import { UnidadeFederativa } from 'src/app/core/types/type'; // Importa o tipo Unidade Federativa

@Component({
  selector: 'app-dropdown-uf', // Define o seletor do componente
  templateUrl: './dropdown-uf.component.html', // Define o template HTML do componente
  styleUrls: ['./dropdown-uf.component.scss'] // Define o estilo SCSS do componente
})
export class DropdownUfComponent implements OnInit { // Classe do componente que implementa OnInit
  @Input() label = ''; // Rótulo do dropdown
  @Input() iconePrefixo = ''; // Ícone prefixo a ser exibido no dropdown
  @Input() control!: FormControl; // Controle de formulário associado ao dropdown
  @Input() placeholder = ''; // Texto de placeholder no dropdown

  unidadesFederativas: UnidadeFederativa[] = []; // Array para armazenar as Unidades Federativas

  filteredOptions$?: Observable<UnidadeFederativa[]>; // Observable para as opções filtradas

  constructor(
    private unidadeFederativaService: UnidadeFederativaService // Injeta o serviço de Unidade Federativa
  ) { }

  ngOnInit(): void {
    // Carrega as Unidades Federativas ao inicializar o componente
    this.unidadeFederativaService.listar()
      .subscribe(dados => {
        this.unidadesFederativas = dados; // Armazena os dados recebidos
        console.log(this.unidadesFederativas); // Log para verificar os dados
      });

    // Filtra as opções baseadas nas alterações do controle
    this.filteredOptions$ = this.control.valueChanges.pipe(
      startWith(''), // Inicia com um valor vazio
      map(value => this.filtrarUfs(value)) // Aplica a função de filtragem
    );
  }

  // Função para filtrar as Unidades Federativas com base no valor de entrada
  filtrarUfs(value: string | UnidadeFederativa): UnidadeFederativa[] {
    const nomeUf = typeof value === 'string' ? value : value?.nome; // Obtém o nome da UF
    const valorFiltrado = nomeUf?.toLowerCase(); // Converte para minúsculas
    const result = this.unidadesFederativas.filter(
      estado => estado.nome.toLowerCase().includes(valorFiltrado) // Filtra as UFs que incluem o valor
    );
    return result; // Retorna as UFs filtradas
  }

  // Função para exibir a Unidade Federativa selecionada no dropdown
  displayFn(estado: UnidadeFederativa): string {
    return estado && estado.nome ? estado.nome : ''; // Retorna o nome da UF ou uma string vazia
  }
}
