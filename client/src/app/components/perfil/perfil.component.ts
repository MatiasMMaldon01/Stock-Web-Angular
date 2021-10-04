import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/Cliente';
import { Departamento } from 'src/app/models/Departamento';
import { Localidad } from 'src/app/models/Localidad';
import { Pais } from 'src/app/models/Pais';
import { Provincia } from 'src/app/models/Provincia';
import { ClienteServicioService } from 'src/app/services/ClienteServicio/cliente-servicio.service';
import { DepartamentoService } from 'src/app/services/DepartamentoServicio/departamento.service';
import { LocalidadService } from 'src/app/services/LocalidadServicio/localidad.service';
import { PaisServicioService } from 'src/app/services/PaisServicio/pais-servicio.service';
import { ProvinciaServicioService } from 'src/app/services/ProvinciaServicio/provincia-servicio.service';
import { UsuarioServioService } from 'src/app/services/UsuarioServicio/usuario-servio.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  cliente : Cliente;

  paises : Pais[];
  provincias : Provincia[];
  departamentos : Departamento[];
  localidades : Localidad[];

  provinciaSeleccionadas : Provincia[];
  departamentoSeleccionados : Departamento[];
  localidadSeleccionadas : Localidad[];
  
  constructor(private router: Router, private paisServicio : PaisServicioService, private provinciaServicio  : ProvinciaServicioService, private departamentoServicio : DepartamentoService,
    private localidadServicio : LocalidadService, private clienteServicio : ClienteServicioService, private usuarioServicio: UsuarioServioService) { 
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
  }

  ngOnInit(): void {
    this.usuarioServicio.verificarToken().subscribe(
      (res:any) =>{ 
        this.cliente = res;
        console.log(this.cliente);
      },
      error => console.log(error)
    )

    // ======================== Cargar los Select ======================== //
     
    this.paisServicio.obtener().subscribe(
      res => {
        this.paises = Object.values(res);
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

  modificarCliente = () =>{
    this.clienteServicio.modificar(this.cliente.id, this.cliente).subscribe(
      res=>{
        console.log(res);
        this.router.navigate(['']);
      },
      error=> console.log(error)
    );
  }
}
