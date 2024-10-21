/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, OnInit } from '@angular/core'; // Importa os decorators e interfaces necessárias do Angular
import { Router } from '@angular/router'; // Importa Router para navegação
import { PromocaoService } from 'src/app/home/services/promocao.service'; // Importa o serviço de promoções

@Component({
  selector: 'app-home', // Selector do componente
  templateUrl: './home.component.html', // Caminho para o template HTML
  styleUrls: ['./home.component.scss'] // Caminho para o estilo SCSS
})
export class HomeComponent implements OnInit {
  constructor(
    private servicoPromocao: PromocaoService, // Injeta o serviço de promoções
    private router: Router // Injeta o serviço Router
  ) {}

  // Método chamado ao inicializar o componente
  ngOnInit(): void {
    // Chama o método listar do serviço de promoções e subscreve ao Observable retornado
    this.servicoPromocao.listar()
      .subscribe(
        resposta => {
          console.log(resposta); // Loga a resposta no console
        }
      );
  }

  // Método para navegar para a página de busca
  navegarParaBusca(ev: any) {
    this.router.navigate(['busca']); // Navega para a rota 'busca'
  }
}
