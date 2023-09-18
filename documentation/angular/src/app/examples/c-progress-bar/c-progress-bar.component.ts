import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-c-progress-bar',
  templateUrl: './c-progress-bar.component.html',
  styleUrls: ['./c-progress-bar.component.scss'],
})
export class CProgressBarComponent implements OnInit, OnDestroy {
  // @example-start|basic
  progress = 0;

  interval = null;

  ngOnInit() {
    this.interval = setInterval(() => {
      this.progress = Math.ceil(Math.random() * 100);
    }, 2000);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
  // @example-end
}
