import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../global.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-program-add',
  templateUrl: './program-add.component.html',
  styleUrls: ['./program-add.component.css']
})
export class ProgramAddComponent implements OnInit {

  ProgramForm: FormGroup;
  data = false;

  constructor(private dataService: GlobalService, private router: Router, public fb: FormBuilder) { }

  ngOnInit(): void {
    this.ProgramForm = this.fb.group({
      name: [''],
      description: ['']
    })
  }

  onFormSubmit(ProgramForm) {
    this.dataService.AddProgram(this.ProgramForm.value).subscribe(res => {
      console.log('Program created!')
      this.router.navigateByUrl('/coach')})     
  }

}
