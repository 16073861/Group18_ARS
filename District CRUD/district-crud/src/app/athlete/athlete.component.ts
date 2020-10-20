import { Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Athlete } from '../models/athlete';
import { GlobalService } from '../global.service';
import { Router } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Club } from '../models/Club';
import { Gender } from '../models/gender';
import { Status } from '../models/status';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

class Person {
  id: number;
  firstName: string;
  lastName: string;
}

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

@Component({
  selector: 'app-athlete',
  templateUrl: './athlete.component.html',
  styleUrls: ['./athlete.component.css']
})
export class AthleteComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  //dtOptions: Promise<DataTables.Settings>;
  dtTrigger: Subject<any> = new Subject();

  athletes: Athlete[] = [];
  clubs: Club[] = [];
  genders: Gender[] = [];
  statuses: Status[] = [];
  persons: Person[];

  constructor(private _GlobalService: GlobalService, private router: Router, private http: HttpClient) { }

  /*onEdit(ids: number) {
    this.router.navigate(['/athlete-edit', { id: ids }])
  }
  
  onDelete(id: number){
    this._GlobalService.deleteAthlete(id)
      .subscribe(() => {
      this.athletes = [];
      this.ngOnInit();
    })
  }*/

  ngOnInit(): void {
    const that = this;

    //With dtTrigger --Angular Way
    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 2
    // };
    // this.http.get('http://localhost:6087/api/Athletes/')
    //   .pipe(map(this.extractData))
    //   .subscribe(athletes => {
    //     this.athletes = athletes;
    //     // Calling the DT trigger to manually render the table
    //     this.dtTrigger.next();
    //   });

    //With default link --Server Side
    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 2,
    //   serverSide: true,
    //   processing: true,
    //   ajax: (dataTablesParameters: any, callback) => {
    //     that.http.post<DataTablesResponse>('https://angular-datatables-demo-server.herokuapp.com/', dataTablesParameters, {} )
    //     .subscribe(resp => {
    //       that.persons = resp.data;

    //       callback({
    //         recordsTotal: resp.recordsTotal,
    //         recordsFiltered: resp.recordsFiltered,
    //         data: []
    //       });
    //     });
    //   },
    //   columns: [{ data: 'id' }, { data: 'firstName' }, { data: 'lastName' }]
    // };  

    //My attempt
    /*this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2,
      serverSide: true,
      processing: false,      
      ajax: (dataTablesParameters: any, callback) => { 
        //that.http.get<Athlete[]>('http://localhost:6087/api/Athletes/').subscribe()
        that.http.post<DataTablesResponse>('http://localhost:6087/api/Athletes/', dataTablesParameters, {} )
        .subscribe(resp => {
            that.athlete = resp.data;

            callback({
              data: []
            });
          }); 
        
        that._GlobalService.getAthlete()
          .subscribe(data => data.forEach(element => {
            var nathlete = new Athlete();
            nathlete.Athlete_ID = element.Athlete_ID
            nathlete.Club_ID = element.Club_ID;
            nathlete.Gender_ID = element.Gender_ID;
            nathlete.Status_ID = element.Status_ID;
            nathlete.User_ID = element.User_ID;
            nathlete.Name = element.Name;
            nathlete.Surname = element.Surname;
            nathlete.Description = element.Description;
            nathlete.Points = element.Points;
            that.athletes.push(nathlete);
          }))               
      },  
      columns: [{ title: 'Name',  data: 'Name' }, { title: 'Surname',  data: 'Surname' }]    
    };*/

    //Normal table retrieval
    this._GlobalService.getAthlete()
      .subscribe(data => data.forEach(element => {
        var nathlete = new Athlete();
        nathlete.Athlete_ID = element.Athlete_ID
        nathlete.Club_ID = element.Club_ID;
        nathlete.Gender_ID = element.Gender_ID;
        nathlete.Status_ID = element.Status_ID;
        nathlete.User_ID = element.User_ID;
        nathlete.Name = element.Name;
        nathlete.Surname = element.Surname;
        nathlete.Description = element.Description;
        nathlete.Points = element.Points;
        this.athletes.push(nathlete);
      }))

    this._GlobalService.getClub()
      .subscribe(data => data.forEach(element => {
        var nclub = new Club();
        nclub.Club_ID = element.Club_ID;
        nclub.Name = element.Name;
        this.clubs.push(nclub);
      }))

    this._GlobalService.getGender()
      .subscribe(data => data.forEach(element => {
        var ngender = new Gender();
        ngender.Gender_ID = element.Gender_ID;
        ngender.Gender = element.Gender;
        this.genders.push(ngender);
      }))

    this._GlobalService.getStatus()
      .subscribe(data => data.forEach(element => {
        var nstat = new Status();
        nstat.Status_ID = element.Status_ID;
        nstat.Status = element.Status;
        this.statuses.push(nstat);
      }))
        
  }
  
  Perf(ids: number){
    this.router.navigate(['/athleteperf', { id: ids}])
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  // private extractData(res: Response) {
  //   const body = res.json();
  //   return body.data || {};
  // }

}
