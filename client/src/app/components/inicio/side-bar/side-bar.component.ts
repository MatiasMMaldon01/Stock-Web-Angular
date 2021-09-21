import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/Cliente';
import { CargarScriptsService } from 'src/app/services/CargarScriptsServicio/cargar-scripts.service';

import { ClienteServicioService } from 'src/app/services/ClienteServicio/cliente-servicio.service';
import { UsuarioServioService } from 'src/app/services/UsuarioServicio/usuario-servio.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  cliente: Cliente;
  clienteIngresado : string;

  constructor(private router: Router, private clienteServicio: ClienteServicioService, private cargarScripts:CargarScriptsService,
    private usuarioServicio: UsuarioServioService ) {

    this.clienteIngresado = "";

    this.cliente = {
      id : 0,
      nombre : '',
      apellido : 'Usuario No Ingresado',
      direccion : '',
      celular : '',
      dni : '',
      estaEliminado : false,
      usuario_id : 0,
      Usuario:{
        email:"",
        contrasena: "",
        esAdmin:false,
        estaEliminado:false
      },
      pais_id : 1,
      provincia_id : 1,
      departamento_id : 1,
      localidad_id : 1
    }

    this.cargarScripts.CargarScript(["side-bar"]);

  }

  ngOnInit(): void {
    this.usuarioServicio.verificarToken().subscribe(
      (res:any) =>{ 
        this.cliente = res;
      },
      error => console.log(error)
    )
  }


  abrirCarrito = () =>{
    this.router.navigate(['/carrito']);
  }

  cerrarSesion = () =>{
    localStorage.clear();
    this.router.navigate(['']);
  }
}
