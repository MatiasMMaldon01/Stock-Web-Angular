import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Departamento} from '../../models/Departamento';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  API_URI = 'http://localhost:3000/api/departamento';

  constructor(private http: HttpClient) { }
  
  insertar = (departamento: Departamento) =>{
    return this.http.post(`${this.API_URI}`, departamento);
  }

  modificar = (id: string, modDepartamento : Departamento) =>{
    return this.http.put(`${this.API_URI}/${id}`, modDepartamento);
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
