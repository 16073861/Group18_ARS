import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../../register.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-forgot-paassword',
  templateUrl: './forgot-paassword.component.html',
  styleUrls: ['./forgot-paassword.component.css']
})
export class ForgotPaasswordComponent implements OnInit {

  UserList: User[];
  UserForm: any;
  Email: string;

  constructor(public router: Router, public EmailService: RegisterService) { }

  ngOnInit(): void {
  }

  checkEmail(email: string) {
    console.log(email);
    // this.EmailService.GetUserEmail(email).subscribe((data) => {
    //   this.UserList = data as User[];
    //   console.log(this.UserList, 'list');
    //   console.log(data, 'data');
    // });

    this.EmailService.ForgotPassword(email).subscribe((res: any) => {
      if (res == 'NotFound') {
        alert('This email does not exist, please try again');
      } else {
        alert('Email sent!');
      }
    });

    
    this.router.navigate(['/forgotpassword', { EMAIL: email }]);
  }

  return() {
    this.router.navigate(['/login']);
  }

}
