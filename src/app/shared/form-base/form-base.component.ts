import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UnidadeFederativa } from 'src/app/core/types/type';
import { FormularioService } from './../../core/services/formulario.service';
import { FormValidations } from './../form-validations';

@Component({
  selector: 'app-form-base',
  templateUrl: './form-base.component.html',
  styleUrls: ['./form-base.component.scss']
})
export class FormBaseComponent implements OnInit{
  cadastroForm!: FormGroup;
  estadoControl = new FormControl<UnidadeFederativa | null>(null, Validators.required);

  @Input() perfilComponent = false;
  @Input() titulo: string = 'Crie sua conta';
  @Input() textoBotao : string ='CADASTRAR';

  // Precisamos saber se estamos na tela de cadastro ou na tela de perfil e uma das formas de fazer isso é utilizar uma input property.
  // Ou seja, o componente pai vai enviar essa informação para o componente filho.

  @Output() acaoClique: EventEmitter<any> = new EventEmitter<any>()
  @Output() sair: EventEmitter<any> = new EventEmitter<any>()


  constructor(
    private formBuilder: FormBuilder,
    private formularioService: FormularioService
  ) { }

  ngOnInit() {
    this.cadastroForm = this.formBuilder.group({
      nome: ['Teste', Validators.required],
      nascimento: [null, [Validators.required]],
      cpf: ['Teste', [Validators.required]],
      cidade: ['City', Validators.required],
      email: ['teste@email.com', [Validators.required, Validators.email]],
      senha: ['Teste', [Validators.required, Validators.minLength(3)]],
      genero: ['outro'],
      telefone: [null, Validators.required],
      estado: this.estadoControl,
      confirmarEmail: ['teste@email.com', [Validators.required, Validators.email, FormValidations.equalTo('email')]],
      confirmarSenha: ['Teste', [Validators.required, Validators.minLength(3), FormValidations.equalTo('senha')]],
      aceitarTermos: [null, [Validators.requiredTrue]]
    });

    if(this.perfilComponent) {

      this.cadastroForm.get('aceitarTermos')?.setValidators (null)

    } else {
      this.cadastroForm.get('aceitarTermos')?.setValidators ([Validators.requiredTrue])

      this.cadastroForm.get('aceitarTermos')?.updateValueAndValidity();

      this.formularioService.setCadastro (this.cadastroForm)
  }
  }


  executarAcao() {
    this.acaoClique.emit()
  }

  deslogar(){
    this.sair.emit()
  }
}
