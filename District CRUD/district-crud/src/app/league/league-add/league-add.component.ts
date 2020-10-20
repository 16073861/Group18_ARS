import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../global.service';
import { League } from '../../models/league';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-league-add',
  templateUrl: './league-add.component.html',
  styleUrls: ['./league-add.component.css']
})
export class LeagueAddComponent implements OnInit {

  constructor(private dataService: GlobalService, private router: Router, public fb: FormBuilder) { }

  LeagueForm: FormGroup;
  data = false;
  tiers: string[] = ["A", "B", "C"];

  ngOnInit(): void {
    this.LeagueForm = this.fb.group({
      name: [''],
      tier: ['']
    })
  }

  onFormSubmit(LeagueForm) {
    this.dataService.AddLeague(this.LeagueForm.value).subscribe(res => {
      console.log('League created!')
      this.router.navigateByUrl('/league')})     
  }

}
