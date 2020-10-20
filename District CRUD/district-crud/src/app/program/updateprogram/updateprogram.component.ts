import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup} from '@angular/forms'
import { GlobalService } from '../../global.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Program } from '../../models/program';

@Component({
  selector: 'app-updateprogram',
  templateUrl: './updateprogram.component.html',
  styleUrls: ['./updateprogram.component.css']
})
export class UpdateprogramComponent implements OnInit {
  data: Program;
  AgencyForm: FormGroup;
  ID: number;
  message: string;
  submitted = false;


  constructor(
    private formbulider: FormBuilder,
    private dataService: GlobalService,
    private route: ActivatedRoute,
    private router: Router,

  ) { /*/this.data = new Coach(); */}



  datas:any
  ngOnInit(): void {
    this.ID = this.route.snapshot.params["Program_ID"];
    this.data= JSON.parse(localStorage.getItem('program'));
   
    this.AgencyForm = this.formbulider.group({
      
      Program_ID: [this.data.Program_ID,Validators.required],
      Coach_ID: [this.data.Coach_ID,Validators.required],
      Name: [this.data.Name,Validators.required],
      Description: [this.data.Description,Validators.required]
    });
  }
    
  // onFormSubmit(AgencyForm) {
  //   const agency = AgencyForm.value;
  
  // }//onFormSubmit

  UpdateAgency() {
    const tprogram  = {
      Program_ID : this.AgencyForm.get('Program_ID').value,
      Coach_ID : this.AgencyForm.get('Coach_ID').value,
      Name : this.AgencyForm.get('Name').value,
      Description : this.AgencyForm.get('Description').value,
      
      //Coach_ID : this.AgencyForm.get('Coach_ID').value
  
    }
    
    }
  
  /* UpdateAgency(agency : Coach)
   {
     this.dataService.UpdateOwner(agency).subscribe(()=>{
           this.data = true;
           this.message = "Agency has been successfully updated boiii !";
           this.AgencyForm.reset;
           this.router.navigate(['/coach-read']);
     });
   }//UpdateAgency*/

  GoToList() {
    this.router.navigate(['/Readprogram']);
  }//GoToList
}
