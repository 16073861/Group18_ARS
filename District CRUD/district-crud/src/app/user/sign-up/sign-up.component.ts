import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder, AbstractControl, ValidationErrors } from '@angular/forms';
import { debounceTime, tap } from 'rxjs/operators';
import { ErrorStateMatcherService } from 'src/app/error-state-matcher.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { RegisterService } from 'src/app/register.service';
import { HttpClient }from'@angular/common/http';
import { from } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  error: string;
  modal: User;
  RegisterForm: FormGroup;
  ErrorHandler = new ErrorStateMatcherService();
  selection: any;
  httpClient:HttpClient;
  ConfirmPassword: string = '';
  ConfirmationError: string;
  options = [
    { id: 1, data: 'Admin' },
    { id: 2, data: 'Athlete' },
    { id: 3, data: 'Coach' },
    { id: 4, data: 'Technician' },
  ];

  constructor(

    private formbulider: FormBuilder,
    // private dataService : DataService , 
    private route: ActivatedRoute,
    private router: Router,
    // this.RegisterForm = this.formBui
    private userService: RegisterService,

  ) {


  }// Constructor

  ngOnInit(): void {

    this.RegisterForm = this.formbulider.group({

      Name: ["", Validators.required],
      Surname: ["", Validators.required],
      User_role: [this.selection, Validators.required],
      Email: ["", Validators.required],
      Password: ["", Validators.required],
    
      // Password: ["", this.CheckPassword(this.RegisterForm.value.Password, this.ConfirmPassword)],

    });

  }
//check email'
// CheackEmail(control:FormControl){
// clearTimeout(this.duplicateEmailDebounce);
// const q=new Promise((resolve,rejects)=>{
//   this.duplicateEmailDebounce= setTimeout(()=>{
//     this.httpClient.post('https://localhost:6087/"api/User/CheckEmail',{"Email":control.value}).subscribe((resp)=>{
//       resolve({'duplicateEmail':resp['data'].isDuplicate});
//     },()=>{resolve({duplicateEmail:true});});
    
//   },1000)
// });
// return q;
// }
  //------------- Custom validator for Password and Confirm Password ----------------------//

  CheckPassword(Password: string, ConfirmationPassword: string): boolean {

    if (Password == ConfirmationPassword) {
      this.ConfirmationError = '';
      return true;
    }
    else {

      if (this.ConfirmPassword != '') {
        this.ConfirmationError = 'Password and confirmation password do not match';
        return false;
      }

      this.ConfirmationError = '';
      return false;

    }

  }// Check password function
//  CheckEmail(email){
//    this.email.valueChanges.pipe(
//      debounceTime(500),
//      tap( email =>{
//        if(email !== '' && !this.email.invalid){
//         this.email.markAsPending();
//        }
//        else{
//          this.email.setErrors({'invalid':true} );
//        }
//      })
//    ).subscribe( email=>{
//      this.httpClient.get(this.userService.CheckEmail(email).subscribe((users:any[])=>{}))
//    })
//  }
  CreateUser(RegisterForm) {

    this.userService.RegisterUser(RegisterForm.value, this.selection).subscribe(
      () => {
        console.log('User has been registered');
       
      },
    )
    if (this.selection = 1) {
      this.router.navigate([''])

    }

    if (this.selection = 2) {
      this.router.navigate([''])

    }

  }
}