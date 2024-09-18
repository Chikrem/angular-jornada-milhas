
// Dentro do array, vamos abrir um objeto. Primeiro, vamos dizer que ele provê o accessor, ou seja, o provide é o NG_VALUE_ACCESSOR.

// Em uma nova linha, também vamos digitar useExisting para dizer que ele vai usar uma classe já existente. Porém, essa classe que é o componente SeletorPassageiroComponent ainda não existe em tempo de compilação.

// Para fazer com que isso funcione em tempo de compilação, vamos chamar um utilitário do Angular chamado forwardRef(). Assim, indicamos que essa referência deve ser pega depois.

// ForwardRef recebe uma função () => {} que retorna a classe que queremos, SeletorPassageiroComponent.

// Instruímos o Angular que essa classe usada não existe em tempo de compilação, mas pode ter acesso a ela futuramente. Usamos o forwardRef() para fazer esse encaminhamento.

// Importamos o forwardRef automaticamente de @angular/core.

// multi é true para dizer que esse accessor pode ser provido em múltiplos lugares diferentes.

import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-seletor-passageiro',
  templateUrl: './seletor-passageiro.component.html',
  styleUrls: ['./seletor-passageiro.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SeletorPassageiroComponent),
      multi: true
    }
  ]
})
export class SeletorPassageiroComponent implements ControlValueAccessor {

  @Input() titulo: string = ''
  @Input() subtitulo: string = ''

  value: number = 0
  onChange = (val: number) => {}
  onTouch = () => {}

  writeValue(val: any): void {
    this.value = val
  }
  registerOnChange(fn: any): void {
    this.onChange = fn
  }
  registerOnTouched(fn: any): void {
    this.onChange = fn
  }
  setDisabledState?(isDisabled: boolean): void {

  }

  incrementar () {
    this.value += 1
    this.onChange(this.value)
    this.onTouch()
  }

  decrementar () {
    if (this.value > 0) {
      this.value -= 1
      this.onChange(this.value)
      this.onTouch()
    }
  }

}

  // A interface ControlValueAccessor possui quatro métodos principais que devem ser implementados:

  // writeValue(value: any): Este método é chamado pelo Angular Forms para atualizar o valor do componente personalizado com base no valor fornecido pelo formulário. O componente deve atualizar sua visualização e estado interno de acordo com o novo valor.

  // registerOnChange(fn: any): Este método é usado para registrar uma função de retorno de chamada que será chamada pelo componente personalizado sempre que houver alterações em seu valor interno. O componente deve chamar essa função sempre que o valor for alterado para notificar o Angular Forms sobre as alterações.

  // registerOnTouched(fn: any): Este método é usado para registrar uma função de retorno de chamada que será chamada pelo componente personalizado quando ele for tocado ou sofrer uma alteração no estado de foco. O componente deve chamar essa função sempre que ocorrer uma interação com ele, como um clique ou foco.

  // setDisabledState(isDisabled: boolean): Este método é usado para definir o estado de desabilitado do componente personalizado com base no valor fornecido pelo formulário. O componente deve atualizar sua visualização e comportamento de acordo com o estado de desabilitado.

  // Ao implementar a interface ControlValueAccessor, um componente personalizado se torna compatível com o sistema de formulários do Angular e pode ser usado de forma transparente, assim o componente pode receber valores do formulário, notificar o formulário sobre as alterações em seu valor interno e reagir a eventos como toque e alteração de foco.


