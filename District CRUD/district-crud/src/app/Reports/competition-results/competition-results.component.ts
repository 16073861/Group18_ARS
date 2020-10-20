import { Component, OnInit } from '@angular/core'; import { Chart } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';
import { ReportsService } from '../../reports.service';
import { mergeMap, groupBy, map, reduce } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { stringify } from 'querystring';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { AthletePerformance } from '../../models/athlete-performance';
import { CompetitionPerformances } from '../../models/competition-performances';
import { Competition } from '../../models/competitionRep';
import { take } from 'rxjs/operators';
import { Event } from '../../models/EventRep';
import { Compe } from '../../models/Comp';
import { NgForm } from '@angular/forms';
import { Heat } from'../../models/heatRep';

@Component({
  selector: 'app-competition-results',
  templateUrl: './competition-results.component.html',
  styleUrls: ['./competition-results.component.scss']
})
export class CompetitionResultsComponent implements OnInit {

  constructor(private service: ReportsService) { }

  StartDate:Date;
  selectedcomp:any;
  selectedevent:any;
  Competition_ID:any;
  CompDate:Date;
  CompName:string;
  name:any;
  heat:any;
  event:any;
  OwnerArray: CompetitionPerformances[] = [];
  model: any = {};

  AuditList : CompetitionPerformances[] = [];
  public values = [];
  AuditForm : CompetitionPerformances;
  public TempArray : CompetitionPerformances[] = [];
  public SearchArray: CompetitionPerformances[] =[];
  isArrayStored : boolean = false;
  TotalList:number;
  data:any;
  EndDate;  

  ngOnInit(): void {
   this.GetCompetition();
   this.getEvents();
   this.getHeat();
  }

  GenerateTable(CompName,Event,Heat): void {

    this.service.GetCompetitionPerformances(CompName,Event,Heat).subscribe((res:any) =>{
    console.log(res);
    this.data=true;
    if (res.error) {
      alert("This item does not exist Please Check Parameters and try again");
    } else{ 
    res.forEach(element => {
        var owner = new CompetitionPerformances();
        owner.Athlete = element.Athlete;
        owner.Surname = element.Surname;
        owner.ID_Number = element.ID_Number;
        owner.Club = element.Club;
        owner.Event = element.Event;
        owner.Heat = element.Heat;

        owner.Performance = element.Performance;

        //this.oldData = element;
        this.OwnerArray.push(owner);
        
      })
    }
  }
    )

      

  }//ngOnInit
  Competitions:Compe[]=[];
 GetCompetition(){
   this.service.getCompname().pipe(take(1)).subscribe((Competiton)=>{
    this.Competitions= Competiton;
   })
 }
 Events:Event[]=[];
 getEvents(){
   this.service.getAllEvents().pipe(take(1)).subscribe((Event)=>{
    this.Events= Event;
   })
 }
 Heats:Heat[]=[];
 getHeat(){
   this.service.GetHeats().pipe(take(1)).subscribe((Heat)=>{
    this.Heats= Heat;
   })
 }
//  SearchAudits(event: any) {
//   if (this.isArrayStored == false) {
//     this.TempArray = this.AuditList.slice();
//     this.isArrayStored = true;
//   }

//   //debugger;
//   if (event.target.value != '') {
//     this.SearchArray = [];
//     this.AuditList = this.TempArray;
//     //this.TempArray = [];
//     //var destinationArray = Array.from(sourceArray);

//     const filterValue = event.target.value;
//     this.SearchArray = this.AuditList.filter(x => Object.keys(x).some(k => x[k] != null && 
//       x[k].toString().toLowerCase()
//       .includes(filterValue.toLowerCase())));

//     this.AuditList = this.SearchArray;
//   } else {
//     this.AuditList = this.TempArray.slice();
//     this.SearchArray = [];
//   }
// }
Refresh(){
  window.location.reload();
    }
}
