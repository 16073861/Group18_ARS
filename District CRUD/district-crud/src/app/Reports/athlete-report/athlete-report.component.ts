import { Component, OnInit } from '@angular/core'; import { Chart } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';
import { ReportsService } from '../../reports.service';
import { mergeMap, groupBy, map, reduce } from 'rxjs/operators';
import { of } from 'rxjs';
import { stringify } from 'querystring';
import * as jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
//import {} from 'chart.js';
import { AthletePerformance } from '../../models/athlete-performance';
import { NgForm } from '@angular/forms';
import { Athlete } from '../../models/athleteRep';
import { take } from 'rxjs/operators';
import { ThrowStmt } from '@angular/compiler';
import { Event } from '../../models/eventRep';

@Component({
  selector: 'app-athlete-report',
  templateUrl: './athlete-report.component.html',
  styleUrls: ['./athlete-report.component.scss']
})
export class AthleteReportComponent implements OnInit {

  constructor(private service: ReportsService) { }

  Start: Date;
  errorMessage: string;
  id: any;
  chart = [];
  End: Date;
  athletes: object;
  name: string;
  OwnerArray: AthletePerformance[] = [];
  array: AthletePerformance;
  model: any = {};
  selectedAthlete: any;
  totalList: any;

  ngOnInit(): void {
    this.GetCompetition();
    this.totalList = 0;
    this.getEvents();
    //this.totalList=this.OwnerArray.length;

    // this.GenerateTable(id, StartDate, EndDate);
  }
  
  data:any;
  GenerateTable(id, StartDate, EndDate, Event) {
    this.service.GetAthleteReport(id, StartDate, EndDate, Event).subscribe((res:any) => {
      console.log(res);
      this.data=true;
      if (res.error) {
        alert("This item does not exist Please Check Parameters and try again");
      } else{
        res.forEach(element => {
          var owner = new AthletePerformance();
          owner.Athlete = element.Athlete;
          owner.Competition = element.Competition;
          owner.Event = element.Event;
          owner.Date = element.Date;
          owner.Heat = element.Heat;
          owner.Performance = element.Performance;
          this.OwnerArray.push(owner);

        })
        this.SubmitRequest(id, StartDate, EndDate, Event);
      }
    }
    )


    // if(this.totalList = 0) {
    // console.log(this.totalList);
    //   window.alert('this athlete does not exist please check your parameters')

    // }
    // else{

    // }

  }//ngOnInit
  Events: Event[] = [];
  getEvents() {
    this.service.getAllEvents().pipe(take(1)).subscribe((Event) => {
      this.Events = Event;
    })
  }

  Check(id, StartDate, EndDate, Event) {
    //this.GenerateTable(id, StartDate, EndDate,Event);
    this.totalList = this.GenerateTable.length;
    console.log(this.totalList);
    if (this.totalList > 0) {
      this.GenerateTable(id, StartDate, EndDate, Event)
      this.SubmitRequest(id, StartDate, EndDate, Event);
    }
    else {
      alert('These Items do not exist please check and re-enter your parameters');
    }
  }
  Athletes: Athlete[] = [];
  GetCompetition() {
    this.service.getAthlete().pipe(take(1)).subscribe((Athlete) => {
      this.Athletes = Athlete;
    })
  }


  DownloadPDF(id, StartDate, EndDate, Event) {
    this.service.GetAthleteReport(id, StartDate, EndDate, Event).subscribe((response: any) => {
      this.athletes = response;
      console.log(this.athletes)
    })


    this.service.GetAthleteReport(id, StartDate, EndDate, Event)
  } //.subscribe(res =>
  // {
  //   this.athletes = res;
  //   console.log(this.athletes)
  // })

  SubmitRequest(id, StartDate, EndDate, Event) {
    var tTitle = "Mapped Performances";


    this.service.GetAthleteReport(id, StartDate, EndDate, Event)
      .subscribe((response: AthletePerformance[]) => {
        // this.athletes = response.AthletePerformance;
        let keys = response.map(d => d.Date);
        let values = response.map(d => d.Performance);
        let data = response.map(d => d.Event)

        this.athletes = response['DynamicUsers'];
        this.chart = new Chart('canvas', {
          type: 'line',
          data: {
            labels: keys,
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
  DownloadsPDF(id, StartDate, EndDate, Event) {
    this.service.GetAthleteReport(id, StartDate, EndDate, Event).subscribe((res: AthletePerformance[]) => {
      var doc = new jsPDF.jsPDF();

      var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
      var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();

      let length = res.length;
      let titles = res.map(z => z.Date);
      let totals = res.map(z => z.Performance);

      let finalY = 120;
      var newCanvas = <HTMLCanvasElement>document.querySelector('#canvas');
      // this.GenerateTable(id, StartDate, EndDate);
      var newCanvasImg = newCanvas.toDataURL("image/png", 1.0);

      doc.setFontSize(40)

      doc.text("Athlete Report", (pageWidth / 2) - 30, 15)
      doc.addImage(newCanvasImg, 'PNG', 25, 25, 160, 150);

      doc.setFontSize(14)

      doc.text(titles + " (Total: " + totals + titles + ")", (pageWidth / 2) * 15, finalY + 23)
      //@ts-ignore
      doc.autoTable({
        startY: finalY + 25, html: '#AthleteReport', useCss: true, head: [
          ['Date', "Performance"]]
      })
      //@ts-ignore
      finalY = doc.autoTable.previous.finalY

      // }

      doc.save('Athlete Graph.pdf');
    });
  }

  random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r() * s) + ',' + + o(r() * s) + ',' + o(r() * s) + ', 0.7)';
  }
  Refresh() {
    window.location.reload();
  }
}
