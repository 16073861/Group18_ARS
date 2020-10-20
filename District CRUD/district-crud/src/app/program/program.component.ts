import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-Program',
  templateUrl: './Program.component.html',
  styleUrls: ['./Program.component.css']
})
export class ProgramComponent implements OnInit {

  chart = [];

  constructor(private _weather: WeatherService) {}

  ngOnInit(): void {
    
  }
  
}