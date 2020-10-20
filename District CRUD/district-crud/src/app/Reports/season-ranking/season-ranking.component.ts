import { Component, OnInit } from '@angular/core'; import { Chart } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';
import { ReportsService } from '../../reports.service';
import { mergeMap, groupBy, map, reduce } from 'rxjs/operators';
import { of } from 'rxjs';
import { stringify } from 'querystring';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Ranking } from '../../models/ranking';
import { NgForm } from '@angular/forms';
import { Season } from '../../models/Season';
import { take } from 'rxjs/operators';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-season-ranking',
  templateUrl: './season-ranking.component.html',
  styleUrls: ['./season-ranking.component.scss']
})
export class SeasonRankingComponent implements OnInit {

  StartDate: Date;
  chart=[];
  season:any;
  EndDate: Date;
  name: string;
  OwnerArray: Ranking[] = [];
  model: any = {};
  selectedAthlete: any;
  totalList =Ranking.length;
  data:any;

  constructor(private service: ReportsService) { }

  ngOnInit(): void {
    this.GetCompetition();
    //this.totalList=0;
    //this.GenerateTable(id, StartDate, EndDate);
  }

  GenerateTable(Seasons): void {

    this.service.getRankingPerSeason(Seasons).subscribe((res:any) =>{
      console.log(res);
      this.data=true;
      if (res.error) {
        alert("This item does not exist Please Check Parameters and try again");
      } else{ 
      res.forEach(element => {
          
        var owner = new Ranking();
        owner.Athlete_ID = element.Athlete_ID;
        owner.Surname = element.Surname;
        owner.Points = element.Points;
        owner.Records = element.Records;
        this.OwnerArray.push(owner);
        })
      }
    }
      )
      
        
  
    }//ngOnInit
 
  Events: Season[] = [];
  GetCompetition() {
    this.service.getSeason().pipe(take(1)).subscribe((Season) => {
      this.Events = Season;
    })
  }
  Check(id, StartDate, EndDate) {
    
    console.log(this.totalList);
   // this.GenerateTable(id, StartDate, EndDate);
    console.log(this.totalList)
    if (this.totalList = 0) {
      console.log(this.totalList);
      window.alert('this athlete does not exist please check your parameters');
    
    }

    //  else  {
    // //   alert("this athlete does not exist please check your parameters")
    // console.log(this.totalList);
    //  this.GenerateTable(id, StartDate, EndDate);
    // }
  }      
  SubmitRequest(Seasons) {
    var tTitle = "Season Performances";


    this.service.getRankingPerSeason(Seasons)
      .subscribe((response: Ranking[]) => {
        // this.athletes = response.AthletePerformance;
        let keys = response.map(d =>d.Athlete_ID);
        let values = response.map(d => d.Points);
       // let data = response.map(d => d.Event)
       // this.athletes = response['DynamicUsers'];
        this.chart = new Chart('canvas', {
          type: 'pie',
          data: {
            labels:keys,
              

            datasets: [
              {
                data: values,
                
                fill: false,
                backgroundColor: [
                  "#39ff14",
                  "#04d9ff",
                  "#ff5721",
                  "#fe019a",
                  "#bc13f3",
                  "#ff073a",
                  "#cfff04",
                  "#ff0055",
                  "#48929B",
                  "#003171",
                  "#FFDDCA",
                  "#D9B611",
                  "#ff5555",

                ] 
              }
            ]
          },
          options: {

            title: { display: true, text: tTitle },
          }
        })
      })
  } 
   random_rgba(){
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + + o(r()*s) + ',' + o(r()*s) + ', 0.7)';
  }      
  Refresh(){
window.location.reload;
  }

}
