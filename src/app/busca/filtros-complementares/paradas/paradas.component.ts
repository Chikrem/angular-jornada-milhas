// Importações necessárias
import { Component, OnInit } from '@angular/core'; // Importa Component e OnInit do Angular
import { FormControl } from '@angular/forms'; // Importa FormControl para gerenciar os controles de formulário
import { FormBuscaService } from 'src/app/shared/services/form-busca.service'; // Importa o serviço FormBuscaService

// Define uma interface para as opções de parada
interface OpcoesDeParada {
  display: string; // Texto a ser exibido para a opção
  value: string;   // Valor associado à opção
}

@Component({
  selector: 'app-paradas', // Seletor do componente
  templateUrl: './paradas.component.html', // Caminho para o template HTML do componente
  styleUrls: ['./paradas.component.scss'] // Caminho para os estilos CSS do componente
})
export class ParadasComponent implements OnInit {
  opcoesSelecionada: OpcoesDeParada | null = null; // Opção de parada selecionada, inicialmente nula
  opcoes: OpcoesDeParada[] = [ // Array de opções de parada
    {
      display: "Direto",
      value: "0"
    },
    {
      display: "1 conexão",
      value: "1"
    },
    {
      display: "2 conexões",
      value: "2"
    },
    {
      display: "Mais de 2 conexões",
      value: "3"
    },
  ];
  conexoesControl: FormControl<number | null>; // Controle de formulário para conexões

  constructor(private formBuscaService: FormBuscaService) {
    // Obtém o controle de conexões do serviço FormBuscaService
    this.conexoesControl = this.formBuscaService.obterControle<number>('conexoes');
  }

  ngOnInit() {
    // Inscreve-se nas mudanças de valor do controle de conexões
    this.conexoesControl.valueChanges.subscribe(
      (value) => {
        // Se o valor for nulo, reseta a opção selecionada
        if (value === null) {
          this.opcoesSelecionada = null;
        }
      }
    );
  }

  // Método para alternar a opção de parada
  alternarParada(opcao: OpcoesDeParada, checked: boolean) {
    if (!checked) {
      // Se a opção não estiver selecionada, reseta a opção selecionada e o valor do controle
      this.opcoesSelecionada = null;
      this.formBuscaService.formBusca.patchValue({
        conexoes: null
      });
      return;
    }
    // Se a opção estiver selecionada, atualiza a opção selecionada e o controle de conexões
    this.opcoesSelecionada = opcao;
    this.formBuscaService.formBusca.patchValue({
      conexoes: Number(opcao.value) // Converte o valor da opção para número
    });
  }

  // Verifica se uma opção é a selecionada
  paradaSelecionada(opcao: OpcoesDeParada): boolean {
    return this.opcoesSelecionada === opcao;
  }

  // Verifica se uma opção deve ser incluída com base na opção selecionada
  incluirParada(opcao: OpcoesDeParada) {
    if (!this.opcoesSelecionada) {
      return false; // Se não houver opção selecionada, retorna falso
    }
    // Retorna verdadeiro se o valor da opção selecionada for maior que o da opção passada
    return this.opcoesSelecionada.value > opcao.value;
  }
}
