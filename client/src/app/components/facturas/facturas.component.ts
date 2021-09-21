import { Component, OnInit } from '@angular/core';
import { FacturaServicioService } from 'src/app/services/FacturaServicio/factura-servicio.service';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent implements OnInit {

  facturas: any;
  factura : any;
  facturasSeleccionadas: any;
  detalleComprobante : any;

  cliente : string;
  fechaDesde : string;
  fechaHasta : string;

  ingresoFechaDesde : boolean;
  ingresoFechaHasta : boolean;

  constructor(private facturaServicio: FacturaServicioService) { 

    this.facturas = [];
    this.facturasSeleccionadas = [];
    this.cliente = "";
    this.fechaDesde = "";
    this.fechaHasta = "";
    this.ingresoFechaDesde = false;
    this.ingresoFechaHasta = false;

    this.factura = {
      id: 0,
      cliente_id: 0,
      Cliente : { nombre: "", apellido: "", dni:""},
      fecha: new Date,
      total: 0
    }
  }

  ngOnInit(): void {
    this.facturaServicio.obtener().subscribe(
      res=>{
        this.facturas = res;
        console.log(Array.from(this.facturas));
        this.facturasSeleccionadas = this.facturas;
      }
    )
  }

  clienteSeleccionado = (cliente: string) =>{
    this.facturasSeleccionadas = this.facturas.filter((item : any)=> item.Cliente.nombre.toLowerCase().includes(cliente)||item.Cliente.apellido.toLowerCase().includes(cliente)||item.Cliente.dni.includes(cliente));
    console.log(this.facturasSeleccionadas);
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

  fechaDesdeSeleccionada = ( fechaDesde: string) =>{
    let arrayFechaElegidaDesde = fechaDesde.split("T")[0].split("-");
    this.ingresoFechaDesde = true;

    if(!this.ingresoFechaHasta){
      this.facturasSeleccionadas = this.facturas.filter((item:any)=>{
        let arrayFechaFactura = item.fecha.split("T")[0].split("-");
  
        return arrayFechaElegidaDesde[0] <=arrayFechaFactura[0] && arrayFechaElegidaDesde[1] <=arrayFechaFactura[1] && arrayFechaElegidaDesde[2] <=arrayFechaFactura[2] 
      })
    }else{
      let arrayFechaElegidaHasta = this.fechaHasta.split("T")[0].split("-");

      this.facturasSeleccionadas = this.facturas.filter((item:any)=>{
        let arrayFechaFactura = item.fecha.split("T")[0].split("-");
  
        return (arrayFechaElegidaHasta[0] >=arrayFechaFactura[0] && arrayFechaElegidaDesde[0] <=arrayFechaFactura[0]) 
        && (arrayFechaElegidaHasta[1] >=arrayFechaFactura[1] && arrayFechaElegidaDesde[1] <=arrayFechaFactura[1]) 
        && (arrayFechaElegidaHasta[2] >=arrayFechaFactura[2] && arrayFechaElegidaDesde[2] <=arrayFechaFactura[2]) 
      })
    }
  }

  fechaHastaSeleccionada = ( fechaHasta: string) =>{
    let arrayFechaElegidaHasta = fechaHasta.split("T")[0].split("-");
    this.ingresoFechaHasta = true;

    if (!this.ingresoFechaDesde){
      this.facturasSeleccionadas = this.facturas.filter((item:any)=>{
        let arrayFechaFactura = item.fecha.split("T")[0].split("-");
        return arrayFechaElegidaHasta[0] >=arrayFechaFactura[0] && arrayFechaElegidaHasta[1] >=arrayFechaFactura[1] && arrayFechaElegidaHasta[2] >=arrayFechaFactura[2] 
      });
    }else{
     let arrayFechaElegidaDesde = this.fechaDesde.split("T")[0].split("-");

      this.facturasSeleccionadas = this.facturas.filter((item:any)=>{
        let arrayFechaFactura = item.fecha.split("T")[0].split("-");
  
        return (arrayFechaElegidaHasta[0] >=arrayFechaFactura[0] && arrayFechaElegidaDesde[0] <=arrayFechaFactura[0]) 
        && (arrayFechaElegidaHasta[1] >=arrayFechaFactura[1] && arrayFechaElegidaDesde[1] <=arrayFechaFactura[1]) 
        && (arrayFechaElegidaHasta[2] >=arrayFechaFactura[2] && arrayFechaElegidaDesde[2] <=arrayFechaFactura[2]) 
      })
    }
  }

  refresh =() =>{
    this.facturasSeleccionadas = this.facturas;
    this.fechaDesde = "";
    this.fechaHasta = "";
    this.ingresoFechaDesde = false;
    this.ingresoFechaHasta = false;
  }

}
