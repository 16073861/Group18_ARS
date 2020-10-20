import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateprogramComponent } from './updateprogram.component';

describe('UpdateprogramComponent', () => {
  let component: UpdateprogramComponent;
  let fixture: ComponentFixture<UpdateprogramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateprogramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateprogramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
