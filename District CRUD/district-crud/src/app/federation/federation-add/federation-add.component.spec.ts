import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FederationAddComponent } from './federation-add.component';

describe('FederationAddComponent', () => {
  let component: FederationAddComponent;
  let fixture: ComponentFixture<FederationAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FederationAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FederationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
