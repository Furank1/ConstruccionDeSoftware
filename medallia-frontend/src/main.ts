import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module'; // Asegúrate de que esta línea sea correcta


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
