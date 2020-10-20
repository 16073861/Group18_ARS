import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonRankingComponent } from './season-ranking.component';

describe('SeasonRankingComponent', () => {
  let component: SeasonRankingComponent;
  let fixture: ComponentFixture<SeasonRankingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeasonRankingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeasonRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
