import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:3000/usuarios';

  constructor(private http: HttpClient) {}

  getUser(): Observable<Usuario> {
    return this.http.get<Usuario>(this.apiUrl+"/1");
  }

  update(usuario: Usuario) {
    return this.http.put<Usuario>(`${this.apiUrl}/${usuario.id}`, usuario);
  }
}
