import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/service/user.service';
import { HttpClient } from '@angular/common/http';
import { CustomvalidationService } from 'src/app/shared/service/customvalidation.service';
import Validation  from 'src/app/shared/custom.validator';
import{ToastrService} from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm : FormGroup;
  submitted = false;
  constructor(private userService: UserService,  private customValidator: CustomvalidationService,private router: Router,private fb: FormBuilder,private toastr :ToastrService) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
      registerEmail: ['', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      registerPassword: ['',
      [Validators.required
        //Validators.minLength(3),
        
      //Validators.pattern("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\]).{8,32}$")
      ]],
      registerConfirmPassword : ['',[Validators.required]]
    },
  { 
    validators: [Validation.match('registerPassword', 'registerConfirmPassword')]
    })
  }
  
  get f() {
    return this.registerForm.controls;
  }
  get registerEmail(){
return this.registerForm.controls;
  }
  register(form :FormGroup){
    this.submitted = true;

        if (this.registerForm.invalid) {
            return;
        }
        else{
    this.userService.registerUser(form.value)
    .subscribe((data: any) => {
      if (data.ok == true) {
        console.log("user registered");
        //this.resetForm(form);
        this.registerForm.reset();
        this.toastr.success('User registration successful');
        //this.router.navigate(['/login']);

      }
    },(error: any) => { 
      console.log(error);
      this.toastr.error(error); 
    });
  }
}

}
