import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSettings } from './dialog-settings';
import { provideZonelessChangeDetection } from '@angular/core';

describe('DialogSettings', () => {
  let component: DialogSettings;
  let fixture: ComponentFixture<DialogSettings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogSettings],
      providers: [provideZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogSettings);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
