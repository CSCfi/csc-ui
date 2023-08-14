import { Component, OnInit } from '@angular/core';
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';

@Component({
  selector: 'app-c-steps',
  templateUrl: './c-steps.component.html',
  styleUrls: ['./c-steps.component.scss'],
})
export class CStepsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  mdiChevronLeft = mdiChevronLeft;

  mdiChevronRight = mdiChevronRight;

  // @example-start|angular
  step = 1;

  min = 1;

  max = 5;

  move(direction: string) {
    if (direction === '>' && this.step < this.max) {
      this.step += 1;
    }

    if (direction === '<' && this.step > this.min) {
      this.step -= 1;
    }
  }
  // @example-end
}
