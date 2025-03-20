import { Routes } from '@angular/router';
import { RefeicaoListComponent } from './component/refeicao-list/refeicao-list.component';
import { RefeicaoFormComponent } from './component/refeicao-form/refeicao-form.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'refeicoes', pathMatch: 'full' },
  { path: 'refeicoes', component: RefeicaoListComponent },
  { path: 'nova-refeicao', component: RefeicaoFormComponent },
];
