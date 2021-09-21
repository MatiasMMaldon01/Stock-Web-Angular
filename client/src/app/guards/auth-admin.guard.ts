import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import { Router } from '@angular/router';

import { UsuarioServioService } from '../services/UsuarioServicio/usuario-servio.service';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuard implements CanActivate {

  constructor(private usuarioServicio : UsuarioServioService, private router : Router){

  }
  canActivate() : boolean{
    if(this.usuarioServicio.sesionIniciadaAdmin()){
      return true;
    }

    this.router.navigate(['/sign-in'])
    return false;
  }
  
}
