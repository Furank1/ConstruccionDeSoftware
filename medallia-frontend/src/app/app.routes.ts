import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { FeedComponent } from './feed/feed.component';
import { RegistroComponent } from './registro/registro.component';
import {PublicacionComponent} from "./publicacion/publicacion.component";

const routes: Routes = [
  { path: '', component: LoginComponent }, // Página principal (login)
  { path: 'login', component: LoginComponent }, // Componente de creación de cuenta
  { path: 'profile', component: ProfileComponent },
  {path: 'registro',component: RegistroComponent},
  { path: 'feed', component: FeedComponent },
  {path: 'publicacion', component: PublicacionComponent },
  { path: '**', redirectTo: '' }, // Ruta por defecto
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
