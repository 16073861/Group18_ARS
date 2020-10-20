import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../global.service';
import { DistrictService } from '../../district.service';
import { Club } from '../../models/club';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { District } from '../../models/district';
import { Federation } from '../../models/federation';

@Component({
  selector: 'app-club-add',
  templateUrl: './club-add.component.html',
  styleUrls: ['./club-add.component.css']
})
export class ClubAddComponent implements OnInit {

  constructor(private dataService: GlobalService, private _districtService: DistrictService, private router: Router, public fb: FormBuilder) { }

  ClubForm: FormGroup;
  data = false;
  districts: District[] = [];
  federations: Federation[] = [];

  ngOnInit(): void {
    this.ClubForm = this.fb.group({
      name: [''],
      description: [''],
      district_id: [''],
      federation_id: ['']
    })

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

  onFormSubmit(ClubForm) {
    //alert(JSON.stringify(this.ClubForm.value))
    this.dataService.AddClub(this.ClubForm.value).subscribe(res => {
      console.log('Club created!')
      this.router.navigateByUrl('/club')})     
  }

}
