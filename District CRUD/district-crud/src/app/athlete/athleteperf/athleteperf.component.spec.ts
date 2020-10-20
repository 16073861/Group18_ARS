import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AthleteperfComponent } from './athleteperf.component';

describe('AthleteperfComponent', () => {
  let component: AthleteperfComponent;
  let fixture: ComponentFixture<AthleteperfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AthleteperfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AthleteperfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
