import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/Cliente';

import { Producto } from 'src/app/models/Producto';

import { CargarScriptsService } from 'src/app/services/CargarScriptsServicio/cargar-scripts.service';
import { ClienteServicioService } from 'src/app/services/ClienteServicio/cliente-servicio.service';
import { FacturaServicioService } from 'src/app/services/FacturaServicio/factura-servicio.service';
import { UsuarioServioService } from 'src/app/services/UsuarioServicio/usuario-servio.service';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})

export class CarritoComponent implements OnInit {

  productos: any;
  total: number;


  cliente: Cliente;

  factura: any;
  comprobante : any;
  detalleComprobante: any;

  constructor(private cargarScripts: CargarScriptsService, private clienteServicio: ClienteServicioService, private facturaServicio: FacturaServicioService,
    private usuarioServicio: UsuarioServioService, private route: Router) { 

    this.total = 0;
    this.productos = [];

    this.factura = {comprobante: {}, detalleComprobante: []};
    this.comprobante = { cliente_id: 0, total: 0};
    this.detalleComprobante = [];

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

    this.cargarScripts.CargarScript(["side-bar"]);
  }

  ngOnInit(): void {
    
    if(JSON.parse(localStorage.getItem('carrito')||"") === ""){
      this.productos = [];
    }else{
      this.productos = JSON.parse(localStorage.getItem('carrito')|| "");
    }

    this.total = this.productos.reduce((acc:any, producto:any) =>{
      return acc +=producto.subtotal
    }, 0);
  }

  eliminarProducto = (id: number) => {
    this.productos.forEach((item: Producto, index: number) => {
      for (const key in item) {
        if(key === 'id'){
          if(id === item[key]){
            this.productos.splice(index,1)
          }
        }
      }
    });
    localStorage.setItem('carrito', JSON.stringify(this.productos));
  }

  finalizarCompra = () => {
    this.usuarioServicio.verificarToken().subscribe(
      (res:any) =>{
      this.comprobante.cliente_id = res.id;
      this.comprobante.total = this.total;
      this.factura.comprobante = this.comprobante;
      this.detalleComprobante = this.productos;
      this.factura.detalleComprobante = this.detalleComprobante;
      console.log(this.factura);
      
      this.facturaServicio.insertar(this.factura).subscribe(
        res =>{
          console.log(res)
        },
        error => console.log(error)
      );

    },
    error=> console.log(error)
    )

    localStorage.removeItem('carrito');
    this.route.navigate([""]);
  }

}
