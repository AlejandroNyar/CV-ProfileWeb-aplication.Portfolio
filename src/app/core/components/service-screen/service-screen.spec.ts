import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceScreen } from './service-screen';

describe('ServiceScreen', () => {
  let component: ServiceScreen;
  let fixture: ComponentFixture<ServiceScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceScreen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
