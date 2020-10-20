import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AthleteAddComponent } from './athlete-add.component';

describe('AthleteAddComponent', () => {
  let component: AthleteAddComponent;
  let fixture: ComponentFixture<AthleteAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AthleteAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AthleteAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
