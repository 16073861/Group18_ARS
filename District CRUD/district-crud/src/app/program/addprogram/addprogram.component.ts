import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GlobalService } from '../../global.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
//import { Coach } from '../coach';
import { Program } from 'src/app/models/program';

@Component({
  selector: 'app-addprogram',
  templateUrl: './addprogram.component.html',
  styleUrls: ['./addprogram.component.css']
})
export class AddprogramComponent implements OnInit {

  constructor( private formBuilder : FormBuilder , 
    private LandlordsServeService : GlobalService , 
    private route : ActivatedRoute ,
    private router : Router ,) { }

    OwnerForm : any;
    ID : number;
    data = false;
    message : string;
  
    ngOnInit(): void {
    
      this.OwnerForm = this.formBuilder.group({
       
        Program_ID : ['' , Validators.required],
        Coach_ID : ['' , [Validators.required]],
        Name : ['' , [Validators.required]],
        Description : ['' , [Validators.required]],
      })
    }//ngOnInit
  
    onFormSubmit(OwnerForm)
    {
      const owner = OwnerForm.value;
      this.CreateOwner(owner)
    }//onFormSubmit
  
    CreateOwner(owner : Program)
    {
  }//CreateOwner
  
  GoToList(){
      this.router.navigate(['/Readprogram'])
    }//goToList
}
