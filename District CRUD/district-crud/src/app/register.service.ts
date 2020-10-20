import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { Admin } from './models/admin'
import { User } from './models/user';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  url: string;
  rootUrl: string;
  token: string;
  header: any;
  option: any;
  UserForm: any;

  constructor(private http: HttpClient) {
    this.url = "https:/localhost:6087/api/User/";
    this.rootUrl = "http://localhost:6087/";
    const headerSettings: { [name: string]: string | string[] } = {};

    this.header = { 'Authorization': 'bearer ' + localStorage.getItem('UserToken') }
    let headers = new HttpHeaders({ 'Authorization': 'bearer ' + localStorage.getItem('UserToken') })
    this.option = { headers: headers };

  } //Constructor
  // CheckEmail() {
  //   return this.http.get(this.rootUrl + "api/User/CheckEmail?email");
  // }


  Login(user :User){
    //var data=
   // "Email=" + Email + "&Password" + Password + "&grant_type=Password";
    var reqHeader = new HttpHeaders({
      "Content-Type": "application/x-www-urlencoded",  });
   console.log(user);
   return this.http.post("http://localhost:6087/api/User/LogIn", user);
  }

  LogIn(userName, password,/*Type_ID:number*/) {
    var data =
      "UserName=" + userName + "&Password=" + password + "&grant_type=password" /*+'Type_ID='+Type_ID*/;
    var reqHeader = new HttpHeaders({
      "Content-Type": "application/x-www-urlencoded",
      // "No-Auth": "True"
    });
    return this.http.post(this.rootUrl +'token', data, { headers: reqHeader });
  }// End of Login

  RegisterUser(register: User, selection: number) {

    const httpOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    return this.http.post<User>(
      "http://localhost:6087/api/User/AddUser?selection=" + selection,
      register,
      httpOptions
    );
  }// End of Register User

  GetUserRole(Email) {
    return this.http.get(this.rootUrl + 'getUserRole?Email=' + Email);
  }
  GetUserID(UserEmail) {
    return this.http.get( this.rootUrl +'api/Values/GetUserID?UserEmail=' + UserEmail);
  }
  GetAnime(): Observable<Admin[]> {
    // console.log(this.header);
    // const headers = { 'Authorization': 'bearer ' + localStorage.getItem('UserToken') }
    return this.http.get<Admin[]>(this.url + 'GetAllAnime/'/* { headers }*/);
  }

  AddAnime(newAnime: Admin) {
    // console.log(this.option)
    return this.http.post(this.url + 'AddAnime/', newAnime,/* this.option*/);
  }

  UpdateAnime(EditedAnime: Admin) {
    return this.http.post(this.url + 'UpdateAnime/', EditedAnime, this.option);
  }// Update anime

  DeleteAnime(id: number) {
    return this.http.delete(this.url + 'UpdateUser{id}/?id=' + id, this.option)
  }

  UpdateUser(user: User, id: number) {
    return this.http.put(this.url + `UpdateUser{id}?id=${id}`, user);
  }
  ForgotPassword(Email: string) {
    return this.http.post<User[]>('http://localhost:6087/api/User/ForgotPassword?email=' + Email,null);
  }
  ChangePassword(email: string, user: User) {
    return this.http.post(this.url + 'ResetPassword?email=' + email, user);
  }

  GetProfile( Email){
    return this.http.get<any[]>(this.rootUrl+ 'api/User/getProfile?Email='+Email);
  }

}
