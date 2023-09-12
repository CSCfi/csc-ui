import { Component, OnInit } from '@angular/core';
import { CToastType } from '../../../../../../src/types';

@Component({
  selector: 'app-c-otp-input',
  templateUrl: './c-otp-input.component.html',
  styleUrls: ['./c-otp-input.component.scss']
})
export class COtpInputComponent implements OnInit {
  // @example-start|basic
  otp1 = '';
  // @example-end

  // @example-start|manual
  otp2 = '';
  errorMessage = '';
  valid = true;
  // @example-end

  constructor() { }

  ngOnInit(): void {
  }

  // @example-start|basic
  onComplete(event) {
    const toasts = document.getElementById('toasts') as HTMLCToastsElement;

    toasts.addToast({
      message: `OTP Code: ${event.detail}`,
      duration: 3000,
      type: CToastType.Success,
    });
  }
  // @example-end

  // @example-start|manual
  onManualCommit() {
    const toasts = document.getElementById('manual-toasts') as HTMLCToastsElement;

    if (!this.otp2) {

      this.errorMessage = 'Invalid OTP Code';
      this.valid = false;

      toasts.addToast({
        message: 'Invalid OTP Code',
        type: CToastType.Error,
      });

      return;
    }

    this.errorMessage = '';
    this.valid = true;

    toasts.addToast({
      message: `OTP Code: ${this.otp2}`,
      type: CToastType.Success,
    });
  }
  // @example-end
}
