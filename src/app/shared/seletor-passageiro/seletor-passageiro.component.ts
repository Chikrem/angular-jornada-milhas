import { Component, Input } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-seletor-passageiro',
  templateUrl: './seletor-passageiro.component.html',
  styleUrls: ['./seletor-passageiro.component.scss'],
})

export class SeletorPassageiroComponent implements ControlValueAccessor {

  @Input() titulo: string = ''
  @Input() subtitulo: string = ''

  value: number = 0
  onChange = () => {}
  onTouch = () => {}

  writeValue(val: any): void {
    this.value = val
  }
  registerOnChange(fn: any): void {
    this.onChange = fn
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }
}

// A interface ControlValueAccessor possui quatro métodos principais que devem ser implementados:

// writeValue(value: any): Este método é chamado pelo Angular Forms para atualizar o valor do componente personalizado com base no valor fornecido pelo formulário. O componente deve atualizar sua visualização e estado interno de acordo com o novo valor.

// registerOnChange(fn: any): Este método é usado para registrar uma função de retorno de chamada que será chamada pelo componente personalizado sempre que houver alterações em seu valor interno. O componente deve chamar essa função sempre que o valor for alterado para notificar o Angular Forms sobre as alterações.

// registerOnTouched(fn: any): Este método é usado para registrar uma função de retorno de chamada que será chamada pelo componente personalizado quando ele for tocado ou sofrer uma alteração no estado de foco. O componente deve chamar essa função sempre que ocorrer uma interação com ele, como um clique ou foco.

// setDisabledState(isDisabled: boolean): Este método é usado para definir o estado de desabilitado do componente personalizado com base no valor fornecido pelo formulário. O componente deve atualizar sua visualização e comportamento de acordo com o estado de desabilitado.

// Ao implementar a interface ControlValueAccessor, um componente personalizado se torna compatível com o sistema de formulários do Angular e pode ser usado de forma transparente, assim o componente pode receber valores do formulário, notificar o formulário sobre as alterações em seu valor interno e reagir a eventos como toque e alteração de foco.
