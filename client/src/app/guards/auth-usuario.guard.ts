import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';

import { UsuarioServioService } from '../services/UsuarioServicio/usuario-servio.service';

@Injectable({
  providedIn: 'root'
})
export class AuthUsuarioGuard implements CanActivate {
  constructor(private usuarioServicio : UsuarioServioService, private router : Router){

  }
  canActivate() : boolean{
    if(this.usuarioServicio.sesionIniciadaUser()){
      return true;
    }

    this.router.navigate(['/sign-in'])
    return false;
  }
}
