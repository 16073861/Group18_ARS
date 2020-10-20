import { Component, OnInit } from '@angular/core';
import { Season } from '../models/season';
import { GlobalService } from '../global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-season',
  templateUrl: './season.component.html',
  styleUrls: ['./season.component.css']
})
export class SeasonComponent implements OnInit {
  seasons: Season[] = [];

constructor(private _GlobalService: GlobalService, private router: Router) { }

onEdit(ids: number) {
  this.router.navigate(['/seasonEdit', { id: ids }])
}

onDelete(id: number, olddata: Season) {
  this._GlobalService.deleteSeason(id, olddata)
  .subscribe(() => {
  this.seasons = [];
  this.ngOnInit();
  })
}

ngOnInit() {
  this._GlobalService.getSeason()
      .subscribe(data => data.forEach(element => {
        var nseas = new Season();
        nseas.Season_ID = element.Season_ID;
        nseas.Description = element.Description;
        nseas.StartDate = element.StartDate;
        nseas.EndDate = element.EndDate;
        this.seasons.push(nseas);
      }))
  }
}