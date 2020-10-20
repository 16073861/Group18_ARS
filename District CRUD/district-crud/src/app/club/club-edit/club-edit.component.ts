import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Club } from '../../models/club';
import { GlobalService } from '../../global.service';
import { DistrictService } from '../../district.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { District } from '../../models/district';
import { Federation } from '../../models/federation';

@Component({
  selector: 'app-club-edit',
  templateUrl: './club-edit.component.html',
  styleUrls: ['./club-edit.component.css']
})
export class ClubEditComponent implements OnInit {

  constructor(private dataService: GlobalService, private _districtService: DistrictService, private route: ActivatedRoute, private router: Router,private fb: FormBuilder) { }

  ClubForm: FormGroup;
  ClubID: number;
  data = false;
  districts: District[] = [];
  federations: Federation[] = [];
  
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.ClubID = id;
    })
        
    this.dataService.getClub()
      .subscribe(data => data.forEach(element => {

        if (element.Club_ID == this.ClubID) {

          this.ClubForm = this.fb.group({ 
            id: [element.Club_ID],           
            name: [element.Name],
            description: [element.Description],
            districtid: [element.District_ID],
            federationid: [element.Federation_ID],
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

    this.dataService.getFederation()
      .subscribe(data => data.forEach(element => {
        var nfed = new Federation();
        nfed.Federation_ID = element.Federation_ID;
        nfed.Name = element.Name;
        nfed.Descrption = element.Descrption;
        this.federations.push(nfed);
      }))
  }

  onFormSubmit(club: Club) {
    this.dataService.updateClub(this.ClubID,this.ClubForm.value).subscribe(res => {
      console.log('Club updated!')
      this.router.navigateByUrl('/club')}) 
  }

}
