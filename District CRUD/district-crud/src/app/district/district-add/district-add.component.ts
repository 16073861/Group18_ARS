import { Component, OnInit } from '@angular/core';
import { DistrictService } from '../../district.service';
import { District } from '../../models/district';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-district-add',
  templateUrl: './district-add.component.html',
  styleUrls: ['./district-add.component.css']
})
export class DistrictAddComponent implements OnInit {

  constructor(private dataService: DistrictService, private router: Router, public fb: FormBuilder) { }

  DistrictForm: FormGroup;
  data = false;
  provinces: string[] = ["Eastern Cape", "Freestate", "Gauteng", "KwaZulu-Natal", "Limpopo", "Mpumalanga", "North West", "Northern Cape", "Western Cape"];

  ngOnInit(): void {
    this.DistrictForm = this.fb.group({
      name: [''],
      province: ['']
    })
  }

  onFormSubmit(DistrictForm) {
    this.dataService.AddDistrict(this.DistrictForm.value).subscribe(res => {
      console.log('District created!')
      this.router.navigateByUrl('/district')})     
  }
 
}
