import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'; // Importa as classes necessárias do Angular
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'; // Importa classes para manipulação de formulários
import { FormularioService } from 'src/app/core/services/formulario.service'; // Importa o serviço de formulário
import { UnidadeFederativa } from 'src/app/core/types/type'; // Importa o tipo de Unidade Federativa
import { FormValidations } from '../form-validations'; // Importa as validações personalizadas

@Component({
  selector: 'app-form-base', // Define o seletor do componente
  templateUrl: './form-base.component.html', // Define o template HTML do componente
  styleUrls: ['./form-base.component.scss'] // Define o estilo SCSS do componente
})
export class FormBaseComponent implements OnInit { // Classe do componente que implementa OnInit
  cadastroForm!: FormGroup; // Declara o formulário como um grupo de controles
  estadoControl = new FormControl<UnidadeFederativa | null>(null, Validators.required); // Controla o estado com validação

  @Input() perfilComponent = false; // Propriedade para indicar se é um componente de perfil
  @Input() titulo = 'Crie sua conta'; // Título do formulário
  @Input() textoBotao = 'CADASTRAR'; // Texto do botão
  @Output() acaoClique: EventEmitter<void> = new EventEmitter<void>(); // Emite evento quando o botão é clicado
  @Output() sair: EventEmitter<void> = new EventEmitter<void>(); // Emite evento ao deslogar

  constructor(
    private formBuilder: FormBuilder, // Injeta o FormBuilder para criar o formulário
    private formularioService: FormularioService // Injeta o serviço de formulário
  ) { }

  ngOnInit() {
    // Inicializa o formulário com controles e validações
    this.cadastroForm = this.formBuilder.group({
      nome: [null, Validators.required], // Controle para nome com validação obrigatória
      nascimento: [null, [Validators.required]], // Controle para data de nascimento
      cpf: [null, [Validators.required]], // Controle para CPF
      cidade: [null, Validators.required], // Controle para cidade
      email: [null, [Validators.required, Validators.email]], // Controle para email com validação
      senha: [null, [Validators.required, Validators.minLength(3)]], // Controle para senha
      genero: ['outro'], // Controle para gênero com valor padrão
      telefone: [null, Validators.required], // Controle para telefone
      estado: this.estadoControl, // Controle para estado
      confirmarEmail: [null, [Validators.required, Validators.email, FormValidations.equalTo('email')]], // Validação de confirmação de email
      confirmarSenha: [null, [Validators.required, Validators.minLength(3), FormValidations.equalTo('senha')]], // Validação de confirmação de senha
      aceitarTermos: [false, [Validators.requiredTrue]] // Controle para aceitar termos com validação
    });

    // Se for o componente de perfil, remove a validação de aceitar termos
    if(this.perfilComponent){
      this.cadastroForm.get('aceitarTermos')?.setValidators(null);
    } else {
      this.cadastroForm.get('aceitarTermos')?.setValidators([Validators.requiredTrue]);
    }

    // Atualiza a validação do controle de aceitar termos
    this.cadastroForm.get('aceitarTermos')?.updateValueAndValidity();

    // Define o formulário no serviço de formulário
    this.formularioService.setCadastro(this.cadastroForm);
  }

  // Método chamado ao clicar no botão
  executarAcao() {
    this.acaoClique.emit(); // Emite o evento de ação
  }

  // Método chamado para deslogar
  deslogar() {
    this.sair.emit(); // Emite o evento de sair
  }
}
