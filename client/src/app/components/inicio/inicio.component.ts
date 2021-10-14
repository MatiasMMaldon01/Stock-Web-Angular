import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { ProductosService } from 'src/app/services/ProductoServicio/productos.service';
import { CargarScriptsService } from 'src/app/services/CargarScriptsServicio/cargar-scripts.service';
import { ClienteServicioService } from 'src/app/services/ClienteServicio/cliente-servicio.service';
import { Producto } from 'src/app/models/Producto';
import { UsuarioServioService } from 'src/app/services/UsuarioServicio/usuario-servio.service';
import { Cliente } from 'src/app/models/Cliente';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  productos: Producto[];
  productoCarrito: any;
  cantidadStock: number;
  cliente: Cliente;
  clienteIngresado : string;
  carrito : any;
  productoNoIngresado : boolean;

  constructor(private productoServicio : ProductosService, private cargarScripts: CargarScriptsService, 
    private clienteServicio: ClienteServicioService, private router: Router, private usuarioServicio: UsuarioServioService) {
    
    this.productoNoIngresado = true;
    this.clienteIngresado = "";

    this.productos = [];
    this.productoCarrito = {
      id: 0,
      cantidad: 0,
      precioCosto: 0,
      precioVenta: 0,
      subtotal: 0,
      descripcion: "",
      imagen: "",
      codigo: 0,
      stockMinimo: 0,
      stockNegativo: false,
      estaEliminado: false,
      marca_id: 1,
      rubro_id:1
    };

    this.carrito = [];
    this.cantidadStock = 0;
    cargarScripts.CargarScript(["side-bar"]);
    
    
    this.cliente = {
      id : 0,
      nombre : '',
      apellido : 'Usuario No Ingresado',
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

    this.productoServicio.obtener().subscribe(
      res => {
        this.productos = Object.values(res);
        console.log(this.productos);
      },
      error => console.log(error)
      );
      
      this.usuarioServicio.verificarToken().subscribe(
        (res:any) =>{ 
          this.cliente = res;
        },
        error => console.log(error)
      )

      this.carrito = JSON.parse(localStorage.getItem('carrito')||"");
    }
    
    agregarCarrito = (productoId: number) =>{
      
    this.productoServicio.obtenerPorId(productoId).subscribe(
      res =>{
        this.productoCarrito = res;
        this.cantidadStock = this.productoCarrito.cantidad;
        this.productoCarrito.subtotal = this.productoCarrito.precioVenta;
        this.productoCarrito.cantidad = 1;
        
        if(this.carrito.length === 0){
          if(this.cantidadStock <= 0 && this.productoCarrito.stockNegativo === false){ 
            alert("No hay suficiente stock para realizar la compra. Solo hay " + `${this.cantidadStock}`+ " articulos disponibles.");
            return;
          }else{
           this.carrito.push(this.productoCarrito);
          }
        }else{
          console.log(this.carrito.length)
          this.carrito.forEach((item: any) => {
            for (const key in item) {
              if(key === 'id'){
                if(this.productoCarrito.id === item[key]){
                  if(this.cantidadStock <= item.cantidad && this.productoCarrito.stockNegativo === false){
                    alert("No hay suficiente stock para realizar la compra. Solo hay " + `${this.cantidadStock}`+ " articulos disponibles.");
                    this.productoNoIngresado = false;
                    return;
                  }

                  item.cantidad ++;
                  item.subtotal += this.productoCarrito.precioVenta;
                  this.productoNoIngresado = false;
                }
              }
            }
          });

          if(this.productoNoIngresado){
            this.carrito.push(this.productoCarrito);
          }
        }       
        localStorage.setItem('carrito', JSON.stringify(this.carrito));
        this.productoNoIngresado = true;
      },
      error => console.log(error)
    )
    console.log(this.carrito);
  }

  abrirCarrito = () =>{
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
    this.router.navigate(['/carrito']);
  }

  cerrarSesion = () =>{
    localStorage.clear();
    this.router.navigate([""]);
  }
  
}
