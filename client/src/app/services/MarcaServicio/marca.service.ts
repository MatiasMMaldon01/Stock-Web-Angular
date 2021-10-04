import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import{ Marca } from '../../models/Marca';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class MarcaService {

  API_URI = environment.HOST_API + 'marca';

  constructor(private http: HttpClient) { }
  
  insertar = (marca: Marca) =>{
    return this.http.post(`${this.API_URI}`, marca);
  }

  modificar = (id: string, modMarca : Marca) =>{
    return this.http.put(`${this.API_URI}/${id}`, modMarca);
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
