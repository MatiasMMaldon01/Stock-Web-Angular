import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Localidad } from '../../models/Localidad';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocalidadService {

  API_URI = environment.HOST_API+ 'localidad';

  constructor(private http: HttpClient) { }
  
  insertar = (localidad: Localidad) =>{
    return this.http.post(`${this.API_URI}`, localidad);
  }

  modificar = (id: string, modLocalidad : Localidad) =>{
    return this.http.put(`${this.API_URI}/${id}`, modLocalidad);
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
