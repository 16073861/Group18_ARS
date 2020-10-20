import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { District } from './models/district';
import { Club } from './models/Club';
import { Federation } from './models/federation';
import { League } from './models/league';
import { Season } from './models/season';
import { Venue } from './models/venue';
import { Competition } from './models/competition';
import { CompetitionType } from './models/competitionType';
import { Performance } from './models/performance';
import { Heat } from './models/heat';
import { AgeGroup } from './models/ageGroup';
import { Event } from './models/event';
import { Athlete } from './models/athlete';
import { Gender } from './models/gender';
import { EventType } from './models/eventType';
import { CSVRecord } from './models/csvReader';
import { Program } from './models/program';  
import { Excercise } from './models/excercise';
import { CompetitionList } from './models/CompetitionList';
import { Medal } from './models/medal';
import { Status } from './models/status';
import { AuditTrailService } from '../app/audit-trail.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  url: string;
  rootUrl: string;
  token: string;
  header: any;
  option: any;
  SERVER_URL: string = "https://file.io/";
  drive: string = "https://www.googleapis.com/upload/drive/v3/files?uploadType=";

  constructor(private http: HttpClient, public audit : AuditTrailService) {
    this.url = "http://localhost:6087/api/";
    this.rootUrl = "http://localhost:6087/";
    const headerSettings: {[name: string]: string | string[]; } = {};

    this.header = new HttpHeaders(headerSettings);
  }
  
  //Club
  getClub(): Observable<Club[]> {
    console.log(this.header);
    return this.http.get<Club[]>(this.url + 'Clubs/');
  }
  AddClub(newClub: Club) {
    this.audit.addAuditTrail(1, "Clubs", newClub, null).subscribe(() => console.error);    
    return this.http.post(this.url + 'Clubs/', newClub, this.option);
  }
  updateClub(id: number, upClub: Club) {
    this.audit.addAuditTrail(2, "Clubs", upClub).subscribe(() => console.error);
    return this.http.put(this.url + 'Clubs/' + id, upClub, this.option);
  }
  deleteClub(id: number, olddata: Club) {
    this.audit.addAuditTrail(3, "Clubs", null, olddata).subscribe(() => console.error);
    return this.http.delete(this.url + 'Clubs/' + id, this.option)
  }

  //Federation
  getFederation(): Observable<Federation[]> {
    console.log(this.header);
    return this.http.get<Federation[]>(this.url + 'Federations/');
  }
  AddFederation(newFederation: Federation) { 
    this.audit.addAuditTrail(1, "Federations", newFederation, null).subscribe(() => console.error);   
    return this.http.post(this.url + 'Federations/', newFederation, this.option);
  }
  updateFederation(id: number, upFederation: Federation) {
    this.audit.addAuditTrail(2, "Federations", upFederation).subscribe(() => console.error);
    return this.http.put(this.url + 'Federations/' + id, upFederation, this.option);
  }
  deleteFederation(id: number, olddata: Federation) {
    this.audit.addAuditTrail(3, "Federations", null, olddata).subscribe(() => console.error);
    return this.http.delete(this.url + 'Federations/' + id, this.option)
  }

  //League
  getLeague(): Observable<League[]> {
    console.log(this.header);
    return this.http.get<League[]>(this.url + 'Leagues/');
  }
  AddLeague(newLeague: League) {    
    this.audit.addAuditTrail(1, "Leagues", newLeague, null).subscribe(() => console.error); 
    return this.http.post(this.url + 'Leagues/', newLeague, this.option);
  }
  updateLeague(id: number, upLeague: League) {
    this.audit.addAuditTrail(2, "Leagues", upLeague).subscribe(() => console.error);
    return this.http.put(this.url + 'Leagues/' + id, upLeague, this.option);
  }
  deleteLeague(id: number, olddata: League) {
    this.audit.addAuditTrail(3, "Leagues", null, olddata).subscribe(() => console.error);
    return this.http.delete(this.url + 'Leagues/' + id, this.option)
  }

  //Season
  getSeason(): Observable<Season[]> {
    console.log(this.header);
    return this.http.get<Season[]>(this.url + 'Seasons/');
  }
  AddSeason(newSeason: Season) {  
    this.audit.addAuditTrail(1, "Seasons", newSeason, null).subscribe(() => console.error);  
    return this.http.post(this.url + 'Seasons/', newSeason, this.option);
  }
  updateSeason(id: number, upSeason: Season) {
    this.audit.addAuditTrail(2, "Seasons", upSeason).subscribe(() => console.error);
    return this.http.put(this.url + 'Seasons/' + id, upSeason, this.option);
  }
  deleteSeason(id: number, olddata: Season) {
    this.audit.addAuditTrail(3, "Seasons", null, olddata).subscribe(() => console.error);
    return this.http.delete(this.url + 'Seasons/' + id, this.option)
  }

  //Venue
  getVenue(): Observable<Venue[]> {
    console.log(this.header);
    return this.http.get<Venue[]>(this.url + 'Venues/');
  }
  AddVenue(newVenue: Venue) {   
    this.audit.addAuditTrail(1, "Venues", newVenue, null).subscribe(() => console.error);  
    return this.http.post(this.url + 'Venues/', newVenue, this.option);
  }
  updateVenue(id: number, upVenue: Venue) {
    this.audit.addAuditTrail(2, "Venues", upVenue).subscribe(() => console.error);
    return this.http.put(this.url + 'Venues/' + id, upVenue, this.option);
  }
  deleteVenue(id: number, olddata) {
    this.audit.addAuditTrail(3, "Venues", null, olddata).subscribe(() => console.error);
    return this.http.delete(this.url + 'Venues/' + id, this.option)
  }

  //Competition
  getCompetition(): Observable<Competition[]> {
    console.log(this.header);
    return this.http.get<Competition[]>(this.url + 'Competitions/');
  }
  AddCompetition(newCompetition: Competition) {  
    this.audit.addAuditTrail(1, "Competitions", newCompetition, null).subscribe(() => console.error);   
    return this.http.post(this.url + 'Competitions/', newCompetition, this.option);
  }
  updateCompetition(id: number, upCompetition: Competition) {
    this.audit.addAuditTrail(2, "Competitions", upCompetition).subscribe(() => console.error);
    return this.http.put(this.url + 'Competitions/' + id, upCompetition, this.option);
  }
  deleteCompetition(id: number, olddata) {
    this.audit.addAuditTrail(3, "Competitions", null, olddata).subscribe(() => console.error);
    return this.http.delete(this.url + 'Competitions/' + id, this.option)
  }  

  //CompetitionType
  getCompetitionType(): Observable<CompetitionType[]> {
    console.log(this.header);
    return this.http.get<CompetitionType[]>(this.url + 'CompetitionTypes/');
  }

  //Performance
  getPerformance(): Observable<Performance[]> {
    console.log(this.header);
    return this.http.get<Performance[]>(this.url + 'Performances/');
  }
  AddPerformance(newPerformance: Performance) {    
    this.audit.addAuditTrail(1, "Performances", newPerformance, null).subscribe(() => console.error);
    return this.http.post(this.url + 'Performances/', newPerformance, this.option);
  }
  updatePerformance(id: number, upPerformance: Performance) {
    this.audit.addAuditTrail(2, "Performances", upPerformance).subscribe(() => console.error);
    return this.http.put(this.url + 'Performances/' + id, upPerformance, this.option);
  }
  deletePerformance(id: number, olddata: Performance) {
    this.audit.addAuditTrail(3, "Performances", null, olddata).subscribe(() => console.error);
    return this.http.delete(this.url + 'Performances/' + id, this.option)
  }
  //CSV Import
  AddPerf(newExample: CSVRecord) {    
    this.audit.addAuditTrail(1, "Performances", newExample, null).subscribe(() => console.error);
    return this.http.post(this.url + 'Performances/', newExample, this.option);
  }
  getCompPerformance(id: number): Observable<Performance[]> {
    console.log(this.header);
    return this.http.get<Performance[]>(this.url + 'CompPerformance/' + id);
  }
  getAthletePerformance(id: number): Observable<Performance[]> {
    console.log(this.header);
    return this.http.get<Performance[]>(this.url + 'AthletePerformance/' + id);
  }

  //Heat
  getHeat(): Observable<Heat[]> {
    console.log(this.header);
    return this.http.get<Heat[]>(this.url + 'Heats/');
  }

  //Age Group
  getAgeGroup(): Observable<AgeGroup[]> {
    console.log(this.header);
    return this.http.get<AgeGroup[]>(this.url + 'Age_Group/');
  }

  //Event
  getEvent(): Observable<Event[]> {
    console.log(this.header);
    return this.http.get<Event[]>(this.url + 'Events/');
  }

  //Athlete
  getAthlete(): Observable<Athlete[]> {
    console.log(this.header);
    return this.http.get<Athlete[]>(this.url + 'Athletes/');
  }
  AddAthlete(newAthlete: Athlete) { 
    this.audit.addAuditTrail(1, "Athletes", newAthlete, null).subscribe(() => console.error);   
    return this.http.post(this.url + 'Athletes/', newAthlete, this.option);
  }
  updateAthlete(id: number, upAthlete: Athlete) {
    this.audit.addAuditTrail(2, "PerformAthletesances", upAthlete).subscribe(() => console.error);
    return this.http.put(this.url + 'Athletes/' + id, upAthlete, this.option);
  }
  deleteAthlete(id: number, olddata: Athlete) {
    this.audit.addAuditTrail(3, "Athletes", null, olddata).subscribe(() => console.error);
    return this.http.delete(this.url + 'Athletes/' + id, this.option)
  }

  //Program
  getProgram(): Observable<Program[]> {
    console.log(this.header);
    return this.http.get<Program[]>(this.url + 'Programs/');
  }
  AddProgram(newProgram: Program) {
    this.audit.addAuditTrail(1, "Programs", newProgram, null).subscribe(() => console.error);     
    return this.http.post(this.url + 'Programs/', newProgram, this.option);
  }
  updateProgram(id: number, upProgram: Program) {
    this.audit.addAuditTrail(2, "Programs", upProgram).subscribe(() => console.error);
    return this.http.put(this.url + 'Programs/' + id, upProgram, this.option);
  }
  deleteProgram(id: number, olddata) {
    this.audit.addAuditTrail(3, "Programs", null, olddata).subscribe(() => console.error);
    return this.http.delete(this.url + 'Programs/' + id, this.option)
  }

  //Gender
  getGender(): Observable<Gender[]> {
    console.log(this.header);
    return this.http.get<Gender[]>(this.url + 'Genders/');
  }

  //EventType
  getEventType(): Observable<EventType[]> {
    console.log(this.header);
    return this.http.get<EventType[]>(this.url + 'EventTypes/');
  }
  AddEventType(newEventType: EventType) {
    this.audit.addAuditTrail(1, "EventTypes", newEventType, null).subscribe(() => console.error);     
    return this.http.post(this.url + 'EventTypes/', newEventType, this.option);
  }
  updateEventType(id: number, upEventType: EventType) {
    this.audit.addAuditTrail(2, "EventTypes", upEventType).subscribe(() => console.error);
    return this.http.put(this.url + 'EventTypes/' + id, upEventType, this.option);
  }
  deleteEventType(id: number, olddata) {
    this.audit.addAuditTrail(3, "EventTypes", null, olddata).subscribe(() => console.error);
    return this.http.delete(this.url + 'EventTypes/' + id, this.option)
  }

  //Medal
  getMedal(): Observable<Medal[]> {
    console.log(this.header);
    return this.http.get<Medal[]>(this.url + 'Medals/');
  }

  //EventType Filter
  getFilter(id: number): Observable<Performance[]> {
    console.log(this.header);
    return this.http.get<Performance[]>(this.url + 'Filter/' + id);
  }

  //Competition List Email
  clEmail(Email: CompetitionList) {
    return this.http.post('http://localhost:6087/api/CompListEmail',  Email);
  }

  //Upload File
  public upload(formData) {
    return this.http.post<any>(this.SERVER_URL, formData, {  
        reportProgress: true,  
        observe: 'events'  
      });  
  }
  public uploadDrive(formData) {
    return this.http.post<any>(this.drive, formData, {  
        reportProgress: true,  
        observe: 'events'  
      });  
  }

  //Backup
  backupdb() {
    return this.http.post('http://localhost:6087/api/Backup', this.option);
  }
  restoredb() {
    return this.http.get('http://localhost:6087/api/Backup');
  }

  //Status
  getStatus(): Observable<Status[]> {
    console.log(this.header);
    return this.http.get<Status[]>(this.url + 'Status/');
  }
  
  //Ashley Exercise and Program
  ///////////////Exercises///////////////////////////////////////////////////////

  getExcercises():Observable<Excercise[]> { 
    console.log(this.header);
    return this.http.get<Excercise[]>( 'https://localhost:44359/api/Excercise/getAllExcercises/'); }
  
  addExcercise(excercise : Excercise){ 
    return this.http.post('https://localhost:44359/api/Excercise/addExcercise' , excercise, this.option); }
    
  UpdateExcercise(excercise : Excercise,id:number){ 
    return this.http.post( `https://localhost:44359/api/Excercise/UpdateExcercise{id}?id=${id}`,excercise); }

  DeleteExcercise(id : number){
    return this.http.delete(this.url + 'DeleteExcercise/?id=' + id, this.option); }

  //Ashley Exercise and Program
 
}
