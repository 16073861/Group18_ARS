import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators'

@Injectable({
   providedIn: 'root'
})


export class ReportsService {


   URL = "http://localhost:6087/";
   constructor(private http: HttpClient) { }
   GetCompetiotionReportData(StartDate, EndDate) {
      var data =
         "StartDate=" + StartDate + "&EndDate=" + EndDate;
      console.log(data)
      return this.http.get<any[]>("http://localhost:6087/api/Report/CompetitionReport?StartDate=" + StartDate + "&EndDate=" + EndDate);
   }
   getAllEvents() {

      return this.http.get<any[]>("http://localhost:6087/api/Report/AllEvents");
   }

   getAthlete() {

      return this.http.get<any[]>("http://localhost:6087/api/Report/Athlete");
   }

   getCompname() {

      return this.http.get<any[]>("http://localhost:6087/api/Report/Competition");
   }

   getRecord() {

      return this.http.get<any[]>("http://localhost:6087/api/Report/Records");
   }

   GetHeats() {

      return this.http.get<any[]>("http://localhost:6087/api/Report/AllHeats");
   }

   getSeason() {
      return this.http.get<any[]>("http://localhost:6087/api/Report/AllSeasons");
   }

   GetAthleteReport(id, StartDate, EndDate,Event) {

      var data =
         "id=" + id + "&StartDate=" + StartDate + "&EndDate=" + EndDate +"&Event=" +Event;
      console.log(data)
      return this.http.get<any[]>("http://localhost:6087/api/Report/AthletePerformances?id=" + id + "&StartDate=" + StartDate + "&EndDate=" + EndDate + "&Event=" + Event) .pipe(map(result => result));

      //.pipe(map(result=>result))
   }

   GetCompetitionPerformances(CompName, Event, Heat) {
      var data =
         "CompName=" + CompName + "&Heat=" + Heat;
      console.log(data)
      return this.http.get<any[]>("http://localhost:6087/api/Report/AllPerformancesPerComp?CompName=" + CompName + "&Event=" + Event + "&Heat=" + Heat);

      //.pipe(map(result=>result))
   }
   GetTop10(Event) {
      var data = "Event=" + Event;
      console.log(data)
      return this.http.get<any[]>("http://localhost:6087/api/Report/gettop10AllTime?Event=" + Event)
   }

   getRankingPerSeason(Seasons) {
      var data = "Seasons=" + Seasons;
      console.log(data)
      return this.http.get<any[]>("http://localhost:6087/api/Report/Ranking?Seasons=" + Seasons)
   }
}