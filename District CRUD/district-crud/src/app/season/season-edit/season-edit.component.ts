import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Season } from '../../models/season';
import { GlobalService } from '../../global.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'app-season-edit',
  templateUrl: './season-edit.component.html',
  styleUrls: ['./season-edit.component.css']
})
export class SeasonEditComponent implements OnInit {

  constructor(private dataService: GlobalService, private route: ActivatedRoute, private router: Router,private fb: FormBuilder) { }

  SeasForm: FormGroup;
  SeasonID: number;
  data = false;


  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.SeasonID = id;
    })

    this.dataService.getSeason()
      .subscribe(data => data.forEach(element => {

        if (element.Season_ID == this.SeasonID) {

          this.SeasForm = this.fb.group({ 
            id: [element.Season_ID],
            description: [element.Description],
            startDate: [element.StartDate],
            endDate: [element.EndDate],
          })

        }

      }));
  }

  onFormSubmit(season: Season) {
    this.dataService.updateSeason(this.SeasonID,this.SeasForm.value).subscribe(res => {
      console.log('Season updated!')
      this.router.navigateByUrl('/season')}) 
  }

}
