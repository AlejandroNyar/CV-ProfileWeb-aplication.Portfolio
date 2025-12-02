import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCookies } from './dialog-cookies';

describe('DialogCookies', () => {
  let component: DialogCookies;
  let fixture: ComponentFixture<DialogCookies>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogCookies]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogCookies);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
