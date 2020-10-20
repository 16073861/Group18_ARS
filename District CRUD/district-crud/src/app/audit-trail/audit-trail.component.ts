import { Component, OnInit } from '@angular/core';
import { AuditTrailService } from '../audit-trail.service';
import { AuditTrail } from '../models/audit-trail';
import { Router } from '@angular/router';


@Component({
  selector: 'app-audit-trail',
  templateUrl: './audit-trail.component.html',
  styleUrls: ['./audit-trail.component.scss']
})
export class AuditTrailComponent implements OnInit {

  constructor(public route: Router, private auditTrailService : AuditTrailService) { }

  AuditList : AuditTrail[] = [];
  public values = [];
  AuditForm : AuditTrail;
  public TempArray : AuditTrail[] = [];
  public SearchArray: AuditTrail[] =[];
  isArrayStored : boolean = false;

  ngOnInit(): void {
    this.GetAudits();
  }

  GetAudits(){
    this.auditTrailService.GetAudits().subscribe((data) => {
      this.AuditList = data as AuditTrail[];
      console.log(this.AuditList)
    })
  }


  SearchAudits(event: any) {
    if (this.isArrayStored == false) {
      this.TempArray = this.AuditList.slice();
      this.isArrayStored = true;
    }

    //debugger;
    if (event.target.value != '') {
      this.SearchArray = [];
      this.AuditList = this.TempArray;
      //this.TempArray = [];
      //var destinationArray = Array.from(sourceArray);

      const filterValue = event.target.value;
      this.SearchArray = this.AuditList.filter(x => Object.keys(x).some(k => x[k] != null && 
        x[k].toString().toLowerCase()
        .includes(filterValue.toLowerCase())));

      this.AuditList = this.SearchArray;
    } else {
      this.AuditList = this.TempArray.slice();
      this.SearchArray = [];
    }
  }

}
