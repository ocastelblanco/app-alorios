import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

export interface ItemMenu {
  nombre: string;
  tipo: string;
  icono: string;
  vinculo: string;
}

@Component({
  selector: 'apl-menu-boton',
  imports: [
    NgClass,
    RouterLink,
  ],
  templateUrl: './menu-boton.component.html',
  styleUrl: './menu-boton.component.scss'
})
export class MenuBotonComponent {
  @Input() item: ItemMenu = {} as ItemMenu;
  @Input() actual: boolean = false;
}
