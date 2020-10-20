import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Federation } from '../../models/federation';
import { GlobalService } from '../../global.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'app-federation-edit',
  templateUrl: './federation-edit.component.html',
  styleUrls: ['./federation-edit.component.css']
})
export class FederationEditComponent implements OnInit {

  constructor(private dataService: GlobalService, private route: ActivatedRoute, private router: Router,private fb: FormBuilder) { }

  FedForm: FormGroup;
  FederationID: number;
  data = false;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.FederationID = id;
    })

    this.dataService.getFederation()
      .subscribe(data => data.forEach(element => {

        if (element.Federation_ID == this.FederationID) {

          this.FedForm = this.fb.group({ 
            id: [element.Federation_ID],           
            name: [element.Name],
            descrption: [element.Descrption],
          })

        }

      }));
  }

  onFormSubmit(federation: Federation) {
    this.dataService.updateFederation(this.FederationID,this.FedForm.value).subscribe(res => {
      console.log('Federation updated!')
      this.router.navigateByUrl('/federation')}) 
  }

}
