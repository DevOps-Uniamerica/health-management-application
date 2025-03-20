import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RefeicaoModel } from '../models/refeicao-model';

@Injectable({
  providedIn: 'root'
})
export class RefeicaoService {
  private apiUrl = 'http://localhost:3000/refeicoes';

  constructor(private http: HttpClient) {}

  getAll(): Observable<RefeicaoModel[]> {
    return this.http.get<RefeicaoModel[]>(this.apiUrl);
  }

  create(refeicao: RefeicaoModel): Observable<RefeicaoModel> {
    return this.http.post<RefeicaoModel>(this.apiUrl, refeicao);
  }

  update(refeicao: RefeicaoModel): Observable<RefeicaoModel> {
    return this.http.put<RefeicaoModel>(`${this.apiUrl}/${refeicao.id}`, refeicao);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
