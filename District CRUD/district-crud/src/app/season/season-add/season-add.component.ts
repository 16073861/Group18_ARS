import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../global.service';
import { Season } from '../../models/season';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-season-add',
  templateUrl: './season-add.component.html',
  styleUrls: ['./season-add.component.css']
})
export class SeasonAddComponent implements OnInit {

  constructor(private dataService: GlobalService, private router: Router, public fb: FormBuilder) { }

  SeasForm: FormGroup;
  data = false;

  ngOnInit(): void {
    this.SeasForm = this.fb.group({
      description: [''],
      startDate: [''],
      endDate: ['']
    })
  }

  onFormSubmit(SeasForm) {
    this.dataService.AddSeason(this.SeasForm.value).subscribe(res => {
      console.log('Season created!')
      this.router.navigateByUrl('/season')})     
  }

}
