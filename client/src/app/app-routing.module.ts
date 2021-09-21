import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InicioComponent} from './components/inicio/inicio.component';
import { SignUpComponent} from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';

import { ProductosListComponent} from './components/producto/productos-list/productos-list.component'
import { ProductosFormComponent} from './components/producto/productos-form/productos-form.component';
import { MarcaComponent } from './components/marca/marca.component';
import { RubroComponent } from './components/rubro/rubro.component';
import { PaisComponent } from './components/pais/pais.component';
import { ProvinciaComponent } from './components/provincia/provincia.component';
import { DepartamentoComponent } from './components/departamento/departamento.component';
import { LocalidadComponent } from './components/localidad/localidad.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';

import { AuthAdminGuard} from './guards/auth-admin.guard';
import { AuthUsuarioGuard} from './guards/auth-usuario.guard';
import { CarritoComponent } from './components/carrito/carrito.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { FacturasUserComponent } from './components/facturas-user/facturas-user.component';
import { FacturasComponent } from './components/facturas/facturas.component';

const routes: Routes = [
  {
    path: '',
    component: InicioComponent
  },{
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: 'sign-in',
    component: SignInComponent 
  },{
    path: 'carrito',
    component: CarritoComponent,
    canActivate: [AuthUsuarioGuard]
  },{
    path: 'perfil',
    component: PerfilComponent,
    canActivate: [AuthUsuarioGuard]
  },
  {
    path: 'misFacturas',
    component: FacturasUserComponent,
    canActivate: [AuthUsuarioGuard]
  },
  {
    path: 'productos',
    component: ProductosListComponent,
    canActivate: [AuthAdminGuard]
  },
  {
    path: 'productos/agregar',
    component: ProductosFormComponent,
    canActivate: [AuthAdminGuard]
  },
  {
    path: 'productos/modificar/:id',
    component: ProductosFormComponent,
    canActivate: [AuthAdminGuard]
  },
  {
    path: 'marca',
    component: MarcaComponent,
    canActivate: [AuthAdminGuard]
  },
  {
    path: 'marca/modificar/:id',
    component: MarcaComponent,
    canActivate: [AuthAdminGuard]
  },
  {
    path: 'rubro',
    component: RubroComponent,
    canActivate: [AuthAdminGuard]
  },
  {
    path: 'rubro/modificar/:id',
    component: RubroComponent,
    canActivate: [AuthAdminGuard]
  },
  {
    path: 'pais',
    component: PaisComponent,
    canActivate: [AuthAdminGuard]
  },
  {
    path: 'pais/modificar/:id',
    component: PaisComponent,
    canActivate: [AuthAdminGuard]
  },
  {
    path: 'provincia',
    component: ProvinciaComponent,
    canActivate: [AuthAdminGuard]
  },
  {
    path: 'provincia/modificar/:id',
    component: ProvinciaComponent,
    canActivate: [AuthAdminGuard]
  },
  {
    path: 'departamento',
    component: DepartamentoComponent,
    canActivate: [AuthAdminGuard]
  },
  {
    path: 'departamento/modificar/:id',
    component: DepartamentoComponent,
    canActivate: [AuthAdminGuard]
  },
  {
    path: 'localidad',
    component: LocalidadComponent,
    canActivate: [AuthAdminGuard]
  },
  {
    path: 'localidad/modificar/:id',
    component: LocalidadComponent,
    canActivate: [AuthAdminGuard]
  },
  {
    path: 'clientes',
    component: ClientesComponent,
    canActivate: [AuthAdminGuard]
  },
  {
    path: 'clientes/modificar/:id',
    component: ClientesComponent,
    canActivate: [AuthAdminGuard]
  },
  {
    path: 'configuracion',
    component: ConfiguracionComponent,
    canActivate: [AuthAdminGuard]
  },
  {
    path: 'configuracion/modificar/:id',
    component: ConfiguracionComponent,
    canActivate: [AuthAdminGuard]
  },
  {
    path:'facturas',
    component: FacturasComponent,
    canActivate: [AuthAdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
