import { Component, OnInit, ViewChild } from '@angular/core';
import { Performance } from '../../models/performance';
import { GlobalService } from '../../global.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Heat } from '../../models/heat';
import { AgeGroup } from '../../models/ageGroup';
import { Event } from '../../models/event';
import { Athlete } from '../../models/athlete';
import { Competition } from '../../models/competition';
import { Gender } from '../../models/gender';
import { EventType } from '../../models/eventType';
import { CSVRecord } from '../../models/csvReader';

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.css']
})
export class PerformanceComponent implements OnInit {

  filtered: boolean = true;
  performances: Performance[] = [];
  heats: Heat[] = [];
  ageGroups: AgeGroup[] = [];
  events: Event[] = [];
  athletes: Athlete[] = [];
  competitions: Competition[] = []; 
  genders: Gender[] = [];
  eventTypes: EventType[] = [];
  EventTypeID: number;
  count: number;

  title = 'readcsv';

  constructor(private dataService: GlobalService, private route: ActivatedRoute, private router: Router) { }

  onEdit(ids: number) {
    this.router.navigate(['/performanceEdit', { id: ids }])
  }
  
  onDelete(id: number, olddata: Performance){
    this.dataService.deletePerformance(id, olddata)
      .subscribe(() => {
      this.performances = [];
      this.ngOnInit();
    })
  }

  Filt(ids: number){
    this.router.navigate(['/performance', { id: ids }])    
  }

  ngOnInit(): void {    
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.EventTypeID = id;
    })

    if (window.location.href == 'http://localhost:4300/performance') {
      this.filtered = false;
    }

    if (this.filtered == false) {
      this.dataService.getPerformance()
        .subscribe(data => data.forEach(element => {
          var nperf = new Performance();
          nperf.Performance_ID = element.Performance_ID;
          nperf.Result = element.Result;
          nperf.Date = element.Date;
          nperf.Athlete_ID = element.Athlete_ID;
          nperf.Heat_ID = element.Heat_ID;
          nperf.Event_ID = element.Event_ID;
          nperf.Medal_ID = element.Medal_ID;
          nperf.Age_ID = element.Age_ID;
          nperf.Competition_ID = element.Competition_ID;          
          nperf.Point = element.Point;
          this.performances.push(nperf);
        })) 
    } else {        
      this.dataService.getFilter(1)
        .subscribe(data => data.forEach(element => {
          var sperf = new Performance();
          sperf.Performance_ID = element.Performance_ID;
          sperf.Result = element.Result;
          sperf.Date = element.Date;
          sperf.Athlete_ID = element.Athlete_ID;
          sperf.Heat_ID = element.Heat_ID;
          sperf.Event_ID = element.Event_ID;
          sperf.Medal_ID = element.Medal_ID;
          sperf.Age_ID = element.Age_ID;
          sperf.Competition_ID = element.Competition_ID;
          sperf.Point = element.Point;
          this.performances.push(sperf);
        }))
    }    
    
    this.dataService.getHeat()
      .subscribe(data => data.forEach(element => {
        var nheat = new Heat();
        nheat.Heat_ID = element.Heat_ID;
        nheat.Heat = element.Heat;
        this.heats.push(nheat);
      }))

    this.dataService.getAgeGroup()
      .subscribe(data => data.forEach(element => {
        var nage = new AgeGroup();
        nage.Age_ID = element.Age_ID;
        nage.Age_Group = element.Age_Group;
        this.ageGroups.push(nage);
      }))

    this.dataService.getEvent()
      .subscribe(data => data.forEach(element => {
        var nevent = new Event();
        nevent.Event_ID = element.Event_ID;
        nevent.EventType_ID = element.EventType_ID;
        nevent.Unit_ID = element.Unit_ID;
        nevent.Description = element.Description;
        this.events.push(nevent);
      }))

    this.dataService.getAthlete()
      .subscribe(data => data.forEach(element => {
        var nathlete = new Athlete();
        nathlete.Athlete_ID = element.Athlete_ID;
        nathlete.Club_ID = element.Club_ID;
        nathlete.Gender_ID = element.Gender_ID;
        nathlete.Status_ID = element.Status_ID;
        nathlete.Name = element.Name;
        nathlete.Surname = element.Surname;
        nathlete.Description = element.Description;
        this.athletes.push(nathlete);
      }))

    this.dataService.getCompetition()
      .subscribe(data => data.forEach(element => {
        var ncomp = new Competition();
        ncomp.Competition_ID = element.Competition_ID
        ncomp.Name = element.Name;
        ncomp.District_ID = element.District_ID;
        ncomp.Club_ID = element.Club_ID;
        ncomp.Venue_ID = element.Venue_ID;
        ncomp.CompetitionType_ID = element.CompetitionType_ID;
        this.competitions.push(ncomp);
      }))

    this.dataService.getGender()
      .subscribe(data => data.forEach(element => {
        var ngen = new Gender();
        ngen.Gender_ID = element.Gender_ID;
        ngen.Gender = element.Gender;
        this.genders.push(ngen);
      }))

    this.dataService.getEventType()
      .subscribe(data => data.forEach(element => {
        var netype = new EventType();
        netype.EventType_ID = element.EventType_ID;
        netype.Name = element.Name;
        netype.Description = element.Description;
        this.eventTypes.push(netype);
      }))
  }


  //csv import
  public records: any[] = [];
  @ViewChild('csvReader') csvReader: any;

  uploadListener($event: any): void {  
  
    let text = [];  
    let files = $event.srcElement.files;  
  
    if (this.isValidCSVFile(files[0])) {  
  
      let input = $event.target;  
      let reader = new FileReader();  
      reader.readAsText(input.files[0]);  
  
      reader.onload = () => {  
        let csvData = reader.result;  
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);  
  
        let headersRow = this.getHeaderArray(csvRecordsArray);  
  
        this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);  
      };  
  
      reader.onerror = function () {  
        console.log('error is occured while reading file!');  
      };  
  
    } else {  
      alert("Please import valid .csv file.");  
      this.fileReset();  
    }  
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {  
    let csvArr = [];
    this.count = csvRecordsArray.length;  
  
    for (let i = 1; i < csvRecordsArray.length; i++) {  
      let curruntRecord = (<string>csvRecordsArray[i]).split(',');  
      if (curruntRecord.length == headerLength) {  
        let csvRecord: CSVRecord = new CSVRecord(); 
        csvRecord.Performance_ID = curruntRecord[0].trim();  
        csvRecord.Athlete_ID = curruntRecord[1].trim();  
        csvRecord.Heat_ID = curruntRecord[2].trim();  
        csvRecord.Event_ID = curruntRecord[3].trim();
        csvRecord.Medal_ID = curruntRecord[4].trim();  
        csvRecord.Age_ID = curruntRecord[5].trim();  
        csvRecord.Competition_ID = curruntRecord[6].trim();  
        csvRecord.Result = curruntRecord[7].trim(); 
        csvRecord.Date = curruntRecord[8].trim();
        csvRecord.Point = curruntRecord[9].trim();     
        csvArr.push(csvRecord);  
      }  
    }  
    return csvArr;  
  }  
  
  isValidCSVFile(file: any) {  
    return file.name.endsWith(".csv");  
  }  
  
  getHeaderArray(csvRecordsArr: any) {  
    let headers = (<string>csvRecordsArr[0]).split(',');  
    let headerArray = [];  
    for (let j = 0; j < headers.length; j++) {  
      headerArray.push(headers[j]);  
    }  
    return headerArray;  
  }  
  
  fileReset() {  
    this.csvReader.nativeElement.value = "";  
    this.records = [];  
  }

  onImport() {
    //For loop that goes through the csv and inserts the data
    for (let i = 0; i < this.count-2; i++) {
      //alert(JSON.stringify(this.records[i].Name))
      this.dataService.AddPerf(this.records[i]).subscribe();

      //This is just a longer way of doing line 89. Before I realised .subscribe() is actually important. Hehe ;-)
      //let entry: CSVRecord = new CSVRecord()
      //entry.ID = this.records[i].ID;
      //entry.Name = this.records[i].Name;
      //entry.Description = this.records[i].Description;
      //this.dataService.AddExample(entry).subscribe();
    }

    console.log('Imported');
  }
}
