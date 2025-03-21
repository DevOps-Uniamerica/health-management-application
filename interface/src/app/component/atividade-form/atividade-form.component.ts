import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AtividadeService } from '../../service/atividade.service';
import { UsuarioService } from '../../service/usuario.service';

@Component({
  selector: 'app-atividade-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container mt-4">
      <h2>Adicionar Atividade</h2>
      <form [formGroup]="atividadeForm" (ngSubmit)="onSubmit()">
        <div class="mb-3">
          <label for="nome" class="form-label">Nome</label>
          <input id="nome" type="text" class="form-control" formControlName="nome">
        </div>
        <div class="mb-3">
          <label for="descricao" class="form-label">Descrição</label>
          <textarea id="descricao" class="form-control" formControlName="descricao"></textarea>
        </div>
        <div class="mb-3">
          <label for="tempo" class="form-label">Tempo (minutos)</label>
          <input id="tempo" type="number" class="form-control" formControlName="tempo">
        </div>
        <div class="mb-3">
          <label for="data" class="form-label">Data</label>
          <input id="data" type="date" class="form-control" formControlName="data">
        </div>
        <button type="submit" class="btn btn-primary" [disabled]="atividadeForm.invalid">Salvar</button>
      </form>
    </div>
  `
})
export class AtividadeFormComponent {
  atividadeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private atividadeService: AtividadeService,
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    this.atividadeForm = this.fb.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      tempo: [0, [Validators.required, Validators.min(0)]],
      data: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.atividadeForm.valid) {
      const atividade = this.atividadeForm.value;
      // Converter a data para ISO string para manter o padrão de armazenamento
      atividade.data = new Date(atividade.data).toISOString();

      // Cria a atividade
      this.atividadeService.create(atividade).subscribe((novaAtividade: any) => {
        // Após criar a atividade, busca o usuário com id 1
        this.usuarioService.getUser().subscribe(user => {
          // Verifica se o tempo da atividade é maior ou igual à meta de atividade
          if (atividade.tempo >= user.metaAtividade) {
            user.pontos += 10; // Adiciona 10 pontos
          }
          // Adiciona o id da nova atividade ao array de atividades do usuário
          user.atividades.push(novaAtividade.id);
          // Atualiza o usuário no banco de dados
          this.usuarioService.update(user).subscribe(() => {
            // Redireciona para a lista de atividades
            this.router.navigate(['/atividades']);
          });
        });
      });
    }
  }
}
