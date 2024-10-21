import { Injectable } from '@angular/core'; // Importa a classe Injectable para injeção de dependências
import { FormControl, FormGroup, Validators } from '@angular/forms'; // Importa classes para manipulação de formulários
import { MatChipSelectionChange } from '@angular/material/chips'; // Importa classe para manipulação de seleção de chips
import { MatDialog } from '@angular/material/dialog'; // Importa classe para gerenciar diálogos
import { ModalComponent } from 'src/app/shared/modal/modal.component'; // Importa o componente de modal
import { DadosBusca, UnidadeFederativa } from '../../core/types/type'; // Importa tipos usados no serviço

@Injectable({
  providedIn: 'root' // Torna o serviço disponível globalmente
})
export class FormBuscaService {

  formBusca: FormGroup; // Declara o formulário de busca

  constructor(private dialog: MatDialog) {
    // Inicializa o formulário de busca
    const somenteIda = new FormControl(false, [Validators.required]); // Controla se a passagem é somente ida
    const dataVolta = new FormControl(null, [Validators.required]); // Controla a data de volta

    // Cria um FormGroup com os campos necessários
    this.formBusca = new FormGroup({
      somenteIda,
      origem: new FormControl(null, [Validators.required]), // Origem da viagem
      destino: new FormControl(null, [Validators.required]), // Destino da viagem
      tipo: new FormControl("Econômica"), // Tipo de passagem (default: Econômica)
      adultos: new FormControl(1), // Número de adultos
      criancas: new FormControl(0), // Número de crianças
      bebes: new FormControl(0), // Número de bebês
      dataIda: new FormControl(null, [Validators.required]), // Data de ida
      dataVolta, // Data de volta
      conexoes: new FormControl(null), // Número de conexões
      companhias: new FormControl(null), // Companhias aéreas
      precoMin: new FormControl(null), // Preço mínimo
      precoMax: new FormControl(null), // Preço máximo
    });

    // Escuta mudanças no campo "somenteIda"
    somenteIda.valueChanges.subscribe(somenteIda => {
      if (somenteIda) {
        dataVolta.disable(); // Desabilita o campo dataVolta se somenteIda for verdadeiro
        dataVolta.setValidators(null); // Remove as validações do campo
      } else {
        dataVolta.enable(); // Habilita o campo dataVolta se somenteIda for falso
        dataVolta.setValidators([Validators.required]); // Reaplica a validação
      }
      dataVolta.updateValueAndValidity(); // Atualiza a validade do campo dataVolta
    });
  }

  // Método que retorna uma descrição dos passageiros
  getDescricaoPassageiros(): string {
    let descricao = '';

    const adultos = this.formBusca.get('adultos')?.value; // Obtém o número de adultos
    if (adultos && adultos > 0) {
      descricao += `${adultos} adulto${adultos > 1 ? 's' : ''}`; // Formata a descrição para adultos
    }

    const criancas = this.formBusca.get('criancas')?.value; // Obtém o número de crianças
    if (criancas && criancas > 0) {
      descricao += `${descricao ? ', ' : ''}${criancas} criança${criancas > 1 ? 's' : ''}`; // Formata a descrição para crianças
    }

    const bebes = this.formBusca.get('bebes')?.value; // Obtém o número de bebês
    if (bebes && bebes > 0) {
      descricao += `${descricao ? ', ' : ''}${bebes} bebê${bebes > 1 ? 's' : ''}`; // Formata a descrição para bebês
    }

    return descricao; // Retorna a descrição dos passageiros
  }

  // Método que troca os campos de origem e destino
  trocarOrigemDestino(): void {
    const origem = this.formBusca.get('origem')?.value; // Obtém o valor da origem
    const destino = this.formBusca.get('destino')?.value; // Obtém o valor do destino

    // Atualiza os campos de origem e destino
    this.formBusca.patchValue({
      origem: destino,
      destino: origem
    });
  }

  // Método para obter um controle do formulário
  obterControle<T>(nome: string): FormControl {
    const control = this.formBusca.get(nome); // Obtém o controle pelo nome
    if (!control) {
      throw new Error(`FormControl com nome "${nome}" não existe.`); // Lança erro se o controle não existir
    }
    return control as FormControl<T>; // Retorna o controle como FormControl do tipo T
  }

  // Método para obter os dados de busca a partir do formulário
  obterDadosBusca(): DadosBusca {
    const dataIdaControl = this.obterControle<Date>('dataIda'); // Obtém o controle de dataIda
    const dadosBusca: DadosBusca = {
      pagina: 1,
      porPagina: 50,
      dataIda: dataIdaControl.value.toISOString(), // Converte a data de ida para ISO string
      passageirosAdultos: this.obterControle<number>('adultos').value, // Obtém o número de adultos
      passageirosCriancas: this.obterControle<number>('criancas').value, // Obtém o número de crianças
      passageirosBebes: this.obterControle<number>('bebes').value, // Obtém o número de bebês
      somenteIda: this.obterControle<boolean>('somenteIda').value, // Obtém o valor do controle somenteIda
      origemId: this.obterControle<UnidadeFederativa>('origem').value.id, // Obtém o ID da origem
      destinoId: this.obterControle<UnidadeFederativa>('destino').value.id, // Obtém o ID do destino
      tipo: this.obterControle<string>('tipo').value, // Obtém o tipo de passagem
    };
    const dataVoltaControl = this.obterControle<Date>('dataVolta'); // Obtém o controle de dataVolta
    if (dataVoltaControl.value) {
      dadosBusca.dataVolta = dataVoltaControl.value.toISOString(); // Adiciona dataVolta se existir
    }
    const conexoesControl = this.obterControle<number>('conexoes'); // Obtém o controle de conexões
    if (conexoesControl.value) {
      dadosBusca.conexoes = conexoesControl.value; // Adiciona conexões se existirem
    }
    const companhiasControl = this.obterControle<number[]>('companhias'); // Obtém o controle de companhias
    if (companhiasControl.value) {
      dadosBusca.companhiasId = companhiasControl.value; // Adiciona IDs das companhias se existirem
    }
    const precoMinControl = this.obterControle<number>('precoMin'); // Obtém o controle de preço mínimo
    if (precoMinControl.value) {
      dadosBusca.precoMin = precoMinControl.value; // Adiciona preço mínimo se existir
    }
    const precoMaxControl = this.obterControle<number>('precoMax'); // Obtém o controle de preço máximo
    if (precoMaxControl.value) {
      dadosBusca.precoMax = precoMaxControl.value; // Adiciona preço máximo se existir
    }
    return dadosBusca; // Retorna os dados de busca
  }

  // Método para alterar o tipo de passagem ao selecionar um chip
  alterarTipo(evento: MatChipSelectionChange, tipo: string) {
    if (evento.selected) {
      this.formBusca.patchValue({
        tipo, // Atualiza o tipo de passagem
      });
      console.log('Tipo de passagem alterado para: ', tipo); // Loga o novo tipo
    }
  }

  // Método para abrir um modal
  openDialog() {
    this.dialog.open(ModalComponent, {
      width: '50%' // Define a largura do modal
    });
  }

  // Propriedade que verifica se o formulário está válido
  get formEstaValido() {
    return this.formBusca.valid; // Retorna se o formulário é válido
  }
}
