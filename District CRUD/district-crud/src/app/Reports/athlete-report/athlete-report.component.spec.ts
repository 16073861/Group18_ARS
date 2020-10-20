import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AthleteReportComponent } from './athlete-report.component';

describe('AthleteReportComponent', () => {
  let component: AthleteReportComponent;
  let fixture: ComponentFixture<AthleteReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AthleteReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AthleteReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
