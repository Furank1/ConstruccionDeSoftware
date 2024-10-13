import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegistroComponent } from './registro/registro.component';
import {PublicacionComponent} from './publicacion/publicacion.component';
import {PublicarComponent} from "./publicar/publicar.component";
import {FeedComponent} from "./feed/feed.component";

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  {path: 'registro',component: RegistroComponent},
  { path: 'feed', component: FeedComponent },
  {path: 'publicacion', component: PublicacionComponent },
  {path: 'publicar', component: PublicarComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
