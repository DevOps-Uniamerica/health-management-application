import { Routes } from '@angular/router';
import { RefeicaoListComponent } from './component/refeicao-list/refeicao-list.component';
import { RefeicaoFormComponent } from './component/refeicao-form/refeicao-form.component';
import { AtividadeListComponent } from './component/atividade-list/atividade-list.component';
import { AtividadeFormComponent } from './component/atividade-form/atividade-form.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'refeicoes', pathMatch: 'full' },
  { path: 'refeicoes', component: RefeicaoListComponent },
  { path: 'nova-refeicao', component: RefeicaoFormComponent },
  // Rotas para Atividades
  { path: 'atividades', component: AtividadeListComponent },
  { path: 'nova-atividade', component: AtividadeFormComponent },
  { path: 'editar-atividade/:id', component: AtividadeFormComponent }
];
