import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollWarning } from './scroll-warning';

describe('ScrollWarning', () => {
  let component: ScrollWarning;
  let fixture: ComponentFixture<ScrollWarning>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrollWarning]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScrollWarning);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
