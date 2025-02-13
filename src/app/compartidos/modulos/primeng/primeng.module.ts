import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MenuModule,
    ButtonModule,
  ],
  exports: [
    MenuModule,
    ButtonModule,
  ]
})
export class PrimengModule { }
