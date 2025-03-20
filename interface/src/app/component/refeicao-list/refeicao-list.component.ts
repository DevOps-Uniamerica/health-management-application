import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RefeicaoService } from '../../service/refeicao-service.service';
import { RefeicaoModel } from '../../models/refeicao-model';

@Component({
  selector: 'app-refeicao-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="container mt-4">
      <h2>Lista de Refeições</h2>
      <a routerLink="/nova-refeicao" class="btn btn-success mb-3">Nova Refeição</a>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Calorias</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let refeicao of refeicoes">
            <td>{{refeicao.id}}</td>
            <td>
              <ng-container *ngIf="editingRefeicaoId === refeicao.id; else displayNome">
                <input [(ngModel)]="editingRefeicao.nome" class="form-control">
              </ng-container>
              <ng-template #displayNome>
                {{refeicao.nome}}
              </ng-template>
            </td>
            <td>
              <ng-container *ngIf="editingRefeicaoId === refeicao.id; else displayDescricao">
                <input [(ngModel)]="editingRefeicao.descricao" class="form-control">
              </ng-container>
              <ng-template #displayDescricao>
                {{refeicao.descricao}}
              </ng-template>
            </td>
            <td>
              <ng-container *ngIf="editingRefeicaoId === refeicao.id; else displayCalorias">
                <input type="number" [(ngModel)]="editingRefeicao.calorias" class="form-control">
              </ng-container>
              <ng-template #displayCalorias>
                {{refeicao.calorias}}
              </ng-template>
            </td>
            <td>
              <ng-container *ngIf="editingRefeicaoId === refeicao.id; else displayData">
                <input type="date" [(ngModel)]="editingRefeicao.data" class="form-control">
              </ng-container>
              <ng-template #displayData>
                {{refeicao.data | date:'shortDate'}}
              </ng-template>
            </td>
            <td>
              <ng-container *ngIf="editingRefeicaoId === refeicao.id; else actionButtons">
                <button class="btn btn-primary btn-sm" (click)="saveEditing()">Salvar</button>
                <button class="btn btn-secondary btn-sm" (click)="cancelEditing()">Cancelar</button>
              </ng-container>
              <ng-template #actionButtons>
                <button class="btn btn-warning btn-sm" (click)="startEditing(refeicao)">Editar</button>
                <button class="btn btn-danger btn-sm" (click)="deleteRefeicao(refeicao.id!)">Excluir</button>
              </ng-template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class RefeicaoListComponent implements OnInit {
  refeicoes: RefeicaoModel[] = [];
  editingRefeicaoId: number | null = null;
  editingRefeicao!: RefeicaoModel;

  constructor(private refeicaoService: RefeicaoService) {}

  ngOnInit() {
    this.loadRefeicoes();
  }

  loadRefeicoes() {
    this.refeicaoService.getAll().subscribe(data => {
      this.refeicoes = data;
    });
  }

  deleteRefeicao(id: number) {
    if (confirm('Deseja realmente excluir esta refeição?')) {
      this.refeicaoService.delete(id).subscribe(() => {
        this.loadRefeicoes();
      });
    }
  }

  startEditing(refeicao: RefeicaoModel) {
    this.editingRefeicaoId = refeicao.id || null;
    // Cria uma cópia para edição sem alterar a lista original antes de salvar
    this.editingRefeicao = { ...refeicao };
  }

  cancelEditing() {
    this.editingRefeicaoId = null;
  }

  saveEditing() {
    if (this.editingRefeicao) {
      this.refeicaoService.update(this.editingRefeicao).subscribe(() => {
        this.loadRefeicoes();
        this.cancelEditing();
      });
    }
  }
}
