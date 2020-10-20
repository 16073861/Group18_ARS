import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EventType } from '../../models/eventType';
import { GlobalService } from '../../global.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css']
})
export class EventEditComponent implements OnInit {

  constructor(private dataService: GlobalService, private route: ActivatedRoute, private router: Router,private fb: FormBuilder) { }

  EventForm: FormGroup;
  EventID: number;
  data = false;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.EventID = id;
    })

    this.dataService.getEventType()
      .subscribe(data => data.forEach(element => {

        if (element.EventType_ID == this.EventID) {

          this.EventForm = this.fb.group({ 
            id: [element.EventType_ID],           
            name: [element.Name],
            description: [element.Description],
          })

        }

      }));
  }

  onFormSubmit(event: Event) {
    this.dataService.updateEventType(this.EventID,this.EventForm.value).subscribe(res => {
      console.log('Event updated!')
      this.router.navigateByUrl('/event')}) 
  }

}
