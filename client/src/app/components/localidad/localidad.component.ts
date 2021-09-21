import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { DepartamentoService} from '../../services/DepartamentoServicio/departamento.service';
import { LocalidadService } from '../../services/LocalidadServicio/localidad.service';
@Component({
  selector: 'app-localidad',
  templateUrl: './localidad.component.html',
  styleUrls: ['./localidad.component.css']
})
export class LocalidadComponent implements OnInit {

  departamentos: any;
  localidad: any;
  localidades: any;

  modificar : boolean = false;

  constructor(private router: Router, private activatedRouter : ActivatedRoute, private departamentoServicio: DepartamentoService, private localidadServicio:LocalidadService) { 

    this.departamentos = [];
    this.localidades = [];
    
    this.localidad = {
      id : 0,
      descripcion: '',
      createdat: new Date,
      updatedat: new Date,
      departamento_id: 0
    }
  }

  ngOnInit(): void {

    this.obtener();

    const params = this.activatedRouter.snapshot.params;
    if(params.id){
      this.localidadServicio.obtenerPorId(params.id)
      .subscribe(
        res =>{
          console.log(res);
          this.localidad = res;
          this.modificar = true;
        },
        error => console.log(error) 
      )
    }

    this.departamentoServicio.obtener()
      .subscribe(
        res =>{
          console.log(res);
          this.departamentos = res;
        },
        error => console.log(error)
      )

  }

  agregarLocalidad = () =>{
    delete this.localidad.updatedat;
    delete this.localidad.createdat;
    delete this.localidad.id;

    this.localidadServicio.insertar(this.localidad)
      .subscribe(
        res => {
          console.log(res);
          this.obtener();
        },
        error => console.log(error)
      )
  }

  modificarLocalidad = () =>{

    this.localidadServicio.modificar(this.localidad.id, this.localidad)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/localidad']);
        },
        error => console.log(error)
      )
      this.modificar = false;
  }

  eliminarLocalidad = (id: string) =>{
    this.localidadServicio.eliminar(id)
      .subscribe(
        res =>{
          console.log(res);
          this.obtener();
        },
        error => console.log(error)
      )
  }

  obtener = () =>{

    this.localidadServicio.obtener()
      .subscribe(
        res => {
          this.localidades = res;
          this.localidades = Object.values(this.localidades);
          console.log(this.localidades);
        },
        error => console.log(error)
      )
  }
}