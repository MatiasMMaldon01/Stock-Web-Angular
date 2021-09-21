import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Cliente } from 'src/app/models/Cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteServicioService {

  API_URI = 'http://localhost:3000/api/clientes';

  constructor(private http: HttpClient) { }
  
  insertar = (cliente: any) =>{
    return this.http.post(`${this.API_URI}`, cliente);
  }

  modificar = (id: number, modCliente : Cliente) =>{
    return this.http.put(`${this.API_URI}/${id}`, modCliente);
  }

  eliminar = (id: string)=>{
    return this.http.delete(`${this.API_URI}/${id}`);
  }

  obtenerPorUserId = (id: string) => {
    return this.http.get(`${this.API_URI}/${id}`);
  }

  obtener = () => {
    return this.http.get(`${this.API_URI}`);
  }
}
