import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'; // Asegúrate de importar RouterModule
import { AppComponent } from './app.component';
import { routes } from './app.routes'; // Importa el array de rutas que exportaste

@NgModule({
  declarations: [

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    AppComponent,
    // Configura las rutas aquí
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
