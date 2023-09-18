import { ComponentFixture, TestBed } from '@angular/core/testing';

import { COtpInputComponent } from './c-otp-input.component';

describe('COtpInputComponent', () => {
  let component: COtpInputComponent;
  let fixture: ComponentFixture<COtpInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [COtpInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(COtpInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
