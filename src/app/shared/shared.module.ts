import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderLayoutComponent } from './layouts/header-layout/header-layout.component';
import { HeaderComponent } from './layouts/header/header.component';



@NgModule({
  declarations: [
    HeaderLayoutComponent,HeaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[HeaderLayoutComponent]
})
export class SharedModule { }
