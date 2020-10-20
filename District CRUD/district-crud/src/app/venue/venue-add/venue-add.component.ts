import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../global.service';
import { Venue } from '../../models/venue';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DistrictService } from '../../district.service';
import { District } from '../../models/district';

@Component({
  selector: 'app-venue-add',
  templateUrl: './venue-add.component.html',
  styleUrls: ['./venue-add.component.css']
})
export class VenueAddComponent implements OnInit {

  constructor(private dataService: GlobalService, private _districtService: DistrictService, private router: Router, public fb: FormBuilder) { }

  VenForm: FormGroup;
  data = false;
  districts: District[] = [];

  ngOnInit(): void {
    this.VenForm = this.fb.group({
      name: [''],
      capacity: [''],
      district_id: ['']
    })

    this._districtService.getDistrict()
      .subscribe(data => data.forEach(element => {
        var ndist = new District();
        ndist.District_ID = element.District_ID
        ndist.Name = element.Name;
        ndist.Province = element.Province;
        this.districts.push(ndist);
      }))
  }

  onFormSubmit(VenForm) {
    //alert(JSON.stringify(this.VenForm.value))
    this.dataService.AddVenue(this.VenForm.value).subscribe(res => {
      console.log('Venue created!')
      this.router.navigateByUrl('/venue')})     
  }

}
