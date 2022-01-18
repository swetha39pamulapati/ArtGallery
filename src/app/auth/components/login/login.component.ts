import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/service/user.service';
import { Router } from '@angular/router';
import{ToastrService} from 'ngx-toastr';
import { SocialAuthService, GoogleLoginProvider,FacebookLoginProvider, SocialUser } from 'angularx-social-login';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoginError = false;
  isLoggedin = false;  
  socialUser: SocialUser;
  constructor(private userService: UserService,private router: Router, private socialAuthService: SocialAuthService,private fb: FormBuilder, private toastr : ToastrService) { }
 

  ngOnInit() {
     
    this.loginForm =this.fb.group({
      loginUserName : ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      loginPassword: ['', [Validators.required]]
    });
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = (user != null);
      console.log(this.socialUser);
    });
  }
//   sendToRestApiMethod(token: string) : void {
//     this.http.post(“url to facebook login here”, { token: token } }
//         .subscribe(onSuccess => {
//                        //login was successful
//                        //save the token that you got from your REST API in your preferred location i.e. as a Cookie or LocalStorage as you do with normal login
//                }, onFail => {
//                        //login was unsuccessful
//                        //show an error message
//                }
//         );
// }

  loginWithGoogle(){
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      (userData) => {
        // console.log(userData);
        localStorage.setItem('usertoken',userData.response.access_token);
        localStorage.setItem('userName',userData.email);
         //this.router.navigate(['/home']);

            this.userService.addExternalLogin(userData.response.access_token).subscribe((data: any) => {
              localStorage.setItem('usertoken',data.body.access_token);
              this.router.navigate(['/home']);
              if (data.ok == true) {
                console.log("user registered");
                //this.resetForm(form);
                this.toastr.success('User login successful');
              }
            },(error: any) => { 
              console.log(error);
              this.toastr.error('User name or password is not correct');
              this.isLoginError = true; 
            });
       }
    );
   
    //this.router.navigateByUrl("https://localhost:44363/api/Account/ExternalLogin?provider=Google&response_type=token&client_id=self&redirect_uri=https%3A%2F%2Flocalhost%3A44363%2F&state=iNvW46sbWxm_QxuULV_DfpBy5coMaSTocZ4pO0DeFno1");
  }
  loginWithFB(){
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
  UserLogin(form :FormGroup) : void{
    this.userService.loginUser(form.value)
    .subscribe((data: any) => {
      localStorage.setItem('usertoken',data.body.access_token);
      localStorage.setItem('userName', data.body.userName);
      this.router.navigate(['/home']);
      if (data.ok == true) {
        console.log("user registered");
        //this.resetForm(form);
        this.toastr.success('User login successful');
      }
       
      //this.toastr.error(data.Errors[0]);
    },(error: any) => { 
      console.log(error);
      this.toastr.error('User name or password is not correct');
      this.isLoginError = true; 
    });
  }

}
