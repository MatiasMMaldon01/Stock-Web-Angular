import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/Usuario';
import { UsuarioServioService } from 'src/app/services/UsuarioServicio/usuario-servio.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuario: Usuario;
  contrasenaRep : string;

  constructor(private usuarioServicio: UsuarioServioService) { 
    this.usuario = {
      id : 0,
      email : '',
      contrasena : '',
      esAdmin : false,
      estaEliminado : false
    }
    this.contrasenaRep = "";
  }

  ngOnInit(): void {
  }

  crearUsuario = () =>{
    if(this.usuario.contrasena !== this.contrasenaRep){
      alert("Las contrasenas no coinciden. Intenete nuveamente");
      return;
    }

    this.usuarioServicio.signUp(this.usuario).subscribe(
      res =>{
        console.log(res);
        alert("Usuario creado correctamente");
      },
      error => console.log(error)
    )
  }
}
