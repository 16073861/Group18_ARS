import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPaasswordComponent } from './forgot-paassword.component';

describe('ForgotPaasswordComponent', () => {
  let component: ForgotPaasswordComponent;
  let fixture: ComponentFixture<ForgotPaasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotPaasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPaasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
