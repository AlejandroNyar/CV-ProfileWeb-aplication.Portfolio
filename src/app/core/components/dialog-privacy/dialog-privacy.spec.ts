import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { DialogPrivacy } from './dialog-privacy';
import { provideZonelessChangeDetection } from '@angular/core';

describe('DialogPrivacy', () => {
  let component: DialogPrivacy;
  let fixture: ComponentFixture<DialogPrivacy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogPrivacy],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogPrivacy);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
