import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ProductosFormComponent } from './components/producto/productos-form/productos-form.component';
import { ProductosListComponent } from './components/producto/productos-list/productos-list.component';

import { ProductosService} from './services/ProductoServicio/productos.service';
import { RubroService} from './services/RubroServicio/rubro.service';
import { MarcaService} from './services/MarcaServicio/marca.service';
import { NavProductosComponent } from './components/producto/nav-productos/nav-productos.component';
import { MarcaComponent } from './components/marca/marca.component';
import { RubroComponent } from './components/rubro/rubro.component';
import { PaisComponent } from './components/pais/pais.component';
import { ProvinciaComponent } from './components/provincia/provincia.component';
import { DepartamentoComponent } from './components/departamento/departamento.component';
import { LocalidadComponent } from './components/localidad/localidad.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component'
import { CarritoComponent } from './components/carrito/carrito.component';

import { AuthAdminGuard} from './guards/auth-admin.guard';
import { AuthUsuarioGuard} from './guards/auth-usuario.guard';

import { MaterialModule } from './material-module';

import { CargarScriptsService} from './services/CargarScriptsServicio/cargar-scripts.service';
import { SideBarComponent } from './components/inicio/side-bar/side-bar.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { FacturasUserComponent } from './components/facturas-user/facturas-user.component';
import { FacturasComponent } from './components/facturas/facturas.component';
import { ValidacionTokenInterceptor } from './interceptor/validacion-token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ProductosFormComponent,
    ProductosListComponent,
    NavProductosComponent,
    MarcaComponent,
    RubroComponent,
    PaisComponent,
    ProvinciaComponent,
    DepartamentoComponent,
    LocalidadComponent,
    ClientesComponent,
    ConfiguracionComponent,
    InicioComponent,
    SignInComponent,
    SignUpComponent,
    SideBarComponent,
    CarritoComponent,
    SideBarComponent,
    PerfilComponent,
    FacturasUserComponent,
    FacturasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [
    ProductosService,
    RubroService,
    MarcaService,
    CargarScriptsService,
    AuthAdminGuard,
    AuthUsuarioGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ValidacionTokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
