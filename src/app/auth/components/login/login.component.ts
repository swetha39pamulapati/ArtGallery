import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/shared/service/user.service';
import { Router } from '@angular/router';
import{ToastrService} from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private userService: UserService,private router: Router, private toastr : ToastrService) { }
 

  ngOnInit() {
    this.loginForm = new FormGroup({
      loginUserName : new FormControl(),
      loginPassword: new FormControl(),
    });
  }
  UserLogin(form :FormGroup) : void{
    this.userService.loginUser(form.value)
    .subscribe((data: any) => {
      sessionStorage.setItem('accesstoken',data.body.access_token);
      this.router.navigate(['/register']);
      if (data.ok == true) {
        console.log("user registered");
        //this.resetForm(form);
        this.toastr.success('User login successful');
      }
       else
       console.log("user register failed");
      //this.toastr.error(data.Errors[0]);
    },(error: any) => { console.log(error); });
  }

}
