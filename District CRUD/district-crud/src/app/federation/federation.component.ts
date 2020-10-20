import { Component, OnInit } from '@angular/core';
import { Federation } from '../models/federation';
import { GlobalService } from '../global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-federation',
  templateUrl: './federation.component.html',
  styleUrls: ['./federation.component.css']
})
export class FederationComponent implements OnInit {
  federations: Federation[] = [];

constructor(private _GlobalService: GlobalService, private router: Router) { }

onEdit(ids: number) {
  this.router.navigate(['/federationEdit', { id: ids }])
}

onDelete(id: number, olddata: Federation) {
  this._GlobalService.deleteFederation(id, olddata)
  .subscribe(() => {
  this.federations = [];
  this.ngOnInit();
  })
}

ngOnInit() {
  this._GlobalService.getFederation()
      .subscribe(data => data.forEach(element => {
        var nfed = new Federation();
        nfed.Federation_ID = element.Federation_ID;
        nfed.Name = element.Name;
        nfed.Descrption = element.Descrption;
        this.federations.push(nfed);
      }))
  }
}