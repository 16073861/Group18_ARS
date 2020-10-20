import { Component, OnInit } from '@angular/core'; import { Chart } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';
import { ReportsService } from '../../reports.service';
import { mergeMap, groupBy, map, reduce } from 'rxjs/operators';
import { of } from 'rxjs';
import { stringify } from 'querystring';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Record } from '../../models/record';

@Component({
  selector: 'app-record-report',
  templateUrl: './record-report.component.html',
  styleUrls: ['./record-report.component.scss']
})
export class RecordReportComponent implements OnInit {

  title = 'hw4-frontend';

  chart = [];
  Insurance: Object;
  Insurances;
  Options = [
    { id: 1, text: "Insurance" },

  ]
  OwnerArray: Record[] = [];

  constructor(private service: ReportsService) { }

  ngOnInit(): void {
  }

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

  GenerateTable(): void {

    this.service.getRecord().subscribe((data) =>
      data.forEach(element => {

        var owner = new Record();
        owner.Event = element.Event;
        owner.Result = element.Result;
        owner.Name = element.Name;
        owner.Surname = element.Surname;
        owner.Date = element.Date;
        //this.oldData = element;
        this.OwnerArray.push(owner);
      })
    )

  }//ngOnInit
  Refresh(){
    window.location.reload();
      } 
  // random_rgba(){
  //   var o = Math.round, r = Math.random, s = 255;
  //   return 'rgba(' + o(r()*s) + ',' + + o(r()*s) + ',' + o(r()*s) + ', 0.7)';
  // }
  DownloadPDF() {
    this.service.getRecord().subscribe((response: any) => {
      this.Insurances = response;
      console.log(this.Insurances)
    })
  }

}
