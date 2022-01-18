import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { ResetPasswordComponent } from './auth/components/reset-password/reset-password.component';
import { HomeRoutingModule } from './home/home-routing.module';
import { HeaderComponent } from './shared/layouts/header/header.component';
import { HomeLayoutComponent } from './shared/layouts/home-layout/home-layout.component';

const routes: Routes = [
  {
    path: '',
    component: HeaderComponent,
    children: [
      { 
        path: '', 
        redirectTo : '/register',
        pathMatch : 'full'
      },
      {
        path:'register',
        component:RegisterComponent
      },
      {
        path:'login',component:LoginComponent
      },
      
      {path:'reset-password',component:ResetPasswordComponent},
    ]
  },
  {
    path : '',
    component : HomeLayoutComponent,
    children:[
      {
        path: '', 
        redirectTo : '/home',
        pathMatch : 'full'
      },{
      path:'home',
      canActivate: [AuthGuard],
      loadChildren :()=> import('./home/home.module').then(m=>HomeRoutingModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
