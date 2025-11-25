import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutScreen } from './about-screen';

describe('AboutScreen', () => {
  let component: AboutScreen;
  let fixture: ComponentFixture<AboutScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutScreen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
