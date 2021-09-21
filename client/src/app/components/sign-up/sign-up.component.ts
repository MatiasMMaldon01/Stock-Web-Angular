import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PaisServicioService } from 'src/app/services/PaisServicio/pais-servicio.service';
import { ProvinciaServicioService } from 'src/app/services/ProvinciaServicio/provincia-servicio.service';
import { DepartamentoService } from 'src/app/services/DepartamentoServicio/departamento.service';
import { LocalidadService } from 'src/app/services/LocalidadServicio/localidad.service';
import { ClienteServicioService } from 'src/app/services/ClienteServicio/cliente-servicio.service';
import { UsuarioServioService } from 'src/app/services/UsuarioServicio/usuario-servio.service';

import { Cliente } from 'src/app/models/Cliente';
import { Departamento } from 'src/app/models/Departamento';
import { Localidad } from 'src/app/models/Localidad';
import { Provincia } from 'src/app/models/Provincia';
import { Usuario } from 'src/app/models/Usuario';
import { ConditionalExpr } from '@angular/compiler';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  cliente : any;
  usuario : any;
  userClient : any;

  paises : any;
  provincias : Provincia[];
  departamentos : Departamento[];
  localidades : Localidad[];

  provinciaSeleccionadas : Provincia[];
  departamentoSeleccionados : Departamento[];
  localidadSeleccionadas : Localidad[];
  
  constructor(private activatedRouter: ActivatedRoute, private router: Router, private paisServicio : PaisServicioService, private provinciaServicio  : ProvinciaServicioService, private departamentoServicio : DepartamentoService,
    private localidadServicio : LocalidadService, private usuarioServicio : UsuarioServioService, private clienteServicio : ClienteServicioService) { 
    this.paises = [];
    this.provincias = [];
    this.departamentos = [];
    this.localidades = [];

    this.provinciaSeleccionadas = [];
    this.departamentoSeleccionados = [];
    this.localidadSeleccionadas = [];

    this.cliente = {
      id : 0,
      nombre : '',
      apellido : '',
      direccion : '',
      celular : '',
      dni : '',
      estaEliminado : false,
      usuario_id : 0,
      pais_id : 1,
      provincia_id : 1,
      departamento_id : 1,
      localidad_id : 1
    }

    this.usuario = {
      id : 0,
      email : '',
      contrasena : '',
      contrasenaRep : '',
      esAdmin : false
    }
    
    this.userClient = { cliente : {}, usuario: {}};
  }

  ngOnInit(): void {

    // ======================== Cargar los Select ======================== //
     
    this.paisServicio.obtener().subscribe(
      res => {
        this.paises = res;
        console.log(Array.from(this.paises));
      },
      error => console.log(error)
    );

    this.provinciaServicio.obtener().subscribe(
      res => {
        this.provincias = Object.values(res);
        this.provinciaSeleccionadas = this.provincias.filter((item) => item.pais_id == this.cliente.pais_id);
        console.log(this.provincias);
      },
      error => console.log(error)
    );

    this.departamentoServicio.obtener().subscribe(
      res => {
        this.departamentos = Object.values(res);
        this.departamentoSeleccionados = this.departamentos.filter((item) => item.provincia_id == this.cliente.provincia_id);
        console.log(this.departamentos);
      },
      error => console.log(error)
    );

    this.localidadServicio.obtener().subscribe(
      res => {
        this.localidades = Object.values(res);
        this.localidadSeleccionadas = this.localidades.filter((item) => item.departamento_id == this.cliente.departamento_id);
        console.log(this.localidades);
      },
      error => console.log(error)
    );
  }


  registrarCliente = () =>{
    delete this.cliente.id;

    if(this.usuario.contrasena === this.usuario.contrasenaRep){
      delete this.usuario.contrasenaRep;
      delete this.usuario.id;
      this.userClient.cliente = this.cliente;
      this.userClient.usuario = this.usuario;
      this.clienteServicio.insertar(this.userClient).subscribe(
        res =>{
          console.log(res);
          this.router.navigate(['']);
        },
        error => console.log(error)
      )
     
    }else{
      alert("La contrasena no es la misma");
      return;
    }
      
  }

  paisSeleccionado = (id : any) =>{
    this.provinciaSeleccionadas = this.provincias.filter((item) => item.pais_id == id);
    console.log(this.provinciaSeleccionadas);
    this.provinciaSeleccionado(this.cliente.provincia_id);
  }

  provinciaSeleccionado = (id : any) =>{
    this.departamentoSeleccionados = this.departamentos.filter((item) => item.provincia_id == id);
    console.log(this.departamentoSeleccionados);
    this.departamentoSeleccionado(this.cliente.departamento_id);
  }

  departamentoSeleccionado = (id : any) =>{
    this.localidadSeleccionadas = this.localidades.filter((item) => item.departamento_id == id);
    console.log(this.localidadSeleccionadas)
  }
}
