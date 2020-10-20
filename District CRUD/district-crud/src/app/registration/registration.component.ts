import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Performance } from '../models/performance';
import { GlobalService } from '../global.service';
import { Event } from '../models/event';
import { Athlete } from '../models/athlete';
import { Competition } from '../models/competition';

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.scss"]
})
export class RegistrationComponent implements OnInit {
    
  CompetitionID: number;
  performances: Performance[] = [];
  events: Event[] = [];
  athletes: Athlete[] = [];
  competitions: Competition[] = [];

  constructor(private dataService: GlobalService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.CompetitionID = id;
    })

    this.dataService.getCompPerformance(this.CompetitionID)
      .subscribe(data => data.forEach(element => {
        var nperf = new Performance();
        nperf.Performance_ID = element.Performance_ID;
        nperf.Result = element.Result;
        nperf.Date = element.Date;
        nperf.Athlete_ID = element.Athlete_ID;
        nperf.Heat_ID = element.Heat_ID;
        nperf.Event_ID = element.Event_ID;
        nperf.Medal_ID = element.Medal_ID;
        nperf.Age_ID = element.Age_ID;
        nperf.Competition_ID = element.Competition_ID;
        this.performances.push(nperf);
      }))  
      
    this.dataService.getEvent()
      .subscribe(data => data.forEach(element => {
        var nevent = new Event();
        nevent.Event_ID = element.Event_ID;
        nevent.EventType_ID = element.EventType_ID;
        nevent.Unit_ID = element.Unit_ID;
        nevent.Description = element.Description;
        this.events.push(nevent);
      }))

    this.dataService.getAthlete()
      .subscribe(data => data.forEach(element => {
        var nathlete = new Athlete();
        nathlete.Athlete_ID = element.Athlete_ID;
        nathlete.Club_ID = element.Club_ID;
        nathlete.Gender_ID = element.Gender_ID;
        nathlete.Status_ID = element.Status_ID;
        nathlete.Name = element.Name;
        nathlete.Surname = element.Surname;
        nathlete.Description = element.Description;
        this.athletes.push(nathlete);
      }))

    this.dataService.getCompetition()
      .subscribe(data => data.forEach(element => {
        var ncomp = new Competition();
        ncomp.Competition_ID = element.Competition_ID
        ncomp.Name = element.Name;        
        this.competitions.push(ncomp);
      }))
  }
}


