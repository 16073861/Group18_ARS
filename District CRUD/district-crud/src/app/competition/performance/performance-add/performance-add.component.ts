import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalService } from '../../../global.service';
import { Event } from '../../../models/event';
import { Heat } from '../../../models/heat';
import { Medal } from '../../../models/medal';
import { AgeGroup } from '../../../models/ageGroup';
import { Competition } from '../../../models/competition';
import { Athlete } from '../../../models/athlete';

@Component({
  selector: 'app-performance-add',
  templateUrl: './performance-add.component.html',
  styleUrls: ['./performance-add.component.css']
})
export class PerformanceAddComponent implements OnInit {

  performanceForm: FormGroup;
  data = false;
  events: Event[] = [];
  Heats: Heat[] = [];
  Medals: Medal[] = [];
  Ages: AgeGroup[] = [];
  Competitions: Competition[] = [];
  Athletes: Athlete[] = [];

  constructor(private dataService: GlobalService, private router: Router, public fb: FormBuilder) { }

  ngOnInit(): void {
    this.performanceForm = this.fb.group({
      result: [''],
      date: [''],
      athlete_id: [''],
      age_id: [''],
      event_id: [''],
      heat_id: [''],
      medal_id: [''],
      competition_id: [''],
      point: [''],
    })

    this.dataService.getEvent()
      .subscribe(data => data.forEach(element => {
        var nevent = new Event();
        nevent.Event_ID = element.Event_ID;
        //nevent.EventType_ID = element.EventType_ID;
        //nevent.Unit_ID = element.Unit_ID;
        nevent.Description = element.Description;
        this.events.push(nevent);
      }))

    this.dataService.getHeat()
      .subscribe(data => data.forEach(element => {
        var nHeat = new Heat();
        nHeat.Heat_ID = element.Heat_ID;
        nHeat.Heat = element.Heat;
        this.Heats.push(nHeat);
      }))

    this.dataService.getMedal()
      .subscribe(data => data.forEach(element => {
        var nMedal = new Medal();
        nMedal.Medal_ID = element.Medal_ID;
        nMedal.Medal = element.Medal;
        this.Medals.push(nMedal);
      }))

    this.dataService.getAgeGroup()
      .subscribe(data => data.forEach(element => {
        var nAge = new AgeGroup();
        nAge.Age_ID = element.Age_ID;
        nAge.Age_Group = element.Age_Group;
        this.Ages.push(nAge);
      }))

    this.dataService.getCompetition()
      .subscribe(data => data.forEach(element => {
        var nComp = new Competition();
        nComp.Competition_ID = element.Competition_ID;
        //nComp.Club_ID = element.Club_ID;
        //nComp.District_ID = element.District_ID;
        //nComp.Venue_ID = element.Venue_ID;
        //nComp.CompetitionType_ID = element.CompetitionType_ID;
        nComp.Name = element.Name;
        nComp.Date = element.Date;
        this.Competitions.push(nComp);
      }))

    this.dataService.getAthlete()
      .subscribe(data => data.forEach(element => {
        var nAthlete = new Athlete();
        nAthlete.Athlete_ID = element.Athlete_ID;
        //nAthlete.Club_ID = element.Club_ID;
        //nAthlete.Gender_ID = element.Gender_ID;
        //nAthlete.Status_ID = element.Status_ID;
        //nAthlete.User_ID = element.User_ID;
        nAthlete.Name = element.Name;
        nAthlete.Surname = element.Surname;
        nAthlete.Description = element.Description;
        nAthlete.Points = element.Points;
        this.Athletes.push(nAthlete);
      }))
  }

  onFormSubmit(performanceForm) {
    //alert(JSON.stringify(this.performanceForm.value))
    this.dataService.AddPerformance(this.performanceForm.value).subscribe(res => {
      console.log('Performance created!')
      this.router.navigateByUrl('/performance')})     
  }

}
