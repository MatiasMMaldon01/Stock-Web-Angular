import { Component, HostBinding, Injectable, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/Producto';

import {ProductosService} from '../../../services/ProductoServicio/productos.service';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-productos-list',
  templateUrl: './productos-list.component.html',
  styleUrls: ['./productos-list.component.css']
})

export class ProductosListComponent implements OnInit {
  
  productos: any;

  constructor(private productoService: ProductosService) { 
    this.productos = [];
  }

  ngOnInit(): void {
    this.obtenerProductos();
  }
  obtenerProductos=()=>{
    this.productoService.obtener().subscribe(
      res => {
        this.productos = res;
        console.log(Array.from(this.productos));
      },
      error => console.log(error)
    );
      
  }

  eliminarProducto = (id: string)=>{
    console.log(id);
    this.productoService.eliminar(id).subscribe(
      res => {
        console.log(res);
        this.obtenerProductos();
      },
      error => console.log(error)
    )
  }
}
