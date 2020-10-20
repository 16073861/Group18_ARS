import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { District } from '../../models/district';
import { DistrictService } from '../../district.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'app-district-edit',
  templateUrl: './district-edit.component.html',
  styleUrls: ['./district-edit.component.css']
})
export class DistrictEditComponent implements OnInit {

  constructor(private dataService: DistrictService, private route: ActivatedRoute, private router: Router,private fb: FormBuilder) { }

  DistrictForm: FormGroup;
  DistrictID: number;
  data = false;
  provinces: string[] = ["Eastern Cape", "Freestate", "Gauteng", "KwaZulu-Natal", "Limpopo", "Mpumalanga", "North West", "Northern Cape", "Western Cape"];
  
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.DistrictID = id;
    })

    this.dataService.getDistrict()
      .subscribe(data => data.forEach(element => {

        if (element.District_ID == this.DistrictID) {

          this.DistrictForm = this.fb.group({ 
            id: [element.District_ID],           
            name: [element.Name],
            province: [element.Province],
          })

        }

      }));
  }

  onFormSubmit(district: District) {
    this.dataService.updateDistrict(this.DistrictID,this.DistrictForm.value).subscribe(res => {
      console.log('District updated!')
      this.router.navigateByUrl('/district')}) 
  }

}
