import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pais } from '../../models/Pais';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaisServicioService {

  API_URI = environment.HOST_API + 'pais';

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
