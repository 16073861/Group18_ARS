import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalService } from '../../global.service';
import { DistrictService } from '../../district.service';
import { District } from '../../models/district';
import { Venue } from '../../models/venue';
import { Club } from '../../models/club';
import { CompetitionType } from '../../models/competitionType';

@Component({
  selector: 'app-competition-add',
  templateUrl: './competition-add.component.html',
  styleUrls: ['./competition-add.component.css']
})
export class CompetitionAddComponent implements OnInit {

  competitionForm: FormGroup;
  data = false;
  districts: District[] = [];
  venues: Venue[] = [];
  clubs: Club[] = [];
  comTypes: CompetitionType[] = [];

  constructor(private _districtService: DistrictService, private _GlobalService: GlobalService, private router: Router, public fb: FormBuilder) { }

  ngOnInit(): void {
    this.competitionForm = this.fb.group({
      name: [''],
      district_id: [''],
      competitionType_id: [''],
      venue_id: [''],
      club_id: [''],
      date: ['']
    })

    this._districtService.getDistrict()
      .subscribe(data => data.forEach(element => {
        var ndist = new District();
        ndist.District_ID = element.District_ID
        ndist.Name = element.Name;
        ndist.Province = element.Province;
        this.districts.push(ndist);
      }))

    this._GlobalService.getVenue()
      .subscribe(data => data.forEach(element => {
        var nven = new Venue();
        nven.Venue_ID = element.Venue_ID;
        nven.Name = element.Name;
        nven.Capacity = element.Capacity;
        nven.District_ID = element.District_ID;
        this.venues.push(nven);
      }))

    this._GlobalService.getClub()
      .subscribe(data => data.forEach(element => {
        var nclub = new Club();
        nclub.Club_ID = element.Club_ID;
        nclub.Name = element.Name;
        nclub.Description = element.Description;
        nclub.District_ID = element.District_ID;
        nclub.Federation_ID = element.Federation_ID;
        this.clubs.push(nclub);
      }))

    this._GlobalService.getCompetitionType()
      .subscribe(data => data.forEach(element => {
        var ncompT = new CompetitionType();
        ncompT.CompetitionType_ID = element.CompetitionType_ID;
        ncompT.CompType = element.CompType;
        this.comTypes.push(ncompT);
      }))
  }

  onFormSubmit(competitionForm) {
    //alert(JSON.stringify(this.competitionForm.value))
    this._GlobalService.AddCompetition(this.competitionForm.value).subscribe(res => {
      console.log('Competition created!')
      this.router.navigateByUrl('/competition')})     
  }

}
