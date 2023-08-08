import { Component, OnInit } from '@angular/core';
import { mdiServer } from '@mdi/js';
@Component({
  selector: 'app-c-swiper',
  templateUrl: './c-swiper.component.html',
  styleUrls: ['./c-swiper.component.scss'],
})
export class CSwiperComponent implements OnInit {
  mdiServer = mdiServer;

  // @example-start|basic
  selectedTab = '1';

  tabs = [
    { label: 'One', value: '1' },
    { label: 'Two', value: '2' },
    { label: 'Three', value: '3' },
    { label: 'Four', value: '4' },
    { label: 'Five', value: '5' },
    { label: 'Six', value: '6' },
  ];
  // @example-end

  constructor() {}

  ngOnInit(): void {}
}
