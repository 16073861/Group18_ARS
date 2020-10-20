import { Component, OnInit } from '@angular/core'; import { Chart } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';
import { ReportsService } from '../../reports.service';
import { mergeMap, groupBy, map, reduce } from 'rxjs/operators';
import { of } from 'rxjs';
import { stringify } from 'querystring';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { AthletePerformance } from '../../models/athlete-performance';
import { NgForm } from '@angular/forms';
import { Event } from '../../models/Event';
import { take } from 'rxjs/operators';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-top-lists',
  templateUrl: './top-lists.component.html',
  styleUrls: ['./top-lists.component.scss']
})
export class TopListsComponent implements OnInit {

  StartDate: Date;
  event:any;
  EndDate: Date;
  name: string;
  OwnerArray: AthletePerformance[] = [];
  model: any = {};
  selectedAthlete: any;
  totalList: any;

  constructor(private service: ReportsService) { }

  ngOnInit(): void {
    this.GetCompetition();
    this.totalList=0;
    //this.GenerateTable(id, StartDate, EndDate);
  }

  GenerateTable(Event): void {

    this.service.GetTop10(Event).subscribe((data) =>
      data.forEach(element => {
        var owner = new AthletePerformance();
        owner.Athlete = element.Athlete;
        owner.Competition = element.Competition;
        owner.Date = element.Date;
        owner.Heat = element.Heat;
        owner.Event = element.Event;
        owner.Performance = element.Performance;

        //this.oldData = element;
        this.OwnerArray.push(owner);
        
      })
    )
    

  }//ngOnInit
  Events: Event[] = [];
  GetCompetition() {
    this.service.getAllEvents().pipe(take(1)).subscribe((Athlete) => {
      this.Events = Athlete;
    })
  }
  
  // Check(id, StartDate, EndDate) {
    
  //   console.log(this.totalList);
  //  // this.GenerateTable(id, StartDate, EndDate);
  //   console.log(this.totalList)
  //   if (this.totalList = 0) {
  //     console.log(this.totalList);
  //     window.alert('this athlete does not exist please check your parameters');
    
  //   }

  //    else  {
  //   //   alert("this athlete does not exist please check your parameters")
  //   console.log(this.totalList);
  //    this.GenerateTable(id, StartDate, EndDate);
  //   }
  // }     
  Refresh(){
    window.location.reload();
      }
      
}
