import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component'; // Componente de registro
import { ProfileComponent } from './profile/profile.component';
import { FeedComponent } from './feed/feed.component';

export const routes: Routes = [
  { path: '', component: LoginComponent }, // Página principal
  { path: 'login', component: LoginComponent }, // Ruta para el registro
  { path: 'profile', component: ProfileComponent },
  { path: 'feed', component: FeedComponent },
  { path: '**', redirectTo: '' }, // Ruta por defecto
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
