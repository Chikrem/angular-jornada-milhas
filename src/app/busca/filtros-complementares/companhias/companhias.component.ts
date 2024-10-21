// Importações necessárias
import { Component, OnInit } from '@angular/core'; // Importa Component e OnInit do Angular
import { FormControl } from '@angular/forms'; // Importa FormControl para gerenciar controles de formulário
import { CompanhiaService } from 'src/app/busca/services/companhia.service'; // Importa o serviço CompanhiaService
import { FormBuscaService } from 'src/app/shared/services/form-busca.service'; // Importa o serviço FormBuscaService
import { Companhia } from 'src/app/core/types/type'; // Importa a interface Companhia

@Component({
  selector: 'app-companhias', // Seletor do componente
  templateUrl: './companhias.component.html', // Caminho para o template HTML do componente
  styleUrls: ['./companhias.component.scss'] // Caminho para os estilos CSS do componente
})
export class CompanhiasComponent implements OnInit {
  companhias: Companhia[] = []; // Array para armazenar as companhias
  selecionadas: Companhia[] = []; // Array para armazenar as companhias selecionadas

  companhiasControl: FormControl<number[] | null>; // Controle de formulário para companhias

  constructor(
    private companhiaService: CompanhiaService, // Injeta o serviço CompanhiaService
    private formBuscaService: FormBuscaService // Injeta o serviço FormBuscaService
  ) {
    // Obtém o controle de companhias do serviço FormBuscaService
    this.companhiasControl = this.formBuscaService.obterControle<number[] | null>('companhias');
  }

  ngOnInit(): void {
    // Chama o serviço para listar companhias ao inicializar o componente
    this.companhiaService.listar().subscribe(
      res => {
        this.companhias = res; // Armazena o resultado no array de companhias
      }
    );

    // Inscreve-se nas mudanças do controle de companhias
    this.companhiasControl.valueChanges.subscribe(value => {
      // Se não houver valor, limpa as companhias selecionadas
      if (!value) {
        this.selecionadas = [];
      }
    });
  }

  // Método para alternar a seleção de uma companhia
  alternarCompanhia(companhia: Companhia, checked: boolean): void {
    if (!checked) {
      // Se a companhia não estiver selecionada, remove-a do array de selecionadas
      this.selecionadas = this.selecionadas.filter(comp => comp != companhia);
    } else {
      // Se a companhia estiver selecionada, adiciona-a ao array de selecionadas
      this.selecionadas.push(companhia);
    }
    // Atualiza o controle de companhias no formulário com os IDs das companhias selecionadas
    this.formBuscaService.formBusca.patchValue({
      companhias: this.selecionadas.map(comp => Number(comp.id)) // Converte os IDs para número
    });
  }

  // Verifica se uma companhia está selecionada
  companhiaSelecionada(companhia: Companhia): boolean {
    return this.selecionadas.includes(companhia); // Retorna verdadeiro se a companhia estiver no array de selecionadas
  }
}
