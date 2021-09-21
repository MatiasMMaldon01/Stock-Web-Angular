import { EventListenerFocusTrapInertStrategy } from '@angular/cdk/a11y';
import { Component, OnInit } from '@angular/core';
import { ClienteServicioService } from 'src/app/services/ClienteServicio/cliente-servicio.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: any;

  constructor(private clienteServicio: ClienteServicioService) { 
    this.clientes = [];
  }

  ngOnInit(): void {

    this.clienteServicio.obtener().subscribe(
      res =>{
        this.clientes = res;
        console.log(Array.from(this.clientes))
      },
      error => console.log(error)
    );
  }

  eliminarCliente = (id:string) =>{

    this.clienteServicio.eliminar(id).subscribe(
      res =>{
        console.log(res);
      },
      error => console.log(error)
    );
  }

}
