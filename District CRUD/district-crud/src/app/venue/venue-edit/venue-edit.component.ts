import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { GlobalService } from '../../global.service';
import { Venue } from '../../models/venue';
import { DistrictService } from '../../district.service';
import { District } from '../../models/district';

@Component({
  selector: 'app-venue-edit',
  templateUrl: './venue-edit.component.html',
  styleUrls: ['./venue-edit.component.css']
})
export class VenueEditComponent implements OnInit {

  constructor(private dataService: GlobalService, private _districtService: DistrictService, private route: ActivatedRoute, private router: Router,private fb: FormBuilder) { }

  VenueForm: FormGroup;
  VenueID: number;
  data = false;
  districts: District[] = [];

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.VenueID = id;
    })
        
    this.dataService.getVenue()
      .subscribe(data => data.forEach(element => {

        if (element.Venue_ID == this.VenueID) {

          this.VenueForm = this.fb.group({ 
            id: [element.Venue_ID],           
            name: [element.Name],
            capacity: [element.Capacity],
            district: [element.District_ID]
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
  }

  onFormSubmit(venue: Venue) {
    this.dataService.updateVenue(this.VenueID,this.VenueForm.value).subscribe(res => {
      console.log('Venue updated!')
      this.router.navigateByUrl('/venue')}) 
  }

}
