import { Component, OnInit } from '@angular/core'; // Importa os decoradores Component e OnInit do Angular
import { PromocaoService } from 'src/app/home/services/promocao.service'; // Importa o serviço PromocaoService
import { Promocao } from 'src/app/core/types/type'; // Importa o tipo Promocao

@Component({
  selector: 'app-promocoes', // Define o seletor do componente
  templateUrl: './promocoes.component.html', // Define o template HTML do componente
  styleUrls: ['./promocoes.component.scss'] // Define os estilos do componente
})
export class PromocoesComponent implements OnInit {
  promocoes!: Promocao[]; // Declara um array de promoções (inicializado posteriormente)

  constructor(private service: PromocaoService) { // Injeta o serviço PromocaoService no construtor
  }

  ngOnInit(): void { // Método chamado após a inicialização do componente
    this.service.listar().subscribe( // Chama o método listar do serviço
      res => { // Função que será chamada quando a requisição for bem-sucedida
        this.promocoes = res; // Armazena a resposta no array de promoções
      }
    );
  }
}
