import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuditTrail } from './models/audit-trail';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuditTrailService {

  newAudit: AuditTrail;
  currentID: number;
  temp: any;
  url : string;
  header : any;
  option : any;
  rootUrl: string;

  constructor(private http: HttpClient) {
    this.rootUrl = "http://localhost:6087/";
   }

  addAuditTrail(type: number, table: string, dataNew?: any, dataOld?: any){

    this.newAudit = new AuditTrail();

    var descrip = "";
    var tType = "";

    var currentDateTime = new Date();
    var date = currentDateTime.getFullYear()+'/'+(currentDateTime.getMonth()+1)+'/'+currentDateTime.getDate();
    var time = currentDateTime.getHours() + ":" + currentDateTime.getMinutes() + ":" + currentDateTime.getSeconds();
    var dateTime = date+' '+time;

    this.temp = localStorage.getItem('UserID');
    this.currentID = parseInt(this.temp);

    switch (type){
      case 1: /*Create*/
        tType = "Create";
        descrip = "The following data: " + JSON.stringify(dataNew) + " was added to the " + table + " table.";
        break;

      case 2: /*Update*/
        tType = "Update";
        descrip = "The following data was updated in the " + table + " table with the following: " + JSON.stringify(dataNew);
        break;

      case 3: /*Delete*/
        tType = "Delete";
        descrip = "The following data: " + JSON.stringify(dataOld) + " was deleted from the " + table + " table.";
        break;
    }

    this.newAudit.User_ID = this.currentID;
    this.newAudit.DateTime = dateTime;
    this.newAudit.TransactionType = tType;
    this.newAudit.TransactionDescription = descrip;

    return this.http.post( this.rootUrl+'api/AuditTrails/AuditTrails', this.newAudit);

  }


  
  GetAudits () : Observable <AuditTrail[]>  {
    return this.http.get<AuditTrail[]>(this.rootUrl +'api/AuditTrails/GetAuditTrail')
  }
}
