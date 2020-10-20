import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Competition } from '../models/competition';
import { GlobalService } from '../global.service';
import { DistrictService } from '../district.service';
import { District } from '../models/district';
import { Venue } from '../models/venue';
import { CompetitionType } from '../models/competitionType';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.css']
})
export class CompetitionComponent implements OnInit {

  competitions: Competition[] = [];
  districts: District[] = [];
  venues: Venue[] = [];
  comTypes: CompetitionType[] = [];

  constructor(private dataService: GlobalService, private _districtService: DistrictService, private router: Router) { }

  onEdit(ids: number) {
    this.router.navigate(['/competitionEdit', { id: ids }])
  }
  
  onDelete(id: number, olddata: Competition){
    this.dataService.deleteCompetition(id, olddata)
      .subscribe(() => {
      this.competitions = [];
      this.ngOnInit();
    })
  }

  Perf(ids: number){
    this.router.navigate(['/registration', { id: ids}])
  }

  ngOnInit(): void {
    this.dataService.getCompetition()
      .subscribe(data => data.forEach(element => {
        var ncomp = new Competition();
        ncomp.Competition_ID = element.Competition_ID
        ncomp.Name = element.Name;
        ncomp.District_ID = element.District_ID;
        ncomp.Club_ID = element.Club_ID;
        ncomp.Venue_ID = element.Venue_ID;
        ncomp.CompetitionType_ID = element.CompetitionType_ID;
        ncomp.Date = element.Date;
        this.competitions.push(ncomp);
      }))

    this._districtService.getDistrict()
      .subscribe(data => data.forEach(element => {
        var ndist = new District();
        ndist.District_ID = element.District_ID
        ndist.Name = element.Name;
        ndist.Province = element.Province;
        this.districts.push(ndist);
      }))

    this.dataService.getVenue()
      .subscribe(data => data.forEach(element => {
        var nven = new Venue();
        nven.Venue_ID = element.Venue_ID;
        nven.Name = element.Name;
        nven.Capacity = element.Capacity;
        nven.District_ID = element.District_ID;
        this.venues.push(nven);
      }))
      
    this.dataService.getCompetitionType()
      .subscribe(data => data.forEach(element => {
        var ncompT = new CompetitionType();
        ncompT.CompetitionType_ID = element.CompetitionType_ID;
        ncompT.CompType = element.CompType;
        this.comTypes.push(ncompT);
      }))
  }

}
