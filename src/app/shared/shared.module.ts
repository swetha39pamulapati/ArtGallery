import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderLayoutComponent } from './layouts/header-layout/header-layout.component';
import { HeaderComponent } from './layouts/header/header.component';
import { RouterModule } from '@angular/router';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';



@NgModule({
  declarations: [
    HeaderLayoutComponent,HeaderComponent, HomeLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[HeaderLayoutComponent]
})
export class SharedModule { }
