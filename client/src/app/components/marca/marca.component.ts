import { Component, OnInit } from '@angular/core';
import { __core_private_testing_placeholder__ } from '@angular/core/testing';
import { ActivatedRoute, Router} from '@angular/router';

import { MarcaService} from '../../services/MarcaServicio/marca.service';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.css']
})

export class MarcaComponent implements OnInit {

  marcas: any;
  marca: any;

  modificar : boolean = false;

  constructor(private router: Router, private activatedRouter : ActivatedRoute, private marcaServicio: MarcaService) { 

    this.marcas = [];
    
    this.marca = {
      id : 0,
      descripcion: ''
    }
  }

  ngOnInit(): void {

    this.obtener();

    const params = this.activatedRouter.snapshot.params;
    if(params.id){
      this.marcaServicio.obtenerPorId(params.id)
      .subscribe(
        res =>{
          console.log(res);
          this.marca = res;
          this.modificar = true;
        },
        error => console.log(error) 
      )
    }
  }

  agregarMarca = () =>{
    this.marcaServicio.insertar(this.marca)
      .subscribe(
        res => {
          console.log(res);
          this.obtener();
        },
        error => console.log(error)
      )
  }

  modificarMarca = () =>{
    this.marcaServicio.modificar(this.marca.id, this.marca)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/marca']);
        },
        error => console.log(error)
      )
      this.modificar = false;
  }

  eliminarMarca = (id: string) =>{
    this.marcaServicio.eliminar(id)
      .subscribe(
        res =>{
          console.log(res);
          this.obtener();
        },
        error => console.log(error)
      )
  }

  obtener = () =>{

    this.marcaServicio.obtener()
      .subscribe(
        res => {
          this.marcas = res;
          console.log(this.marcas);
        },
        error => console.log(error)
      )
  }

}
