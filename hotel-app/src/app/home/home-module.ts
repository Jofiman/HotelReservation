import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Home } from './home';


@NgModule({
  imports: [
    CommonModule,
    Home
  ],
  exports: [
    Home
  ]
})
export class HomeModule { }
