import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FederationEditComponent } from './federation-edit.component';

describe('FederationEditComponent', () => {
  let component: FederationEditComponent;
  let fixture: ComponentFixture<FederationEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FederationEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FederationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
