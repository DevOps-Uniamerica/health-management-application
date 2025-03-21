import { Routes } from '@angular/router';
import { RefeicaoListComponent } from './component/refeicao-list/refeicao-list.component';
import { RefeicaoFormComponent } from './component/refeicao-form/refeicao-form.component';
import { ProdutosListComponent } from './component/produtos-list/produtos-list.component';
import { AtividadeListComponent } from './component/atividade-list/atividade-list.component';
import { AtividadeFormComponent } from './component/atividade-form/atividade-form.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'refeicoes', pathMatch: 'full' },
  { path: 'refeicoes', component: RefeicaoListComponent, data: { nome: "Refeições" } },
  { path: 'nova-refeicao', component: RefeicaoFormComponent },
  { path: 'produtos', component: ProdutosListComponent, data:   { nome: "Produtos" } },

  // Rotas para Atividades
  { path: 'atividades', component: AtividadeListComponent,data:   { nome: "Atividades" } },
  { path: 'nova-atividade', component: AtividadeFormComponent },
  { path: 'editar-atividade/:id', component: AtividadeFormComponent }
];
