import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceAddComponent } from './performance-add.component';

describe('PerformanceAddComponent', () => {
  let component: PerformanceAddComponent;
  let fixture: ComponentFixture<PerformanceAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerformanceAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformanceAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
