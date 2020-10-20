import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { District } from './models/district';
import { AuditTrailService } from '../app/audit-trail.service';

@Injectable({
  providedIn: 'root'
})
export class DistrictService {

  url: string;
  rootUrl: string;
  token: string;
  header: any;
  option: any;

  constructor(private http: HttpClient, public audit : AuditTrailService) {
    this.url = "http://localhost:6087/api/Districts/";
    this.rootUrl = "http://localhost:6087/";
    const headerSettings: {[name: string]: string | string[]; } = {};

    this.header = new HttpHeaders(headerSettings);
  }
  getDistrict(): Observable<District[]> {
    console.log(this.header);
    return this.http.get<District[]>(this.url);
  }
  AddDistrict(newDistrict: District) {  
    this.audit.addAuditTrail(1, "Districts", newDistrict, null).subscribe(() => console.error);  
    return this.http.post(this.url, newDistrict, this.option);
  }
  updateDistrict(id: number, upDist: District) {
    this.audit.addAuditTrail(2, "Districts", upDist).subscribe(() => console.error);
    return this.http.put(this.url + id, upDist, this.option);
  }
  deleteDistrict(id: number, olddata: District) {
    this.audit.addAuditTrail(3, "Districts", null, olddata).subscribe(() => console.error);
    return this.http.delete(this.url + id, this.option)
  }
}
