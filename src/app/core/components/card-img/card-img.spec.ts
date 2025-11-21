import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardImg } from './card-img';

describe('CardImg', () => {
  let component: CardImg;
  let fixture: ComponentFixture<CardImg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardImg]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardImg);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
