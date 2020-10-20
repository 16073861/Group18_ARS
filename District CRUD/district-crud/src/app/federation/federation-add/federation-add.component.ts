import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../global.service';
import { Federation } from '../../models/federation';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-federation-add',
  templateUrl: './federation-add.component.html',
  styleUrls: ['./federation-add.component.css']
})
export class FederationAddComponent implements OnInit {

  constructor(private dataService: GlobalService, private router: Router, public fb: FormBuilder) { }

  FedForm: FormGroup;
  data = false;

  ngOnInit(): void {
    this.FedForm = this.fb.group({
      name: [''],
      descrption: ['']
    })
  }

  onFormSubmit(FedForm) {
    this.dataService.AddFederation(this.FedForm.value).subscribe(res => {
      console.log('Federation created!')
      this.router.navigateByUrl('/federation')})     
  }

}
