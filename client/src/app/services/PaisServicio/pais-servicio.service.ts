import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Pais } from '../../models/Pais';

@Injectable({
  providedIn: 'root'
})
export class PaisServicioService {

  API_URI = 'http://localhost:3000/api/pais';

  constructor(private http: HttpClient) { }
  
  insertar = (pais: Pais) =>{
    return this.http.post(`${this.API_URI}`, pais);
  }

  modificar = (id: string, modpais : Pais) =>{
    return this.http.put(`${this.API_URI}/${id}`, modpais);
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
