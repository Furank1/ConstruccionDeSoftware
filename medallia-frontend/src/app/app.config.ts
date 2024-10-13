import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { FeedComponent } from './feed/feed.component';
import { RegistroComponent } from "./registro/registro.component";
import {PublicacionComponent} from "./publicacion/publicacion.component";

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'feed', component: FeedComponent },
  {path: 'login', component: LoginComponent },
  {path: 'registro', component: RegistroComponent },
  {path: 'publicacion', component: PublicacionComponent },
  { path: '**', redirectTo: '' }
];

export class appConfig {
}
