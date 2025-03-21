import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AtividadeModel } from '../models/atividade-model';

@Injectable({
  providedIn: 'root'
})
export class AtividadeService {
  private apiUrl = 'http://localhost:3000/atividades';

  constructor(private http: HttpClient) {}

  getAll(): Observable<AtividadeModel[]> {
    return this.http.get<AtividadeModel[]>(this.apiUrl);
  }

  create(atividade: AtividadeModel): Observable<AtividadeModel> {
    return this.http.post<AtividadeModel>(this.apiUrl, atividade);
  }

  update(atividade: AtividadeModel): Observable<AtividadeModel> {
    return this.http.put<AtividadeModel>(`${this.apiUrl}/${atividade.id}`, atividade);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
