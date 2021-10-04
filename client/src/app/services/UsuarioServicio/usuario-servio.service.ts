import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from 'src/app/models/Usuario';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioServioService {

  API_URI = environment.HOST_API + 'usuarios';

  constructor(private http: HttpClient) { }
  
  signIn = (usuario: Usuario) =>{
    return this.http.post(`${this.API_URI}`+'/signin', usuario);
  }

  signUp = (usuario: Usuario) =>{
    return this.http.post(`${this.API_URI}`+'/signup', usuario);
  }

  verificarToken = () => {
    return this.http.get(`${this.API_URI}`+'/perfil');
  }
  
  obtenerUsuario = (usuario: Usuario) => {
    return this.http.post(`${this.API_URI}`+'/obtenerUsuario', usuario);
  }

  sesionIniciadaAdmin = (): boolean =>{
    return !!localStorage.getItem("admin");
  }
  
  sesionIniciadaUser = (): boolean =>{
    return !!localStorage.getItem("usuario");
  }
}
