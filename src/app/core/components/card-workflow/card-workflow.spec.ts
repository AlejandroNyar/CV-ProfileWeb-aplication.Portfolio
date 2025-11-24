import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardWorkflow } from './card-workflow';

describe('CardWorkflow', () => {
  let component: CardWorkflow;
  let fixture: ComponentFixture<CardWorkflow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardWorkflow]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardWorkflow);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
