import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardServicePage } from './card-service-page';

describe('CardServicePage', () => {
  let component: CardServicePage;
  let fixture: ComponentFixture<CardServicePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardServicePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardServicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
