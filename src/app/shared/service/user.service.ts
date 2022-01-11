import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
//import 'rxjs/add/operator/map';
import { loginUser, User } from '../model/user.model';

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
  //   return this.http.post<User>(this.rootUrl + '/api/Account/Register/',body, {
  //     headers: new HttpHeaders({
  //         'Content-Type': 'application/json'
  //     })
  // })
    return this.http.post('https://localhost:44363/api/account/register',body,
    {headers: new HttpHeaders({
               'Content-Type': 'application/json'
           }), 
           observe: "response"});
  }
  // loginUser(user:loginUser) {
  //   const headers = new HttpHeaders();
  //   headers.append('Accept', 'application/json');
  //   headers.append('Content-Type', 'application/x-www-form-urlencoded');
  //   headers.append( 'No-Auth', 'True');
    
  //   const body = new URLSearchParams();
  //   body.set('username', user.loginUserName);
  //   body.set('password', user.loginPassword);
  //   body.set('grant_type', 'password');
    
  //   return this.http.post(
  //       this.rootUrl + '/token'
  //      , body.toString()
  //      , { headers: headers , observe: "response"}
  //     );
  //   }
     
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
