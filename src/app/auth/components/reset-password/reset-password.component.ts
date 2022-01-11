import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm : FormGroup
  constructor() { }

  ngOnInit(): void {
    this.resetPasswordForm = new FormGroup({
      resetPasswordEmail : new FormControl()
      
    });
  }
  resetPassword(form:FormGroup){
    console.log(this.resetPasswordForm.value);
  }

}
