import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Provincia } from '../../models/Provincia';

@Injectable({
  providedIn: 'root'
})
export class ProvinciaServicioService {

  API_URI = 'http://localhost:3000/api/provincia';

  constructor(private http: HttpClient) { }
  
  insertar = (provincia: Provincia) => {
    return this.http.post(`${this.API_URI}`, provincia);
  }

  modificar = (id: string, modProvincia : Provincia) =>{
    return this.http.put(`${this.API_URI}/${id}`, modProvincia);
  }

  eliminar = (id: string)=>{
    return this.http.delete(`${this.API_URI}/${id}`);
  }

  obtenerPorId = (id: string) => {
    return this.http.get(`${this.API_URI}/${id}`);
  }

  obtener = () => {
    return this.http.get(`${this.API_URI}`);
  }
}
