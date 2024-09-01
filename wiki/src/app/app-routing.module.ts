import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PersonajesComponent } from './personajes/personajes.component';
import { CapitulosComponent } from './capitulos/capitulos.component';
import { LocateComponent } from './locate/locate.component';
LocateComponent

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'personajes', component: PersonajesComponent },
  { path: 'capitulos', component: CapitulosComponent },
  { path: 'localizaciones', component: LocateComponent },
  { path: '**', redirectTo: '' } // Redirige rutas desconocidas a Home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
