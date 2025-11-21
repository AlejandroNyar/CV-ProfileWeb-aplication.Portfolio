import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickSettings } from './quick-settings';
import { provideZonelessChangeDetection } from '@angular/core';

describe('QuickSettings', () => {
  let component: QuickSettings;
  let fixture: ComponentFixture<QuickSettings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuickSettings],
      providers: [provideZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuickSettings);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
