import { Component, OnInit } from '@angular/core';
import { mdiServer } from '@mdi/js';

interface Tab {
  label: string;
  value: string | number;
  disabled: boolean;
}

@Component({
  selector: 'app-c-swiper',
  templateUrl: './c-swiper.component.html',
  styleUrls: ['./c-swiper.component.scss'],
})
export class CSwiperComponent implements OnInit {
  mdiServer = mdiServer;

  // @example-start|basic
  currentTab = '';

  selectedTab = 1;

  selectionText = `Tab "One" selected`;

  tabs = [
    { label: 'One', value: 1, disabled: false },
    { label: 'Two', value: 2, disabled: false },
    { label: 'Three', value: 3, disabled: false },
    { label: 'Four', value: 4, disabled: true },
    { label: 'Five', value: 5, disabled: false },
    { label: 'Six', value: 6, disabled: false },
  ];

  currentTab2 = '';

  selectedTab2 = 'tab6';

  selectionText2 = 'Tab "Six" selected';

  tabs2 = [
    { label: 'One', value: 'tab1', disabled: true },
    { label: 'Two', value: 'tab2', disabled: false },
    { label: 'Three', value: 'tab3', disabled: false },
    { label: 'Four', value: 'tab4', disabled: true },
    { label: 'Five', value: 'tab5', disabled: false },
    { label: 'Six', value: 'tab6', disabled: false },
  ];

  selectTab(tab: Tab) {
    this.selectedTab = tab.value as number;
    this.selectionText = `Tab "${tab.label}" selected`;
  }

  selectTab2(tab: Tab) {
    this.selectedTab2 = tab.value as string;
    this.selectionText2 = `Tab "${tab.label}" selected`;
  }
  // @example-end

  constructor() {}

  ngOnInit(): void {}
}
