import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'; // Asegúrate de importar RouterModule
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import {LoginComponent} from "./login/login.component";
import {FormsModule} from "@angular/forms"; // Importa el array de rutas que exportaste

@NgModule({
  declarations: [
    LoginComponent
    // otros componentes
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    AppComponent,
    FormsModule,
    // Configura las rutas aquí
  ],
  providers: []
})
export class AppModule { }

