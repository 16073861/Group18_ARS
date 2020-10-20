import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reportlanding',
  templateUrl: './reportlanding.component.html',
  styleUrls: ['./reportlanding.component.css']
})
export class ReportlandingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  readLocalStorageValue(key) {
    return localStorage.getItem(key);
  }

}
