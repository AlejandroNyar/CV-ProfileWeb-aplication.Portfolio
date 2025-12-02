import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookiesButton } from './cookies-button';

describe('CookiesButton', () => {
  let component: CookiesButton;
  let fixture: ComponentFixture<CookiesButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CookiesButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CookiesButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
