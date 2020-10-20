import { Component, OnInit } from '@angular/core';
import { EventType } from '../models/eventType';
import { GlobalService } from '../global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  events: EventType[] = [];

  constructor(private dataService: GlobalService, private router: Router) { }

  onEdit(ids: number) {
    this.router.navigate(['/eventEdit', { id: ids }])
  }
  
  onDelete(id: number, olddata: Event){
    this.dataService.deleteEventType(id, olddata)
      .subscribe(() => {
      this.events = [];
      this.ngOnInit();
    })
  }
  
  ngOnInit() {
    this.dataService.getEventType()
        .subscribe(data => data.forEach(element => {
          var neve = new EventType();
          neve.EventType_ID = element.EventType_ID
          neve.Name = element.Name;
          neve.Description = element.Description;
          this.events.push(neve);
        }))
  }

}
