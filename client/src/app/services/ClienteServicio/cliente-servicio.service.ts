import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Cliente } from 'src/app/models/Cliente';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteServicioService {

  API_URI = environment.HOST_API + 'clientes';

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
