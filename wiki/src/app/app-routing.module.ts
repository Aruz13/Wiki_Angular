import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VistaListasComponent } from './vista-listas/vista-listas.component';
import { VistaDetallesComponent } from './vista-detalles/vista-detalles.component';



const routes: Routes = [
  { path: '', component: VistaListasComponent },
  { path: 'location/:id', component: VistaDetallesComponent },
  { path: 'character/:id', component: VistaDetallesComponent },
  { path: 'episode/:id', component: VistaDetallesComponent },
  { path: '**', redirectTo: '' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
