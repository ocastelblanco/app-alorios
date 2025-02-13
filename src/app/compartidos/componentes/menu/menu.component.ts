import { Component } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { PrimengModule } from '@modulos/primeng/primeng.module';
import { filter } from 'rxjs';
import { MenuBotonComponent, ItemMenu } from './menu-boton/menu-boton.component';
import { MenuPerfilComponent } from './menu-perfil/menu-perfil.component';

@Component({
  selector: 'apl-menu',
  imports: [
    PrimengModule,
    MenuBotonComponent,
    MenuPerfilComponent,
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  actualLink: string | undefined;
  items: ItemMenu[] = [
    {
      nombre: 'Proyectos',
      tipo: 'material',
      icono: 'home',
      vinculo: '/proyectos',
    },
    {
      nombre: 'Imágenes',
      icono: 'photo_library',
      tipo: 'material',
      vinculo: '/imagenes',
    },
    {
      nombre: 'Abalorios',
      icono: 'fa-solid fa-ring',
      tipo: 'fontawesome',
      vinculo: '/abalorios',
    },
  ];
  constructor(private router: Router) {
    this.router.events.pipe(
      filter((e: Event | NavigationEnd): e is NavigationEnd => e instanceof NavigationEnd)
    ).subscribe((e: NavigationEnd) => {
      this.actualLink = e.url;
    });
  }
}
