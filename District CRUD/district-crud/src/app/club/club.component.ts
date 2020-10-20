import { Component, OnInit } from '@angular/core';
import { Club } from '../models/Club';
import { GlobalService } from '../global.service';
import { DistrictService } from '../district.service';
import { Router } from '@angular/router';
import { District } from '../models/district';
import { Federation } from '../models/federation';

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.css']
})
export class ClubComponent implements OnInit {

  clubs: Club[] = [];
  districts: District[] = [];
  federations: Federation[] = [];

constructor(private _GlobalService: GlobalService, private _districtService: DistrictService, private router: Router) { }

onEdit(ids: number) {
  this.router.navigate(['/clubEdit', { id: ids }])
}

onDelete(id: number, olddata: Club) {
  this._GlobalService.deleteClub(id, olddata)
  .subscribe(() => {
  this.clubs = [];
  this.ngOnInit();
})
}

ngOnInit() {
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

    this._districtService.getDistrict()
      .subscribe(data => data.forEach(element => {
        var ndist = new District();
        ndist.District_ID = element.District_ID
        ndist.Name = element.Name;
        ndist.Province = element.Province;
        this.districts.push(ndist);
      }))

    this._GlobalService.getFederation()
      .subscribe(data => data.forEach(element => {
        var nfed = new Federation();
        nfed.Federation_ID = element.Federation_ID;
        nfed.Name = element.Name;
        nfed.Descrption = element.Descrption;
        this.federations.push(nfed);
      }))
  }
}