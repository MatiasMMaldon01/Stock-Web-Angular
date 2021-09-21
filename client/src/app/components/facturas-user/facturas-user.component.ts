import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/Cliente';

import { CargarScriptsService } from 'src/app/services/CargarScriptsServicio/cargar-scripts.service';
import { ClienteServicioService } from 'src/app/services/ClienteServicio/cliente-servicio.service';
import { FacturaServicioService } from 'src/app/services/FacturaServicio/factura-servicio.service';
import { UsuarioServioService } from 'src/app/services/UsuarioServicio/usuario-servio.service';

@Component({
  selector: 'app-facturas-user',
  templateUrl: './facturas-user.component.html',
  styleUrls: ['./facturas-user.component.css']
})

export class FacturasUserComponent implements OnInit {

  clienteIngresado : string;

  facturas: any;
  detalleComprobante : any;
  
  
  constructor(private clienteServicio: ClienteServicioService, private facturaServicio: FacturaServicioService,
    private cargarScripts: CargarScriptsService, private usuarioServicio: UsuarioServioService) { 
    this.facturas = [];
    this.clienteIngresado = "";

    this.cargarScripts.CargarScript(["side-bar"]);
  }

  ngOnInit(): void {


    this.usuarioServicio.verificarToken().subscribe(
      (res:any) =>{
        this.facturaServicio.obtenerPorcliente(res.id).subscribe(
          res =>{
            this.facturas = res;
            console.log(Array.from(this.facturas));
          }
        )
      },
      error => console.log(error)
    );
  }

  obtenerDetalleComprobante = (id: string) =>{
    this.facturaServicio.obtenerDetalleComprobante(id).subscribe(
      res =>{
        this.detalleComprobante = res;
        console.log(Array.from(this.detalleComprobante));
      },
      error => console.log(error)
    );
  }

}
