import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Provincia } from '../../models/Provincia';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProvinciaServicioService {

  API_URI = environment.HOST_API + 'provincia';

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
