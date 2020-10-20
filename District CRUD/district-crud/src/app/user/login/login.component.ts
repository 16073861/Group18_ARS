import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/register.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  thisForm: any;
  Email:any
  Password:any;
  model: any = {};
  errorMessage: string;
  variable: any;
  User:User;
  data:any;
  UserForm:any;

  constructor(private router: Router, public userService: RegisterService) { }
  ngOnInit(): void {
this.userService.UserForm ={
  Email:'',
  Password:''
}


    if (localStorage.getItem('UserToken') != null) {
      this.router.navigate(['/']);
    }
 
  }
  OnformSubmit(UserForm) {
const user=this.userService.UserForm;
console.log(this.userService.UserForm);
this.LoginUser(user)
  }
  Login() {
    console.log('Are we within?');
    this.userService.LogIn(this.model.Email, this.model.Password).subscribe(
      (data: any) => {

        localStorage.setItem('UserToken', data.access_token);
        this.GetUserID(this.model.Email);
        console.log(localStorage.getItem("UserID"));
        
        this.GetUserRole(this.model.Email);
        console.log(localStorage.getItem("UserRole"));
        this.variable = localStorage.getItem("UserRole");
       
       // this.variable = localStorage.getItem("UserID");
        this.router.navigate(['/']);
      },
      error => {
        this.errorMessage = 'Username or Password is Incorrect';
      }
    )



    
  }// End of Login

  LoginUser(user:User) {
    this.userService.Login(user).subscribe((res: any) => {
      console.log(res);
      this.data = true;
      //this.message = 'Saved';
      if (res.Enter) {
        //this.userService.LoggedIn = true;
        //this.router.navigate(['/user'])
        localStorage.setItem('UserToken', res.Token);
        const helper = new JwtHelperService();
        const DecodedToken = helper.decodeToken(res.Token);
        localStorage.setItem('UserID', DecodedToken.User_ID);
        localStorage.setItem('Type_ID', DecodedToken.Type_ID);
        localStorage.setItem('UserRole', DecodedToken.Role);
        localStorage.setItem('Log', "1");
        console.log(localStorage.getItem('UserRole'));
        localStorage.setItem('UserEmail', res.Email);
        console.log(localStorage.getItem('UserEmail'));
       // localStorage.setItem('RefreshToken', res.RefreshToken);

       // var logoutTimer = new LogoutTimer( DecodedToken.exp ,  true)
        //this.userService.LoginSubject.next(logoutTimer);

        // this.LoginService.TokenSubject.next(DecodedToken.exp);
        // this.LoginService.LogInSubject.next(true);
        // var app = new AppComponent(this.LoginService, this.router);
        // app.ngOnInit();
        this.router.navigate(['/']);
      } else {
        //this.router.navigate(['/login']);
        this.errorMessage = 'Username or Password is Incorrect';
      }
    });
  }

  GetUserRole(UserEmail) {

    this.userService.GetUserRole(UserEmail).subscribe(

      (data: any) => {
        console.log(data)
        localStorage.setItem('UserRole', data);
        console.log(localStorage.getItem('UserRole'));
      }

    )

  }
  GetUserID(UserEmail) {

    this.userService.GetUserID(UserEmail).subscribe(

      (data: any) => {
        console.log(data)
        localStorage.setItem('UserID', data);
        console.log(localStorage.getItem('UserID'));
      }

    )

  }

}