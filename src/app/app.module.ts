import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './shared/service/user.service';
import { ToastrModule } from 'ngx-toastr';
import { HomeModule } from './home/home.module';
import { AuthGuard } from './auth/auth.guard';
import {FacebookLoginProvider, SocialLoginModule,GoogleLoginProvider, SocialAuthServiceConfig } from 'angularx-social-login';
//import { ToastrModule } from 'ngx-toastr/toastr/toastr.module'


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    AuthModule,
    HomeModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    SocialLoginModule
  ],
  providers: [
    UserService,AuthGuard,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '463373783688-uh5t8pdj38v8kdoidbtckqtnbuenmi9d.apps.googleusercontent.com'
            )
          }
        ]
      } as SocialAuthServiceConfig,
    }
    // ,
    // {
    //   provide: 'SocialAuthServiceConfig',
    //   useValue: {
    //     autoLogin: false,
    //     providers: [
    //       {
    //         id: FacebookLoginProvider.PROVIDER_ID,
    //         provider: new FacebookLoginProvider(
    //           '1747214752135729'
    //         )
    //       }
    //     ]
    //   } as SocialAuthServiceConfig,
    // }       
  ],
  //providers: [UserService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
