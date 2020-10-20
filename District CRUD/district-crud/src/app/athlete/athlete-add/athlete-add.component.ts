import { Component, OnInit } from '@angular/core';
import { Athlete } from 'src/app/models/athlete';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalService } from '../../global.service';

@Component({
  selector: 'app-athlete-add',
  templateUrl: './athlete-add.component.html',
  styleUrls: ['./athlete-add.component.css']
})
export class AthleteAddComponent implements OnInit {

  constructor(private _GlobalService: GlobalService, private router: Router, public fb: FormBuilder) { }

  AthleteForm: FormGroup;
  data = false;
  Athletes: Athlete[]=[];

  ngOnInit(): void {this.AthleteForm = this.fb.group({
      
    Athlete_id: [''],
    Club_ID: [''],
    Gender_ID: [''],
    Status_ID: [''],
    User_ID: [''],
    Name: [''],
    Surname: [''],
    Description: [''],
    
    
    
  })
  // this._GlobalService.getAthlete()
  //   .subscribe(data => data.forEach(element => {
  //     var nathlete = new Athlete();
  //     nathlete.Athlete_ID = element.Athlete_ID;
  //     nathlete.Club_ID = element.Club_ID;
  //     nathlete.Gender_ID = element.Gender_ID;
  //     nathlete.Status_ID = element.Status_ID;
  //     nathlete.User_ID = element.User_ID;
  //     nathlete.Name = element.Name;
  //     nathlete.Surname = element.Surname;
  //     nathlete.Description = element.Description;
  //     this.Athletes.push(nathlete);
  //   }))
//     this._GlobalService.getVenue()
// .subscribe(data => data.forEach(element => {
//   var nven = new Venue();
//   nven.Venue_ID = element.Venue_ID;
//   nven.Name = element.Name;
//   nven.Capacity = element.Capacity;
//   nven.Athlete_ID = element.Athlete_ID;
//   this.venues.push(nven);
// }))
}

onFormSubmit(AthleteForm) {
  this._GlobalService.AddCompetition(this.AthleteForm.value).subscribe(res => {
    console.log('athlete created!')
    this.router.navigateByUrl('/athlete')})     
}
}
