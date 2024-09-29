import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { FeedComponent } from './feed/feed.component';

const routes: Routes = [
  { path: '', component: LoginComponent }, // Página principal (login)
  { path: 'login', component: LoginComponent }, // Componente de creación de cuenta
  { path: 'profile', component: ProfileComponent },
  { path: 'feed', component: FeedComponent },
  { path: '**', redirectTo: '' }, // Ruta por defecto
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
