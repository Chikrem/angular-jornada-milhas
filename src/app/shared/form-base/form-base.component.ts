import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UnidadeFederativa } from 'src/app/core/types/type';

@Component({
  selector: 'app-form-base',
  templateUrl: './form-base.component.html',
  styleUrls: ['./form-base.component.scss']
})
export class FormBaseComponent implements OnInit{
  cadastroForm!: FormGroup;
  estadoControl = new FormControl<UnidadeFederativa | null>(null, Validators.required);

  @Input() perfilComponent! : boolean;

  // Precisamos saber se estamos na tela de cadastro ou na tela de perfil e uma das formas de fazer isso é utilizar uma input property.
  // Ou seja, o componente pai vai enviar essa informação para o componente filho.

  @Output() acaoClique: EventEmitter<any> = new EventEmitter<any>


  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.cadastroForm = this.formBuilder.group({
      nome: [null, Validators.required],
      nascimento: [null, [Validators.required]],
      cpf: [null, [Validators.required]],
      cidade: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      senha: [null, [Validators.required, Validators.minLength(3)]],
      genero: ['outro'],
      telefone: [null, Validators.required],
      estado: this.estadoControl,
      confirmarEmail: [null, [Validators.required, Validators.email]],
      confirmarSenha: [null, [Validators.required, Validators.minLength(3)]],
      aceitarTermos: [null, [Validators.requiredTrue]]
    });
  }


  executarAcao() {
    this.acaoClique.emit()
  }
}
