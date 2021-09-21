import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { RubroService } from '../../services/RubroServicio/rubro.service';

@Component({
  selector: 'app-rubro',
  templateUrl: './rubro.component.html',
  styleUrls: ['./rubro.component.css']
})
export class RubroComponent implements OnInit {
  rubros: any;
  rubro: any;

  modificar : boolean = false;

  constructor(private router: Router, private activatedRouter : ActivatedRoute, private rubroServicio: RubroService) { 

    this.rubros = [];
    
    this.rubro = {
      id : 0,
      descripcion: ''
    }
  }

  ngOnInit(): void {

    this.obtener();

    const params = this.activatedRouter.snapshot.params;
    if(params.id){
      this.rubroServicio.obtenerPorId(params.id)
      .subscribe(
        res =>{
          console.log(res);
          this.rubro = res;
          this.modificar = true;
        },
        error => console.log(error) 
      )
    }
  }

  agregarRubro = () =>{
    this.rubroServicio.insertar(this.rubro)
      .subscribe(
        res => {
          console.log(res);
          this.obtener();
        },
        error => console.log(error)
      )
  }

  modificarRubro = () =>{
    this.rubroServicio.modificar(this.rubro.id, this.rubro)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/rubro']);
        },
        error => console.log(error)
      )
      this.modificar = false;
  }

  eliminarRubro = (id: string) =>{
    this.rubroServicio.eliminar(id)
      .subscribe(
        res =>{
          console.log(res);
          this.obtener();
        },
        error => console.log(error)
      )
  }

  obtener = () =>{

    this.rubroServicio.obtener()
      .subscribe(
        res => {
          this.rubros = res;
          console.log(this.rubros);
        },
        error => console.log(error)
      )
  }

}
