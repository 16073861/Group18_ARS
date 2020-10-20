import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportlandingComponent } from './reportlanding.component';

describe('ReportlandingComponent', () => {
  let component: ReportlandingComponent;
  let fixture: ComponentFixture<ReportlandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportlandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportlandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
