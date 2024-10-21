/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, Input, forwardRef } from '@angular/core'; // Importa classes necessárias do Angular
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'; // Importa interfaces para controlar valores de formulário

@Component({
  selector: 'app-seletor-passageiro', // Define o seletor do componente
  templateUrl: './seletor-passageiro.component.html', // Define o template HTML do componente
  styleUrls: ['./seletor-passageiro.component.scss'], // Define o estilo SCSS do componente
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, // Permite que o componente seja utilizado com Reactive Forms
      useExisting: forwardRef(() => SeletorPassageiroComponent), // Usa uma referência circular para o componente
      multi: true // Permite múltiplos provedores para a mesma chave
    }
  ]
})
export class SeletorPassageiroComponent implements ControlValueAccessor {
  @Input() titulo = ''; // Título do seletor, pode ser passado como input
  @Input() subtitulo = ''; // Subtítulo do seletor, pode ser passado como input

  value = 0; // Valor atual do seletor de passageiros
  onChange: (val: number)=> void = () => {}; // Função chamada quando o valor muda
  onTouch: ()=> void = () => {}; // Função chamada quando o componente é tocado

  // Método para escrever o valor no componente
  writeValue(val: number): void {
    this.value = val; // Atualiza o valor do seletor
  }

  // Registra a função que deve ser chamada quando o valor muda
  registerOnChange(fn: (val: number)=> void): void {
    this.onChange = fn; // Atribui a função recebida
  }

  // Registra a função que deve ser chamada quando o componente é tocado
  registerOnTouched(fn: ()=> void): void {
    this.onTouch = fn; // Atribui a função recebida
  }

  // Método para incrementar o valor
  incrementar(): void {
    this.value += 1; // Aumenta o valor
    this.onChange(this.value); // Chama a função de mudança com o novo valor
    this.onTouch(); // Chama a função de toque
  }

  // Método para decrementar o valor
  decrementar(): void {
    if (this.value > 0) { // Verifica se o valor é maior que zero
      this.value -= 1; // Diminui o valor
      this.onChange(this.value); // Chama a função de mudança com o novo valor
      this.onTouch(); // Chama a função de toque
    }
  }
}
