import { Component, OnInit } from '@angular/core';
import { Venue } from '../models/venue';
import { GlobalService } from '../global.service';
import { Router } from '@angular/router';
import { DistrictService } from '../district.service';
import { District } from '../models/district';

@Component({
  selector: 'app-venue',
  templateUrl: './venue.component.html',
  styleUrls: ['./venue.component.css']
})
export class VenueComponent implements OnInit {

  venues: Venue[] = [];
  districts: District[] = [];

constructor(private _GlobalService: GlobalService, private _districtService: DistrictService, private router: Router) { }

onEdit(ids: number) {
  this.router.navigate(['/venueEdit', { id: ids }])
}

onDelete(id: number, olddata: Venue) {
  this._GlobalService.deleteVenue(id, olddata)
  .subscribe(() => {
  this.venues = [];
  this.ngOnInit();
  })
}

ngOnInit() {
  this._GlobalService.getVenue()
  .subscribe(data => data.forEach(element => {
    var nven = new Venue();
    nven.Venue_ID = element.Venue_ID;
    nven.Name = element.Name;
    nven.Capacity = element.Capacity;
    nven.District_ID = element.District_ID;
    this.venues.push(nven);
  }))

  this._districtService.getDistrict()
      .subscribe(data => data.forEach(element => {
        var ndist = new District();
        ndist.District_ID = element.District_ID
        ndist.Name = element.Name;
        ndist.Province = element.Province;
        this.districts.push(ndist);
      }))
}
}