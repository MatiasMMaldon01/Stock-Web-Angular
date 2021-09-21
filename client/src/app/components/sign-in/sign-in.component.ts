import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ClienteServicioService } from 'src/app/services/ClienteServicio/cliente-servicio.service';

import { UsuarioServioService } from 'src/app/services/UsuarioServicio/usuario-servio.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  usuario : any;

  constructor(private usuarioServicio: UsuarioServioService, private router: Router) { 
    this.usuario = {
      id : 0,
      email : '',
      contrasena : '',
      esAdmin : false
    }
  }

  ngOnInit(): void {


  }

  validarUsuario = () =>{
    let array = [];
    delete this.usuario.id;
    this.usuarioServicio.signIn(this.usuario).subscribe(
      res=>{
        array = res.toString().split(" ");
        console.log(array);

        if( array[0] === "admin"){
          localStorage.setItem("admin", array[1]);
          this.router.navigate(["/productos"]);
        }else{
          localStorage.setItem("usuario", array[1]);
          this.router.navigate(['']);
        }
      },
      error => console.log(error)
    )
  }

}
