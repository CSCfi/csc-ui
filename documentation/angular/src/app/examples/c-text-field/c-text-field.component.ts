import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { mdiMagnify, mdiStar } from '@mdi/js';
@Component({
  selector: 'app-c-text-field',
  templateUrl: './c-text-field.component.html',
  styleUrls: ['./c-text-field.component.scss'],
})
export class CTextFieldComponent implements OnInit {
  mdiMagnify = mdiMagnify;
  mdiStar = mdiStar;
  // @example-start|validation
  form: FormGroup;

  errorMessages = {
    required: 'This is a required field',
    min: 'You must be at least 18 to enter',
    minlength: 'Please enter at least 8 characters',
  };

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      age: new FormControl(null, [Validators.required, Validators.min(18)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
  }

  isValid(field) {
    const input = this.form.get(field);

    return input?.pristine || input?.valid || false;
  }

  errors(field) {
    const errors = Object.keys(this.form.get(field)?.errors || {});

    if (!errors) return '';

    return this.errorMessages[errors[0]] || '';
  }

  onSubmit() {
    alert(JSON.stringify(this.form.value, null, 2));

    this.form.reset();
  }

  // @example-end
}
