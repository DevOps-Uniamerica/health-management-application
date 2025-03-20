import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsuarioService } from '../../service/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { appRoutes } from '../../app.routes';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  usuarioService = inject(UsuarioService);

  usuario!: Usuario;

  rotas = appRoutes;

  ngOnInit() {
    console.log(this.rotas)
    this.usuarioService.getUser().subscribe(usuario => {
      this.usuario = usuario;
    });
  }
}
