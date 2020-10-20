import { Component, OnInit } from '@angular/core';
import { District } from '../models/district';
import { DistrictService } from '../district.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.css']
})
export class DistrictComponent implements OnInit {
  dist: District[] = [];
  provinces: string[] = ["Eastern Cape", "Freestate", "Gauteng", "KwaZulu-Natal", "Limpopo", "Mpumalanga", "North West", "Northern Cape", "Western Cape"];

constructor(private _DistrictService: DistrictService, private router: Router) { }

onEdit(ids: number) {
  this.router.navigate(['/districtEdit', { id: ids }])
}

onDelete(id: number, olddata: District){
  this._DistrictService.deleteDistrict(id, olddata)
    .subscribe(() => {
    this.dist = [];
    this.ngOnInit();
  })
}

ngOnInit() {
  this._DistrictService.getDistrict()
      .subscribe(data => data.forEach(element => {
        var ndist = new District();
        ndist.District_ID = element.District_ID
        ndist.Name = element.Name;
        ndist.Province = element.Province;
        this.dist.push(ndist);
      }))
}



}