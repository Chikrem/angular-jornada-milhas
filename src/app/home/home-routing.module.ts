import { RouterModule, Routes } from "@angular/router"; // Importa RouterModule e Routes do Angular Router
import { HomeComponent } from "./home.component"; // Importa o componente Home
import { NgModule } from "@angular/core"; // Importa o decorador NgModule

// Define as rotas do módulo
const routes: Routes = [
  {
    path: 'home', // Rota para o caminho 'home'
    component: HomeComponent // Associa a rota ao componente HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Importa as rotas definidas usando forChild
  exports: [RouterModule] // Exporta o RouterModule para que possa ser usado em outros módulos
})
export class HomeRoutingModule { }
