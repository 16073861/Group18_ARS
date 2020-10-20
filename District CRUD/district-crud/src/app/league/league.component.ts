import { Component, OnInit } from '@angular/core';
import { League } from '../models/league';
import { GlobalService } from '../global.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.css']
})
export class LeagueComponent implements OnInit {
  leagues: League[] = [];  
  leagueClasses: string[] = ["League A", "League B", "League C"];

constructor(private _GlobalService: GlobalService, private router: Router) {}

onEdit(ids: number) {
  this.router.navigate(['/leagueEdit', { id: ids }])
}

onDelete(id: number, olddate: League) {
  this._GlobalService.deleteLeague(id, olddate)
  .subscribe(() => {
  this.leagues = [];
  this.ngOnInit();
  })
}

ngOnInit() {
  this._GlobalService.getLeague()
  .subscribe(data => data.forEach(element => {
    var nleague = new League();
    nleague.League_ID = element.League_ID;
    nleague.Name = element.Name;
    nleague.Tier = element.Tier;
    this.leagues.push(nleague);
  }))
  }
}
