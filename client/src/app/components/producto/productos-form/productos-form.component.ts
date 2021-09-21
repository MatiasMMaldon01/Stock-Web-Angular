import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';

import { Producto } from 'src/app/models/Producto';

import { MarcaService } from '../../../services/MarcaServicio/marca.service';
import { RubroService } from '../../../services/RubroServicio/rubro.service';
import { ProductosService } from '../../../services/ProductoServicio/productos.service';

@Component({
  selector: 'app-productos-form',
  templateUrl: './productos-form.component.html',
  styleUrls: ['./productos-form.component.css']
})

export class ProductosFormComponent implements OnInit {

  producto : any;
  marcas : any;
  rubros : any;

  modificar : boolean = false;

  constructor(private activatedRouter: ActivatedRoute,private router: Router, private productoServicio: ProductosService,
    private marcaServicio : MarcaService, private rubroServicio : RubroService) {
    
    this.marcas = [];
    this.rubros = [];

    this.producto = {
      id : 0,
      codigo: '',
      descripcion : '',
      cantidad : '',
      precioCosto : '',
      precioVenta : 0,
      stockMinimo : '',
      imagen : '',
      stockNegativo: false,
      estaEliminado : false,
      createdat : new Date,
      updatedat : new Date,
      marca_id : 0,
      rubro_id : 0,
    };
  }

  ngOnInit(): void {

    this.marcaServicio.obtener().subscribe(
      res => {
        this.marcas = res;
        console.log(Array.from(this.marcas));
      },
      error => console.log(error)
    );

    this.rubroServicio.obtener().subscribe(
      res => {
        this.rubros = res;
        this.rubros = Object.values(this.rubros);
        //this.rubros = this.rubros[0];
        console.log(this.rubros);
      },
      error => console.log(error)
    );

    const params = this.activatedRouter.snapshot.params;
    if(params.id){
      this.productoServicio.obtenerPorId(params.id)
      .subscribe(
        res =>{
          console.log(res);
          this.producto = res;
          this.modificar = true;
        },
        error => console.log(error) 
      )
    }
  }

  agregarProducto = () =>{
    this.producto.precioVenta = this.producto.precioCosto*1.30;
    delete this.producto.updatedat;
    delete this.producto.createdat;
    delete this.producto.id;

    console.log(this.producto);
    this.productoServicio.insertar(this.producto)
    .subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/productos']);
      },
      error => console.log(error)
    )
  }

  modificarProducto = () => {
    this.producto.precioVenta = this.producto.precioCosto*1.30;
    delete this.producto.updatedat;
    delete this.producto.createdat;

    this.productoServicio.modificar(this.producto.id, this.producto).subscribe(
      res =>{
        console.log(res);
        this.router.navigate(['/productos']);
      },
      error => console.log(error)
    )
  }
}
