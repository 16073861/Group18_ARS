import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../global.service';
import { EventType } from '../../models/eventType';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.css']
})
export class EventAddComponent implements OnInit {

  constructor(private dataService: GlobalService, private router: Router, public fb: FormBuilder) { }

  EventForm: FormGroup;
  data = false;

  ngOnInit(): void {
    this.EventForm = this.fb.group({
      name: [''],
      description: ['']
    })
  }

  onFormSubmit(EventForm) {
    this.dataService.AddEventType(this.EventForm.value).subscribe(res => {
      console.log('Event created!')
      this.router.navigateByUrl('/event')})     
  }
}
