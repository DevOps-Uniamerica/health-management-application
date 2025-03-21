import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AtividadeService } from '../../service/atividade.service';
import { AtividadeModel } from '../../models/atividade-model';


@Component({
  selector: 'app-atividade-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="container mt-4">
      <h2>Lista de Atividades</h2>
      <a routerLink="/nova-atividade" class="btn btn-success mb-3">Nova Atividade</a>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Tempo (minutos)</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let atividade of atividades">
            <td>{{atividade.id}}</td>
            <td>
              <ng-container *ngIf="editingAtividadeId === atividade.id; else displayNome">
                <input [(ngModel)]="editingAtividade.nome" class="form-control">
              </ng-container>
              <ng-template #displayNome>
                {{atividade.nome}}
              </ng-template>
            </td>
            <td>
              <ng-container *ngIf="editingAtividadeId === atividade.id; else displayDescricao">
                <input [(ngModel)]="editingAtividade.descricao" class="form-control">
              </ng-container>
              <ng-template #displayDescricao>
                {{atividade.descricao}}
              </ng-template>
            </td>
            <td>
              <ng-container *ngIf="editingAtividadeId === atividade.id; else displayTempo">
                <input type="number" [(ngModel)]="editingAtividade.tempo" class="form-control">
              </ng-container>
              <ng-template #displayTempo>
                {{atividade.tempo}}
              </ng-template>
            </td>
            <td>
              <ng-container *ngIf="editingAtividadeId === atividade.id; else displayData">
                <input type="date" [(ngModel)]="editingAtividade.data" class="form-control">
              </ng-container>
              <ng-template #displayData>
                {{atividade.data | date:'shortDate'}}
              </ng-template>
            </td>
            <td>
              <ng-container *ngIf="editingAtividadeId === atividade.id; else actionButtons">
                <button class="btn btn-primary btn-sm" (click)="saveEditing()">Salvar</button>
                <button class="btn btn-secondary btn-sm" (click)="cancelEditing()">Cancelar</button>
              </ng-container>
              <ng-template #actionButtons>
                <button class="btn btn-warning btn-sm" (click)="startEditing(atividade)">Editar</button>
                <button class="btn btn-danger btn-sm" (click)="deleteAtividade(atividade.id!)">Excluir</button>
              </ng-template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class AtividadeListComponent implements OnInit {
  atividades: AtividadeModel[] = [];
  editingAtividadeId: string | null = null;
  editingAtividade!: AtividadeModel;

  constructor(private atividadeService: AtividadeService) {}

  ngOnInit(): void {
    this.loadAtividades();
  }

  loadAtividades(): void {
    this.atividadeService.getAll().subscribe(data => {
      this.atividades = data;
    });
  }

  deleteAtividade(id: string): void {
    if (confirm('Deseja realmente excluir esta atividade?')) {
      // Caso o método delete da service espere um número, converta se necessário
      this.atividadeService.delete(+id).subscribe(() => {
        this.loadAtividades();
      });
    }
  }

  startEditing(atividade: AtividadeModel): void {
    this.editingAtividadeId = atividade.id || null;
    // Cria uma cópia para edição sem alterar a lista original
    this.editingAtividade = { ...atividade };
  }

  cancelEditing(): void {
    this.editingAtividadeId = null;
  }

  saveEditing(): void {
    if (this.editingAtividade) {
      this.atividadeService.update(this.editingAtividade).subscribe(() => {
        this.loadAtividades();
        this.cancelEditing();
      });
    }
  }
}
