import { Component, EventEmitter, Output } from '@angular/core'; // Importa classes necessárias do Angular
import { FormBuscaService } from 'src/app/shared/services/form-busca.service'; // Importa o serviço de busca

@Component({
  selector: 'app-form-busca', // Define o seletor do componente
  templateUrl: './form-busca.component.html', // Define o template HTML do componente
  styleUrls: ['./form-busca.component.scss'] // Define o estilo SCSS do componente
})
export class FormBuscaComponent {
  @Output() realizarBusca = new EventEmitter(); // Emite um evento para o componente pai

  constructor(
    public formBuscaService: FormBuscaService // Injeta o serviço de busca
  ) { }

  // Método chamado ao buscar
  buscar() {
    if (this.formBuscaService.formEstaValido) { // Verifica se o formulário é válido
      const formBuscavalue = this.formBuscaService.obterDadosBusca(); // Obtém os dados do formulário
      this.realizarBusca.emit(formBuscavalue); // Emite os dados para o componente pai
    } else {
      alert('O formulário precisa ser preenchido'); // Alerta se o formulário não é válido
    }
  }
}
