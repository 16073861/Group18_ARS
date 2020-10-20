import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {

  //src = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  src = "../../assets/ARS Help.pdf";

  constructor() { }

  ngOnInit(): void {
  }

}
