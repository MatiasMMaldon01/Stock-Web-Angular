import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ProvinciaServicioService } from '../../services/ProvinciaServicio/provincia-servicio.service';
import { DepartamentoService} from '../../services/DepartamentoServicio/departamento.service';
@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.css']
})
export class DepartamentoComponent implements OnInit {

  departamentos: any;
  departamento: any;
  provincias: any;

  modificar : boolean = false;

  constructor(private router: Router, private activatedRouter : ActivatedRoute, private departamentoServicio: DepartamentoService, private provinciaServicio: ProvinciaServicioService) { 

    this.departamentos = [];
    this.provincias = [];
    
    this.departamento = {
      id : 0,
      descripcion: '',
      createdat: new Date,
      updatedat: new Date,
      provincia_id: 0
    }
  }

  ngOnInit(): void {

    this.obtener();

    const params = this.activatedRouter.snapshot.params;
    if(params.id){
      this.departamentoServicio.obtenerPorId(params.id)
      .subscribe(
        res =>{
          console.log(res);
          this.departamento = res;
          this.modificar = true;
        },
        error => console.log(error) 
      )
    }

    this.provinciaServicio.obtener()
      .subscribe(
        res =>{
          console.log(res);
          this.provincias = res;
        },
        error => console.log(error)
      )

  }

  agregarDepartamento = () =>{
    delete this.departamento.updatedat;
    delete this.departamento.createdat;
    delete this.departamento.id;

    this.departamentoServicio.insertar(this.departamento)
      .subscribe(
        res => {
          console.log(res);
          this.obtener();
        },
        error => console.log(error)
      )
  }

  modificarDepartamento = () =>{
    this.departamentoServicio.modificar(this.departamento.id, this.departamento)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/departamento']);
        },
        error => console.log(error)
      )
      this.modificar = false;
  }

  eliminarDepartamento = (id: string) =>{
    this.departamentoServicio.eliminar(id)
      .subscribe(
        res =>{
          console.log(res);
          this.obtener();
        },
        error => console.log(error)
      )
  }

  obtener = () =>{

    this.departamentoServicio.obtener()
      .subscribe(
        res => {
          this.departamentos = res;
          this.departamentos = Object.values(this.departamentos);
          console.log(this.departamentos);
        },
        error => console.log(error)
      )
  }
}
