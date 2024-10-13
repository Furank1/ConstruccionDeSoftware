import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegistroComponent } from './registro/registro.component';
import { PublicacionComponent } from './publicacion/publicacion.component';
import { PublicarComponent } from './publicar/publicar.component';
import { FeedComponent } from './feed/feed.component';
import { MedallaComponent } from './medalla/medalla.component';
import { AuthGuard } from '../auth.guard';  

const routes: Routes = [
  { path: '', component: LoginComponent },  // No protegido 
  { path: 'login', component: LoginComponent },  // No protegido 
  { path: 'registro', component: RegistroComponent },  // No protegido 
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },  // protegido
  { path: 'feed', component: FeedComponent, canActivate: [AuthGuard] },        // protegido
  { path: 'publicacion', component: PublicacionComponent, canActivate: [AuthGuard] }, // protegido
  { path: 'medalla', component: MedallaComponent, canActivate: [AuthGuard] },   // protegido
  { path: 'publicar', component: PublicarComponent, canActivate: [AuthGuard] }, // protegido
  { path: '**', redirectTo: '' },  // Redirige al login si no existe la ruta
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
