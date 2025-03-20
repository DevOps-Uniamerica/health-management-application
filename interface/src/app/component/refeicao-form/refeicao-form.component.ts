import { Component } from '@angular/core'; 
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RefeicaoService } from '../../service/refeicao-service.service';
import { UsuarioService } from '../../service/usuario.service';

@Component({
  selector: 'app-refeicao-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container mt-4">
      <h2>Adicionar Refeição</h2>
      <form [formGroup]="refeicaoForm" (ngSubmit)="onSubmit()">
        <div class="mb-3">
          <label for="nome" class="form-label">Nome</label>
          <input id="nome" type="text" class="form-control" formControlName="nome">
        </div>
        <div class="mb-3">
          <label for="descricao" class="form-label">Descrição</label>
          <textarea id="descricao" class="form-control" formControlName="descricao"></textarea>
        </div>
        <div class="mb-3">
          <label for="calorias" class="form-label">Calorias</label>
          <input id="calorias" type="number" class="form-control" formControlName="calorias">
        </div>
        <div class="mb-3">
          <label for="data" class="form-label">Data</label>
          <input id="data" type="date" class="form-control" formControlName="data">
        </div>
        <button type="submit" class="btn btn-primary" [disabled]="refeicaoForm.invalid">Salvar</button>
      </form>
    </div>
  `
})
export class RefeicaoFormComponent {
  refeicaoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private refeicaoService: RefeicaoService,
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    this.refeicaoForm = this.fb.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      calorias: [0, [Validators.required, Validators.min(0)]],
      data: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.refeicaoForm.valid) {
      const refeicao = this.refeicaoForm.value;
      // Converter a string da data para um objeto Date
      refeicao.data = new Date(refeicao.data);
  
      // Cria a refeição
      this.refeicaoService.create(refeicao).subscribe((novaRefeicao: any) => {
        // Após criar a refeição, busca o usuário com id 1
        this.usuarioService.getUser().subscribe(user => {
          // Verifica se as calorias são iguais ou superiores à meta de alimentação
          if (refeicao.calorias >= user.metaAlimentação) {
            user.pontos += 1200; // Adiciona 10 pontos
          }
          // Adiciona o id da nova refeição ao array de refeições do usuário
          user.refeicoes.push(novaRefeicao.id);
          // Atualiza o usuário no banco de dados
          this.usuarioService.update(user).subscribe(() => {
            // Redireciona para a lista de refeições
            this.router.navigate(['/refeicoes']);
          });
        });
      });
    }
  }
  
}
