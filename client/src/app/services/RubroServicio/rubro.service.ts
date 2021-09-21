import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Rubro} from '../../models/Rubro';

@Injectable({
  providedIn: 'root'
})

export class RubroService {

  API_URI = 'http://localhost:3000/api/rubro';

  constructor(private http: HttpClient) { }
  
  insertar = (rubro: Rubro) =>{
    return this.http.post(`${this.API_URI}`, rubro);
  }

  modificar = (id: string, modRubro : Rubro) =>{
    return this.http.put(`${this.API_URI}/${id}`, modRubro);
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
