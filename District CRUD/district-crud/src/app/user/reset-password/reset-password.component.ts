import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { RegisterService } from '../../register.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../models/user';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(public route: ActivatedRoute, public router: Router, public PasswordService: RegisterService) { }

  UserForm: any;
  Email: any;
  User: User;
  Password: any;

  ngOnInit(): void {
    this.UserForm = new FormGroup({
      Password: new FormControl('', [
        Validators.required
      ]),
      ConfirmPassword: new FormControl(),
    });

    this.route.paramMap.subscribe((params: ParamMap) => {
      let email = params.get('EMAIL');
      this.Email = email;
      console.log(email);
    });
  }

  onFormSubmit(UserForm) {
    const user = UserForm.value;
    console.log(user.Password);
    this.UpdatePassword(this.Email, user);
  } //onFormSubmit

  UpdatePassword(email: string, user: User) {
    // user.UserTypeID = this.UserTypeID;
    this.PasswordService.ChangePassword(email, user).subscribe(() => {
      this.UserForm.reset;
    });
    this.router.navigate(['/login']);
  }

  return() {
    this.router.navigate(['/login']);
  }

}
