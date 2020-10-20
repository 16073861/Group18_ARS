import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { League } from '../../models/league';
import { GlobalService } from '../../global.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'app-league-edit',
  templateUrl: './league-edit.component.html',
  styleUrls: ['./league-edit.component.css']
})
export class LeagueEditComponent implements OnInit {

  constructor(private dataService: GlobalService, private route: ActivatedRoute, private router: Router,private fb: FormBuilder) { }

  LeagueForm: FormGroup;
  LeagueID: number;
  data = false;
  tiers: string[] = ["A", "B", "C"];

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.LeagueID = id;
    })

    this.dataService.getLeague()
      .subscribe(data => data.forEach(element => {

        if (element.League_ID == this.LeagueID) {

          this.LeagueForm = this.fb.group({ 
            id: [element.League_ID],           
            name: [element.Name],
            tier: [element.Tier],
          })

        }

      }));
  }

  onFormSubmit(league: League) {
    this.dataService.updateLeague(this.LeagueID,this.LeagueForm.value).subscribe(res => {
      console.log('League updated!')
      this.router.navigateByUrl('/league')}) 
  }

}
