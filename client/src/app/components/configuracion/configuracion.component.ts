import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ChildActivationStart } from '@angular/router';

import { ConfiguracionService } from 'src/app/services/ConfiguracionServicio/configuracion.service';
import { PaisServicioService } from 'src/app/services/PaisServicio/pais-servicio.service';
import { ProvinciaServicioService } from 'src/app/services/ProvinciaServicio/provincia-servicio.service';
import { DepartamentoService } from 'src/app/services/DepartamentoServicio/departamento.service';
import { LocalidadService } from 'src/app/services/LocalidadServicio/localidad.service';

import { Provincia } from 'src/app/models/Provincia';
import { Departamento } from 'src/app/models/Departamento';
import { Localidad } from 'src/app/models/Localidad';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {

  configuracion : any;
  paises : any;
  provincias : Provincia[];
  departamentos : Departamento[];
  localidades : Localidad[];

  provinciaSeleccionadas : Provincia[];
  departamentoSeleccionados : Departamento[];
  localidadSeleccionadas : Localidad[];

  modificar : boolean = false;

  constructor(private activatedRouter: ActivatedRoute,private router: Router, private configuracionServicio: ConfiguracionService,
    private paisServicio : PaisServicioService, private provinciaServicio  : ProvinciaServicioService, private departamentoServicio : DepartamentoService,
    private localidadServicio : LocalidadService ) {
    
    this.paises = [];
    this.provincias = [];
    this.departamentos = [];
    this.localidades = [];

    this.provinciaSeleccionadas = [];
    this.departamentoSeleccionados = [];
    this.localidadSeleccionadas = [];


    this.configuracion = {
      id : 0,
      razonSocial: '',
      cuil : '',
      contador_id : 1,
      Contador:{contadorFacturas: 0},
      direccion : '',
      celular : '',
      estaEliminado : false,
      createdat : new Date,
      updatedat : new Date,
      pais_id : 0,
      provincia_id : 0,
      departamento_id : 0,
      localidad_id : 0
    };
  }

  ngOnInit(): void {

    this.configuracionServicio.obtener()
    .subscribe(
      res =>{
        if(Object.keys(res).length === 0) return;

        console.log(res);
        this.configuracion = Object.values(res)[0];
        this.modificar = true;
        this.paisSeleccionado(this.configuracion.pais_id);
      },
      error => console.log(error) 
    )

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
        this.provinciaSeleccionadas = this.provincias.filter((item) => item.pais_id == this.configuracion.pais_id);
        console.log(this.provincias);
      },
      error => console.log(error)
    );

    this.departamentoServicio.obtener().subscribe(
      res => {
        this.departamentos = Object.values(res);
        this.departamentoSeleccionados = this.departamentos.filter((item) => item.provincia_id == this.configuracion.provincia_id);
        console.log(this.departamentoSeleccionados);
      },
      error => console.log(error)
    );

    this.localidadServicio.obtener().subscribe(
      res => {
        this.localidades = Object.values(res);
        this.localidadSeleccionadas = this.localidades.filter((item) => item.departamento_id == this.configuracion.departamento_id);
        console.log(this.localidadSeleccionadas);
      },
      error => console.log(error)
    );

  }

  agregarConfiguracion = () =>{
    delete this.configuracion.updatedat;
    delete this.configuracion.createdat;
    delete this.configuracion.id;

    this.configuracionServicio.insertar(this.configuracion)
    .subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/configuracion']);
      },
      error => console.log(error)
    )
    console.log(this.configuracion);
  }

  modificarConfiguracion = () => {
    delete this.configuracion.updatedat;
    delete this.configuracion.createdat;
    
    this.configuracionServicio.modificar(this.configuracion.id, this.configuracion).subscribe(
      res =>{
        console.log(res);
        this.router.navigate(['/configuracion']);
      },
      error => console.log(error)
    )
  }

  paisSeleccionado = (id : any) =>{
    this.provinciaSeleccionadas = this.provincias.filter((item) => item.pais_id == id);
    console.log(this.provinciaSeleccionadas);
    this.provinciaSeleccionado(this.configuracion.provincia_id);
  }

  provinciaSeleccionado = (id : any) =>{
    this.departamentoSeleccionados = this.departamentos.filter((item) => item.provincia_id == id);
    console.log(this.departamentoSeleccionados);
    this.departamentoSeleccionado(this.configuracion.departamento_id);
  }

  departamentoSeleccionado = (id: any) =>{
    console.log(this.configuracion)
    console.log(id = this.configuracion.departamento_id);
    this.localidadSeleccionadas = this.localidades.filter((item) => item.departamento_id == id);
    console.log(this.localidadSeleccionadas)
  }

}
