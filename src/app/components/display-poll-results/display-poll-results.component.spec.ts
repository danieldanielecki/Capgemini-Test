import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayPollResultsComponent } from './display-poll-results.component';

describe('DisplayPollResultsComponent', () => {
  let component: DisplayPollResultsComponent;
  let fixture: ComponentFixture<DisplayPollResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayPollResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayPollResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
