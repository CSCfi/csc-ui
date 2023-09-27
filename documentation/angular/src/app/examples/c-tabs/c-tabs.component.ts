import { Component } from '@angular/core';

@Component({
  selector: 'app-c-tabs',
  templateUrl: './c-tabs.component.html',
  styleUrls: ['./c-tabs.component.scss'],
})
export class CTabsComponent {
  // @example-start|angular
  tab = 'tab2';

  onTabChange() {
    this.tab = 'tab2';
  }
  // @example-end
}
