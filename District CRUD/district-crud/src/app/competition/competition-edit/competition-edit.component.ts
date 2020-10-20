import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { GlobalService } from '../../global.service';
import { DistrictService } from '../../district.service';
import { Competition } from '../../models/competition';
import { Club } from '../../models/club';
import { District } from '../../models/district';
import { Venue } from '../../models/venue';
import { CompetitionType } from '../../models/competitionType';

@Component({
  selector: 'app-competition-edit',
  templateUrl: './competition-edit.component.html',
  styleUrls: ['./competition-edit.component.css']
})
export class CompetitionEditComponent implements OnInit {

  constructor(private dataService: GlobalService, private _districtService: DistrictService, private route: ActivatedRoute, private router: Router,private fb: FormBuilder) { }

  CompetitionForm: FormGroup;
  CompetitionID: number;
  data = false;
  districts: District[] = [];
  clubs: Club[] = [];
  venues: Venue[] = [];
  comTypes: CompetitionType[] = [];

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.CompetitionID = id;
    })

    this.dataService.getCompetition()
      .subscribe(data => data.forEach(element => {

        if (element.Competition_ID == this.CompetitionID) {

          this.CompetitionForm = this.fb.group({ 
            id: [element.Competition_ID],           
            name: [element.Name],
            venue_id: [element.Venue_ID],
            district_id: [element.District_ID],
            club_id: [element.Club_ID],
            competitiontype_id: [element.CompetitionType_ID],
            date: [element.Date]
          })

        }

      }));

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

      this.dataService.getClub()
      .subscribe(data => data.forEach(element => {
        var nclub = new Club();
        nclub.Club_ID = element.Club_ID;
        nclub.Name = element.Name;
        nclub.Description = element.Description;
        nclub.District_ID = element.District_ID;
        nclub.Federation_ID = element.Federation_ID;
        this.clubs.push(nclub);
      }))

      this.dataService.getCompetitionType()
      .subscribe(data => data.forEach(element => {
        var ncompT = new CompetitionType();
        ncompT.CompetitionType_ID = element.CompetitionType_ID;
        ncompT.CompType = element.CompType;
        this.comTypes.push(ncompT);
      }))
  }

  onFormSubmit(competition: Competition) {
    this.dataService.updateCompetition(this.CompetitionID,this.CompetitionForm.value).subscribe(res => {
      console.log('Competition updated!')
      this.router.navigateByUrl('/competition')}) 
  }

}
