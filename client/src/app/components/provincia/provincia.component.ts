import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ProvinciaServicioService} from '../../services/ProvinciaServicio/provincia-servicio.service';
import { PaisServicioService} from '../../services/PaisServicio/pais-servicio.service';

@Component({
  selector: 'app-provincia',
  templateUrl: './provincia.component.html',
  styleUrls: ['./provincia.component.css']
})

export class ProvinciaComponent implements OnInit {

  provincias: any;
  provincia: any;
  paises: any;

  modificar : boolean = false;

  constructor(private router: Router, private activatedRouter : ActivatedRoute, private provinciaServicio: ProvinciaServicioService, private paisServicio: PaisServicioService) { 

    this.provincias = [];
    this.paises = [];
    
    this.provincia = {
      id : 0,
      descripcion: '',
      createdat: new Date,
      updatedat: new Date,
      pais_id: 0
    }
  }

  ngOnInit(): void {

    this.obtener();

    const params = this.activatedRouter.snapshot.params;
    if(params.id){
      this.provinciaServicio.obtenerPorId(params.id)
      .subscribe(
        res =>{
          console.log(res);
          this.provincia = res;
          this.modificar = true;
        },
        error => console.log(error) 
      )
    }

    this.paisServicio.obtener()
      .subscribe(
        res =>{
          console.log(res);
          this.paises = res;
        },
        error => console.log(error)
      )

  }

  agregarProvincia = () =>{
    delete this.provincia.updatedat;
    delete this.provincia.createdat;
    delete this.provincia.id;
    this.provinciaServicio.insertar(this.provincia)
      .subscribe(
        res => {
          console.log(res);
          this.obtener();
        },
        error => console.log(error)
      )
  }

  modificarProvincia = () =>{
    this.provinciaServicio.modificar(this.provincia.id, this.provincia)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/provincia']);
        },
        error => console.log(error)
      )
      this.modificar = false;
  }

  eliminarProvincia = (id: string) =>{
    this.provinciaServicio.eliminar(id)
      .subscribe(
        res =>{
          console.log(res);
          this.obtener();
        },
        error => console.log(error)
      )
  }

  obtener = () =>{

    this.provinciaServicio.obtener()
      .subscribe(
        res => {
          this.provincias = res;
          this.provincias = Object.values(this.provincias);
          console.log(this.provincias);
        },
        error => console.log(error)
      )
  }

}
