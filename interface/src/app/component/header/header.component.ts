import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsuarioService } from '../../service/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  usuarioService = inject(UsuarioService);

  usuario!: Usuario;

  ngOnInit() {
    this.usuarioService.getUser().subscribe(usuario => {
      this.usuario = usuario;
    });
  }

}
