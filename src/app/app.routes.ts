import { Routes } from '@angular/router';
import { AbaloriosComponent } from '@vistas/abalorios/abalorios.component';
import { ImagenesComponent } from '@vistas/imagenes/imagenes.component';
import { ProyectosComponent } from '@vistas/proyectos/proyectos.component';

const inicial: string = 'proyectos';

export const routes: Routes = [
  { path: 'proyectos', component: ProyectosComponent },
  { path: 'imagenes', component: ImagenesComponent },
  { path: 'abalorios', component: AbaloriosComponent },
  { path: '**', redirectTo: inicial, pathMatch: 'full' },
];
