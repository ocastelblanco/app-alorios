import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from "./compartidos/componentes/menu/menu.component";
import { PrimengModule } from '@modulos/primeng/primeng.module';
import { FondoAnimadoComponent } from '@componentes/fondo-animado/fondo-animado.component';

@Component({
  selector: 'apl-root',
  imports: [
    RouterOutlet,
    MenuComponent,
    PrimengModule,
    FondoAnimadoComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  toggleDark(): void {
    document.querySelector('html')?.classList.toggle('apl-dark');
  }
}
