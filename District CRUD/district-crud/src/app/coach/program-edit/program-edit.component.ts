import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Program } from '../../models/program';
import { GlobalService } from '../../global.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'app-program-edit',
  templateUrl: './program-edit.component.html',
  styleUrls: ['./program-edit.component.css']
})
export class ProgramEditComponent implements OnInit {

  ProgramForm: FormGroup;
  ProgramID: number;
  data = false;

  constructor(private dataService: GlobalService, private route: ActivatedRoute, private router: Router,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.ProgramID = id;
    })

    this.dataService.getProgram()
      .subscribe(data => data.forEach(element => {

        if (element.Program_ID == this.ProgramID) {

          this.ProgramForm = this.fb.group({ 
            id: [element.Program_ID],           
            name: [element.Name],
            description: [element.Description],
          })

        }

      }));
  }

  onFormSubmit(program: Program) {
    this.dataService.updateProgram(this.ProgramID,this.ProgramForm.value).subscribe(res => {
      console.log('Program updated!')
      this.router.navigateByUrl('/coach')}) 
  }
  
}
