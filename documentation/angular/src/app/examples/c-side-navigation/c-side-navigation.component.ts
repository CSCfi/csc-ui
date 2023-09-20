import { Component, OnInit } from '@angular/core';
import { mdiAlarm, mdiHome, mdiLogout } from '@mdi/js';

@Component({
  selector: 'app-c-side-navigation',
  templateUrl: './c-side-navigation.component.html',
  styleUrls: ['./c-side-navigation.component.scss'],
})
export class CSidenavigationComponent implements OnInit {
  // @example-start|basic
  items = [
    {
      title: 'Home',
      icon: mdiHome,
    },
    {
      title: 'Something',
      icon: mdiAlarm,
      subs: [
        {
          title: 'Link to CSC website',
        },
      ],
    },
    {
      title: 'Logout',
      icon: mdiLogout,
    },
  ];

  currentItem = this.items[0];
  // @example-end

  constructor() {}

  ngOnInit(): void {}
}
