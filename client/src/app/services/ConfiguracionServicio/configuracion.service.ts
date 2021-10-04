import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Configuracion } from 'src/app/models/Configuracion';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {

  API_URI = environment.HOST_API+ 'configuracion';

  constructor(private http: HttpClient) { }
  
  insertar = (config : Configuracion) =>{
    return this.http.post(`${this.API_URI}`, config);
  }

  modificar = (id: string, modConfig : Configuracion) =>{
    return this.http.put(`${this.API_URI}/${id}`, modConfig);
  }

  obtener = () => {
    return this.http.get(`${this.API_URI}`);
  }
}
