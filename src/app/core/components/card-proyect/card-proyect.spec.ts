import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardProyect } from './card-proyect';

describe('CardProyect', () => {
  let component: CardProyect;
  let fixture: ComponentFixture<CardProyect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardProyect]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardProyect);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
