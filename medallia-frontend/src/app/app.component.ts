import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import {HttpClientModule} from "@angular/common/http"; // Asegúrate de importar RouterModule

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterModule, HttpClientModule] // Asegúrate de importar RouterModule
})
export class AppComponent {
  constructor(private router: Router) {}


}
