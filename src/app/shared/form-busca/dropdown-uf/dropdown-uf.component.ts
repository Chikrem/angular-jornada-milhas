import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { FormBuscaService } from 'src/app/core/services/form-busca.service';
import { UnidadeFederativaService } from 'src/app/core/services/unidade-federativa.service';
import { UnidadeFederativa } from 'src/app/core/types/type';

@Component({
  selector: 'app-dropdown-uf',
  templateUrl: './dropdown-uf.component.html',
  styleUrls: ['./dropdown-uf.component.scss']
})
export class DropdownUfComponent implements OnInit {
  @Input() label: string = '';
  @Input() iconePrefixo: string = '';
  @Input() control!: FormControl;

  unidadesFederativas: UnidadeFederativa[] = [];

  filteredOptions$?: Observable<UnidadeFederativa[]>;


  constructor(
    private unidadeFederativaService: UnidadeFederativaService) {

  }

  ngOnInit(): void {
    this.unidadeFederativaService.listar()
      .subscribe(dados => {
        this.unidadesFederativas = dados
        console.log(this.unidadesFederativas)
      })
    this.filteredOptions$ = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this.filtrarUfs(value))
    )
  }

  filtrarUfs(value: string): UnidadeFederativa[] {
    const valorFiltrado = value?.toLowerCase();
    const result = this.unidadesFederativas.filter(
      estado => estado.nome.toLowerCase().includes(valorFiltrado)
    )
    return result
  }
}


// import {Component, OnInit} from '@angular/core';
// import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
// import {Observable} from 'rxjs';
// import {map, startWith} from 'rxjs/operators';
// import {AsyncPipe} from '@angular/common';
// import {MatAutocompleteModule} from '@angular/material/autocomplete';
// import {MatInputModule} from '@angular/material/input';
// import {MatFormFieldModule} from '@angular/material/form-field';

// /**
//  * @title Highlight the first autocomplete option
//  */
// @Component({
//   selector: 'autocomplete-auto-active-first-option-example',
//   templateUrl: 'autocomplete-auto-active-first-option-example.html',
//   styleUrl: 'autocomplete-auto-active-first-option-example.css',
//   standalone: true,
//   imports: [
//     FormsModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatAutocompleteModule,
//     ReactiveFormsModule,
//     AsyncPipe,
//   ],
// })
// export class AutocompleteAutoActiveFirstOptionExample implements OnInit {
//   myControl = new FormControl('');
//   options: string[] = ['One', 'Two', 'Three'];
//   filteredOptions: Observable<string[]>;

//   ngOnInit() {
//     this.filteredOptions = this.myControl.valueChanges.pipe(
//       startWith(''),
//       map(value => this._filter(value || '')),
//     );
//   }

//   private _filter(value: string): string[] {
//     const filterValue = value.toLowerCase();

//     return this.options.filter(option => option.toLowerCase().includes(filterValue));
//   }
// }
