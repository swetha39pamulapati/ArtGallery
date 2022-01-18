import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
//import 'rxjs/add/operator/map';
import { AddExternalLogin, loginUser, User } from '../model/user.model';

@Injectable()
export class UserService {
  readonly rootUrl = 'http://localhost:44363';
  constructor(private http: HttpClient) { }

  registerUser(user : User){
    const body = {
      
      Email: user.registerEmail,
      Password: user.registerPassword,
      ConfirmPassword: user.registerConfirmPassword
    }
    return this.http.post('https://localhost:44363/api/account/register',body,
    {headers: new HttpHeaders({
               'Content-Type': 'application/json'
           }), 
           observe: "response"});
  }
  addExternalLogin(externalLogin:AddExternalLogin){
   
    const body = {
      
      ExternalAccessToken : externalLogin.ExternalAccessToken
    }
    return this.http.post('https://localhost:44363/api/account/AddExternalLogin',body,
    {headers: new HttpHeaders({
               'Content-Type': 'application/json'
           }), 
           observe: "response"});
  }
  loginUser(user:loginUser){
    //var data = "username="+encodeURIComponent(user.loginUserName) +"&password=" + encodeURIComponent(user.loginPassword) +
    //"&grant_type=password"
   
    return this.http.post('https://localhost:44363/token', "userName=" + encodeURIComponent(user.loginUserName) +
    "&password=" + encodeURIComponent(user.loginPassword) +
    "&grant_type=password",
    {headers: new HttpHeaders({
               'Content-Type': 'application/x-www-form-urlencoded'
           }), 
           observe: "response"});
  }

 }
