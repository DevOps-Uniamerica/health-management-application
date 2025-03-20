import { Routes } from '@angular/router';
import { RefeicaoListComponent } from './component/refeicao-list/refeicao-list.component';
import { RefeicaoFormComponent } from './component/refeicao-form/refeicao-form.component';
import { ProdutosListComponent } from './component/produtos-list/produtos-list.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'refeicoes', pathMatch: 'full' },
  { path: 'refeicoes', component: RefeicaoListComponent, data: { nome: "Refeições" } },
  { path: 'nova-refeicao', component: RefeicaoFormComponent },
  { path: 'produtos', component: ProdutosListComponent, data:   { nome: "Produtos" } },


];
