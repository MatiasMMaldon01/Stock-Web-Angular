import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { PaisServicioService } from '../../services/PaisServicio/pais-servicio.service';

@Component({
  selector: 'app-pais',
  templateUrl: './pais.component.html',
  styleUrls: ['./pais.component.css']
})
export class PaisComponent implements OnInit {

  paises: any;
  pais: any;

  modificar : boolean = false;

  constructor(private router: Router, private activatedRouter : ActivatedRoute, private paisServicio: PaisServicioService) { 

    this.paises = [];
    
    this.pais = {
      id : 0,
      descripcion: ''
    }
  }

  ngOnInit(): void {

    this.obtener();

    const params = this.activatedRouter.snapshot.params;
    if(params.id){
      this.paisServicio.obtenerPorId(params.id)
      .subscribe(
        res =>{
          console.log(res);
          this.pais = res;
          this.modificar = true;
        },
        error => console.log(error) 
      )
    }
  }

  agregarPais = () =>{
    this.paisServicio.insertar(this.pais)
      .subscribe(
        res => {
          console.log(res);
          this.obtener();
        },
        error => console.log(error)
      )
  }

  modificarPais = () =>{
    this.paisServicio.modificar(this.pais.id, this.pais)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/pais']);
        },
        error => console.log(error)
      )
      this.modificar = false;
  }

  eliminarPais = (id: string) =>{
    this.paisServicio.eliminar(id)
      .subscribe(
        res =>{
          console.log(res);
          this.obtener();
        },
        error => console.log(error)
      )
  }

  obtener = () =>{

    this.paisServicio.obtener()
      .subscribe(
        res => {
          this.paises = res;
          this.paises = Object.values(this.paises);
          console.log(this.paises);
        },
        error => console.log(error)
      )
  }

}
