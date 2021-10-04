import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Producto} from '../../models/Producto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  API_URI = environment.HOST_API + 'productos';

  constructor(private http: HttpClient) { }
  
  insertar = (producto: Producto) =>{
    return this.http.post(`${this.API_URI}`, producto);
  }

  modificar = (id: string, modProducto : Producto) =>{
    return this.http.put(`${this.API_URI}/${id}`, modProducto);
  }

  eliminar = (id: string)=>{
    return this.http.delete(`${this.API_URI}/${id}`);
  }

  obtenerPorId = (id: number) => {
    return this.http.get(`${this.API_URI}/${id}`);
  }

  obtener = () => {
    return this.http.get(`${this.API_URI}`);
  }


}
