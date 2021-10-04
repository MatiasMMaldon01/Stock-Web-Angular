import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FacturaServicioService {

  API_URI = environment.HOST_API+ 'venta';

  constructor(private http: HttpClient) { }

  insertar = (factura: any) =>{
    return this.http.post(`${this.API_URI}`, factura);
  }

  obtenerPorcliente = (id: number) => {
    return this.http.get(`${this.API_URI}/obtenerPorCliente/${id}`);
  }

  obtener = () => {
    return this.http.get(`${this.API_URI}`);
  }

  obtenerDetalleComprobante = (id: string) =>{
    return this.http.get(`${this.API_URI}/obtenerDetalleComprobante/${id}`);
  }
}
