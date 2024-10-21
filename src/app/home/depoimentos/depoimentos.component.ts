import { Component, OnInit } from '@angular/core'; // Importa os decoradores Component e OnInit do Angular
import { DepoimentoService } from 'src/app/home/services/depoimento.service'; // Importa o serviço DepoimentoService
import { Depoimento } from 'src/app/core/types/type'; // Importa o tipo Depoimento

@Component({
  selector: 'app-depoimentos', // Define o seletor do componente
  templateUrl: './depoimentos.component.html', // Define o template HTML do componente
  styleUrls: ['./depoimentos.component.scss'] // Define os estilos do componente
})
export class DepoimentosComponent implements OnInit {
  depoimentos: Depoimento[] = []; // Inicializa um array de depoimentos vazio

  constructor(private service: DepoimentoService) { // Injeta o serviço DepoimentoService no construtor
  }

  ngOnInit(): void { // Método chamado após a inicialização do componente
    this.service.listar().subscribe( // Chama o método listar do serviço
      res => { // Função que será chamada quando a requisição for bem-sucedida
        this.depoimentos = res; // Armazena a resposta no array de depoimentos
      }
    );
  }
}
