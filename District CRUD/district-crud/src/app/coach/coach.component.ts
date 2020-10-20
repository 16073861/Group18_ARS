import { Component, OnInit } from '@angular/core';
import { Program } from '../models/program';
import { GlobalService } from '../global.service';
import { Router } from '@angular/router';
import { FormGroup, NgForm, FormBuilder } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { CompetitionList } from '../models/CompetitionList';

@Component({
  selector: 'app-coach',
  templateUrl: './coach.component.html',
  styleUrls: ['./coach.component.css']
})
export class CoachComponent implements OnInit {

  programs: Program[] = [];
  CompetitionForm: FormGroup;
  clEmailForm: FormGroup;

  constructor(private _GlobalService: GlobalService, private router: Router, private http: HttpClient, public fb: FormBuilder) {}

  onEdit(ids: number) {
    this.router.navigate(['/programEdit', { id: ids }])
  }
  
  onDelete(id: number, olddata: Program){
    this._GlobalService.deleteProgram(id, olddata)
      .subscribe(() => {
      this.programs = [];
      this.ngOnInit();
    })
  }
  
  ngOnInit() {
    
    this.clEmailForm = this.fb.group({
      to: [''],
      subject: [''],
      body: ['Competition List for dd/mm/yyyy:\n\n#  |     Athlete     |     Event     |     Time\n']
    })

    this._GlobalService.getProgram()
        .subscribe(data => data.forEach(element => {
          var nprog = new Program();
          nprog.Program_ID = element.Program_ID;
          nprog.Coach_ID = element.Coach_ID;
          nprog.Name = element.Name;
          nprog.Description = element.Description;
          this.programs.push(nprog);
        }))
  }

  onFormSubmit(clEmailForm){   
    this._GlobalService.clEmail(this.clEmailForm.value).subscribe(res => {
      console.log(this.clEmailForm.value)})
  }

//  ngForms email. Didn't work
//  onSubmit(contactForm: NgForm) {
//      const email = contactForm.value;
//      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
//      this.http.post('https://formspree.io/f/xaylqolq',
//        { name: email.name, replyto: email.email, message: email.messages },
//        { 'headers': headers }).subscribe(
//          response => {
//            console.log(response);
//          }
//        );    
//  }
  
}
