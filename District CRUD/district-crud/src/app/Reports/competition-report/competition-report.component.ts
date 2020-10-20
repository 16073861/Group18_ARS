import { Component, OnInit } from '@angular/core'; import { Chart } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';
import { ReportsService } from '../../reports.service';
import { mergeMap, groupBy, map, reduce } from 'rxjs/operators';
import { of } from 'rxjs';
import { stringify } from 'querystring';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Competition } from '../../models/competitionRep';

@Component({
  selector: 'app-competition-report',
  templateUrl: './competition-report.component.html',
  styleUrls: ['./competition-report.component.scss']
})
export class CompetitionReportComponent {

  title = 'hw4-frontend';

  chart = [];
  Insurance: Object;
  Insurances;
  start:any;
  end:any;
  Options = [
    { id: 1, text: "Insurance" },
  ]
  OwnerArray: Competition[] = [];

  constructor(private service: ReportsService) { }

  DownloadsPDF() {
    // this.service.GetCompetiotionReportData(Start,End).subscribe(res => {
    //   var doc = new jsPDF.jsPDF();

    //   var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
    //   var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();

    //   //let length = res['DynamicUsers'].length;
    //   //let titles = res['DynamicUsers'].map(z => z.Name);
    //   //let totals = res['DynamicUsers'].map(z => z.Venue);

    //   let finalY = 120;
    //   //var newCanvas = <HTMLCanvasElement>document.querySelector('#canvas');

    // // var newCanvasImg = newCanvas.toDataURL("image/png", 1.0);
    //   var newTable = <HTMLCanvasElement>document.querySelector('#insuranceReport');
    //   var newTableImg = newTable.toDataURL("image/png", 1.0);

    //   doc.setFontSize(35)

    //   doc.text("Insurance Report", (pageWidth / 2) - 30, 15)
    //   // doc.addImage(newCanvasImg, 'PNG', 25,25,160,100);
    //   doc.addImage(newTableImg, 'PNG', 25, 25, 160, 100);
    //   doc.setFontSize(14)
    //   for (let i = 0; i < length; i++) {
    //    // doc.text(titles /*+" (Total: "+ totals + ")", */, (pageWidth / 2) * 15, finalY + 23)
    //     //@ts-ignore
    //     doc.autoTable({
    //       startY: finalY + 25, html: '#insuranceReport', useCss: true, head: [
    //         [' Name', 'CompetitionType', 'District', 'Venue']
    //       ]
    //     })
    //     //@ts-ignore
    //     finalY = doc.autoTable.previous.finalY


    //     doc.save('table.pdf');
    //   }}
    //   );


  }

  GenerateTable(StartDate,EndDate): void {

    this.service.GetCompetiotionReportData(StartDate,EndDate).subscribe((data) =>
      data.forEach(element => {

        var owner = new Competition();
        owner.Name = element.Name;
        owner.CompetitionType = element.CompetitionType;
        // owner.Name = element.Name;
        owner.District = element.District;
        owner.Venue = element.Venue;

        //this.oldData = element;
        this.OwnerArray.push(owner);
      })
    )

  }//ngOnInit

  // random_rgba(){
  //   var o = Math.round, r = Math.random, s = 255;
  //   return 'rgba(' + o(r()*s) + ',' + + o(r()*s) + ',' + o(r()*s) + ', 0.7)';
  // }
  DownloadPDF(StartDate,EndDate) {
    this.service.GetCompetiotionReportData(StartDate,EndDate).subscribe((response: any) => {
      this.Insurances = response;
      console.log(this.Insurances)
    })
  }
  Refresh(){
    window.location.reload();
      } 
}
