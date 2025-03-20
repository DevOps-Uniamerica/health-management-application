import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-produtos-list',
  standalone: true,
  imports: [CommonModule], // <-- Adicionando CommonModule para usar *ngIf e *ngFor
  templateUrl: './produtos-list.component.html',
  styleUrls: ['./produtos-list.component.css']
})
export class ProdutosListComponent implements OnInit {
  usuario: any;
  produtos: any[] = [];
  pontosUsuario: number = 0;
  usuarioId: number = 1;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.http.get(`http://localhost:3000/usuarios/${this.usuarioId}`).subscribe({
      next: (usuario: any) => {
        this.usuario = usuario;
        this.pontosUsuario = usuario.pontos;
      },
      error: (error) => console.error('Erro ao buscar usuário:', error)
    });

    this.http.get<any[]>('http://localhost:3000/produtos').subscribe({
      next: (produtos) => {
        if (!Array.isArray(produtos)) {
          console.error('Erro: resposta inesperada da API', produtos);
          return;
        }
        this.produtos = produtos;
        console.log('Produtos carregados:', this.produtos);
      },
      error: (error) => console.error('Erro ao buscar produtos:', error)
    });
  }

  comprarProduto(produtoId: number): void {
    this.router.navigate([`/comprar/${produtoId}`]);
  }
}
